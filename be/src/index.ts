import express, { request, response, type Request, type Response } from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import { systemPrompt } from './lib/systemPrompt.js';
import multer from 'multer'
import { downloadObject, uploadFile } from './configs/storage.js';
import { ai } from './configs/genClient.js';
import { verifyAuth } from './middleware/auth.js';

const app = express()

app.use(cors())
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

app.post('/generate-image', verifyAuth,  upload.single('image'), async (req: Request, res: Response) => {
  // Extract prompt from formdata
  const { prompt } = req.body
  const imageData = req.file?.buffer;
  const base64Image = imageData?.toString("base64");

  if (!prompt) {
    return res.status(400).json({
      success: false,
      message: 'prompt is required'
    })
  }

  try {
    
    // Prepare content array - only include inline data if image is present
    const contents: any[] = [{ text: prompt }];
    
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



app.post('/follow-up', verifyAuth, async(req: Request, res: Response) => {
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

app.listen(8080, () => {
  console.log('Server is running on port 8080')
})
