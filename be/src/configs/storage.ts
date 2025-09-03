import { Storage } from "@google-cloud/storage";
import dotenv from 'dotenv';
dotenv.config();


const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  //@ts-ignore
  credentials: {
    client_email: process.env.GCP_CLIENT_EMAIL as string,
    private_key: process.env.GCP_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
});



export async function uploadFile(
  bucketName: string,
  buffer: Buffer,
  destFileName: string,
  mimeType: string
): Promise<string> {
  try {
    const bucket = storage.bucket(bucketName);
  const file = bucket.file(destFileName);

  const stream = file.createWriteStream({
    metadata: {
      // contentDisposition: 'inline',
      contentType: mimeType, // Set appropriate content type
    },
    resumable: false, // Set to true for resumable uploads
  });

  stream.on('error', (err) => {
    console.error('Error during upload stream:', err);
  });

  stream.on('finish', () => {
    console.log(`Buffer streamed to ${bucketName}/${destFileName}`);
  });

  stream.end(buffer);


  const publicUrl = `https://storage.googleapis.com/${bucketName}/${destFileName}`;

  return publicUrl;
  } catch (error) {
    console.error(`Error uploading buffer to GCS: ${error}`);
    throw error;
  }
}


//download file
export const downloadObject = async (fileName: string) => {
  try {
    const bucket = storage.bucket(process.env.GCP_BUCKET_NAME as string);
  const file = bucket.file(fileName);
  // Generate signed URL with Content-Disposition = attachment
    const [url] = await file.getSignedUrl({
      action: "read",
      expires: Date.now() + 60 * 60 * 1000, // 1 hour
      responseDisposition: `attachment; filename="${fileName}"`,
    });
    return url;
  } catch (error) {
    console.error(`Error generating signed URL: ${error}`);
    throw error;
  }
};
