import express, { type Request, type Response } from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import { systemPrompt } from './lib/systemPrompt.js';
import multer from 'multer'
import { downloadObject, uploadFile } from './configs/storage.js';
import { ai } from './configs/genClient.js';
import { verifyAuth } from './middleware/auth.js';
import prisma from './configs/prismaClient.js';
import { checkUsage } from './middleware/analytics.js';
import { razorpay } from './configs/payment.js';
import crypto from 'crypto';
import { filters } from './lib/filterPrompts.js';
import { sendEmail } from './configs/mail.js';

const app = express()

app.use(cors({
  origin: process.env.ORIGIN_URL!
}))

app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ limit: "50mb", extended: true })) 

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

app.get('/user', verifyAuth, async(req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    if(!userId){
      return res.status(400).json({
        success: false,
        message: 'UserId not found'
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    return res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

app.post('/generate-image', verifyAuth, checkUsage, upload.single('image'), async (req: Request, res: Response) => {
  // Extract prompt from formdata
  const { prompt, filter: usrFilter } = req.body
  const imageData = req.file?.buffer;
  const base64Image = imageData?.toString("base64");

  if (!usrFilter && !prompt) {
    return res.status(400).json({
      success: false,
      message: 'prompt is required'
    })
  }

  try {
    let finalPrompt;
    //if user has chosen a filter, append it to the prompt
    if(req.body.filter){
      for (const filterObj of filters){
        if(filterObj.label === req.body.filter){
          finalPrompt = filterObj.prompt
          break;
        }
      }
    }else{
      finalPrompt = prompt
    }
    // Prepare content array - only include inline data if image is present
    const contents: any[] = [{ 
      text: finalPrompt
    }];
    
    if (base64Image && req.file) {
      contents.push({
        inlineData: {
          mimeType: req.file.mimetype || "image/png",
          data: base64Image,
        },
      });
    }
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image-preview",
      contents: contents,
      config: {
        systemInstruction: systemPrompt
      }
    });
    
    if (!response || !response.candidates?.[0]?.content?.parts) {
      return res.status(500).json({
        success: false,
        message: 'Failed to generate content'
      });
    }

    // Handle response - check for inline data first, then text
    const parts = response.candidates[0].content.parts;
    const inlineDataPart = parts.find((part: any) => part.inlineData);
    
    if (inlineDataPart?.inlineData) {
      try {
        // Handle generated image
        const imageData = inlineDataPart.inlineData.data;
        
        // Validate base64 data
        if (!imageData) {
          throw new Error('Invalid image data received');
        }
        
        // Convert base64 → Buffer
        const buffer = Buffer.from(imageData, "base64");

        // Validate buffer
        if (!buffer || buffer.length === 0) {
          throw new Error('Empty or invalid buffer created');
        }
        
        // Generate a unique filename
        const timestamp = Date.now();
        const filename = `generated-image-${timestamp}.png`;

        const publicUrl = await uploadFile(
          process.env.GCP_BUCKET_NAME as string, 
          buffer, 
          filename, 
          inlineDataPart.inlineData?.mimeType || "application/octet-stream"
        );

        //Update user usage
        try {
          const userId = req.user?.userId;
        if (userId) {
          await prisma.user.update({
            where: { id: userId },
            data: {
              imagesUploaded: { increment: 1 },
              noOfPrompts: { increment: 1 }
            }
          });
        }
        } catch (error) {
          console.log(error, 'error in updating user usage....')
        }
        
        return res.status(200).json({
          success: true,
          message: 'Image generated successfully',
          genRes: publicUrl
        });
      } catch (uploadError) {
        console.error('Error during image processing/upload:', uploadError);
        return res.status(500).json({
          success: false,
          message: 'Failed to upload generated image',
          error: uploadError instanceof Error ? uploadError.message : 'Unknown upload error'
        });
      }
    } else {
      // Handle text response
      const textPart = parts.find((part: any) => part.text);
      if (textPart?.text) {
        return res.status(200).json({
          success: true,
          message: 'Text response generated successfully',
          genRes: textPart.text
        });
      }
    }

    // If no valid content found
    return res.status(500).json({
      success: false,
      message: 'No valid content generated'
    });

  } catch (error) {
    console.log(error, 'error while calling api............')
    return res.status(500).json({
      success: false,
      message: 'Something went wrong'
    })
  }
})


app.post('/follow-up', verifyAuth, checkUsage, async(req: Request, res: Response) => {
  try {
    //extract the image url from body
    const {imageUrl, prompt} = req.body;
    if(!imageUrl || !prompt){
      return res.status(400).json({
        success: false,
        message: 'Image URL and prompt are required'
      });
    }
    //call the api
    try {
      const imgRes = await fetch(imageUrl);
  const imageArrayBuffer = await imgRes.arrayBuffer();
  const base64ImageData = Buffer.from(imageArrayBuffer).toString('base64');

  // Prepare content array - only include inline data if image is present
    const contents: any[] = [{ text: prompt }];

    if (base64ImageData) {
      contents.push({
        inlineData: {
          mimeType: "image/png",
          data: base64ImageData,
        },
      });
    }


  const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image-preview",
      contents: contents,
      config: {
        systemInstruction: systemPrompt
      }
    });
  
      //@ts-ignore
    if (!response || !response.candidates?.[0]?.content?.parts) {
      return res.status(500).json({
        success: false,
        message: 'Failed to generate content'
      });
    }

    // Handle response - check for inline data first, then text
      //@ts-ignore
    const parts = response.candidates[0].content.parts;
    const inlineDataPart = parts.find((part: any) => part.inlineData);
    
    if (inlineDataPart?.inlineData) {
      try {
        // Handle generated image
        const imageData = inlineDataPart.inlineData.data;
        
        // Validate base64 data
        if (!imageData) {
          throw new Error('Invalid image data received');
        }
        
        // Convert base64 → Buffer
        const buffer = Buffer.from(imageData, "base64");

        // Validate buffer
        if (!buffer || buffer.length === 0) {
          throw new Error('Empty or invalid buffer created');
        }
        
        // Generate a unique filename
        const timestamp = Date.now();
        const filename = `generated-image-${timestamp}.png`;

        const publicUrl = await uploadFile(
          process.env.GCP_BUCKET_NAME as string, 
          buffer, 
          filename, 
          inlineDataPart.inlineData?.mimeType || "application/octet-stream"
        );

        // Update user usage
        try {
          const userId = req.user?.userId;
        if (userId) {
          await prisma.user.update({
            where: { id: userId },
            data: {
              noOfPrompts: { increment: 1 }
            }
          });
        }
        } catch (error) {
          console.log(error, 'error in updating user usage....')
        }

        return res.status(200).json({
          success: true,
          message: 'Image generated successfully',
          genRes: publicUrl
        });
      } catch (uploadError) {
        console.error('Error during image processing/upload:', uploadError);
        return res.status(500).json({
          success: false,
          message: 'Failed to upload generated image',
          error: uploadError instanceof Error ? uploadError.message : 'Unknown upload error'
        });
      }
    } else {
      // Handle text response
      const textPart = parts.find((part: any) => part.text);
      if (textPart?.text) {
        return res.status(200).json({
          success: true,
          message: 'Text response generated successfully',
          genRes: textPart.text
        });
      }
    }

    } catch (error) {
      console.log(error,'err in calling follow up gen ai api')
      return res.status(500).json({
        success: false,
        message: 'Failed to generate follow-up content'
      });
    }
  } catch (error) {
    console.log(error,'error in follow up route')
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
})

//add middleware ehre
app.post("/create-subscription", async (req: Request, res: Response) => {
  try {
    const { planId } = req.body;

    if (!planId) {
      return res.status(400).json({
        success: false,
        message: 'Plan ID is required'
      });
    }

    // Create subscription in Razorpay
    const subscription = await razorpay.subscriptions.create({
      plan_id: planId,
      total_count: 12, // e.g., for a yearly subscription with monthly billing
    });

    return res.status(200).json({
      success: true,
      message: 'Subscription created successfully',
      subscription
    });
  } catch (error) {
    console.log(error,'error in create subscription route')
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
});

app.post("/varify-subscription", async (req: Request, res: Response) => {
  try {
    const { razorpayPaymentId, razorpaySubscriptionId, razorpaySignature, userId } = req.body;

    if (!razorpayPaymentId || !razorpaySubscriptionId || !razorpaySignature) { 
      return res.status(400).json({
        success: false,
        message: 'All payment details are required'
      });
    } 

    const verifySignature = (paymentId: string, subscriptionId: string, signature: string) => {
      const generatedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET as string)
        .update(paymentId + '|' + subscriptionId)
        .digest('hex');
      return generatedSignature === signature;
    }

    // Verify payment signature
    const isValid = verifySignature(razorpayPaymentId, razorpaySubscriptionId, razorpaySignature);
    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment signature'
      });
    }

    //update the user subscription in db
    try {
    const updatedUser = await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        planType: 'STANDARD'
      }
    })

    try {
      await sendEmail(updatedUser.email, "Your Pumpkin AI Plan Has Been Successfully Upgraded!")
      console.log('email sent successfully')
    } catch (error) {
      console.log(error,'err in sending mail after payment varification')
    }

    return res.status(200).json({
      success: true,
      message: 'Subscription verified successfully',
      isOk: true
    });
    } catch (error) {
      console.log(error, 'err in updating user plan in db')
    }
  } catch (error) {
    console.log(error,'error in verify subscription route')
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      isOk: false
    })
  }
});

//download image
app.get('/download', verifyAuth, async(req: Request, res: Response) => {
  const { imageUrl } = req.query;
  if (!imageUrl) {
    return res.status(400).json({
      success: false,
      message: 'Image URL is required'
    });
  }

  try {
    //call the gcp 
    try {
      const downloadUrl = await downloadObject(imageUrl as string)
     // Set headers for attachment
    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader("Content-Disposition", `attachment; filename="${imageUrl}"`);
    res.status(200).json({
      success: true,
      message: 'Image downloaded successfully',
      downloadUrl
    });
    } catch (error) {
      console.log(error,'getting err in generating download url....')
      return res.status(500).json({
        success: false,
        message: 'Failed to generate download URL',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } 
  } catch (error) {
    console.error('Error downloading image:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to download image'
    });
  }
});

app.get('/health', (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: 'System is running'
  })
})

app.post('/feedback', async (req: Request, res: Response) => {
  try {
    const {category, details} = req.body;
    if(!category || !details){
      return res.status(500).json({
        success: false,
        message: 'all parameters are required'
      })
    }
    try {
      const feedback = await prisma.feedback.create({
        data:{
          category,
          details
        }
      })
      if(!feedback){
        res.status(500).json({
          success: false,
          message: 'something went wrong'
        })
      }
      return res.status(200).json({
        success: true,
        message: 'feedback submitted'
      })
    } catch (error) {
      console.log(error,'error in saving feedback to db')
    }
  } catch (error) {
    console.log(error,'err in feed route')
    res.status(500).json({
      success: false,
      message: "internal server errror"
    })
  }
})

app.get("/", (req: Request, res: Response) => {
  console.log("server is running")
  return res.json({
    success: true,
    message: "server is running"
  })
})

app.listen(8080, () => {
  console.log('Server is running on port 8080')
})
