import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("Cloudinary Config Check:");
console.log("- Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME ? "Set" : "Missing");
console.log("- API Key:", process.env.CLOUDINARY_API_KEY ? "Set" : "Missing");
console.log("- API Secret:", process.env.CLOUDINARY_API_SECRET ? "Set" : "Missing");

export const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'iics_documents',
      resource_type: 'auto', // Automatically detect file type (raw/image/video)
    });
    return result.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};
