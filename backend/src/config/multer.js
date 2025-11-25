import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'professional_documents',
    allowed_formats: ["jpg", "jpeg", "png", "pdf", "doc", "docx"],
    resource_type: 'auto', // Automatically detect resource type
  },
});

// Configure multer for multiple file uploads
const upload = multer({ 
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB file size limit
  },
});

// Export different upload configurations
export const uploadSingle = upload.single('document');

export const uploadProfessionalDocuments = upload.fields([
  { name: 'profilePicture', maxCount: 1 },
  { name: 'licenseDocument', maxCount: 1 },
  { name: 'primaryCertificate', maxCount: 1 },
  { name: 'selfieImage', maxCount: 1 },
  { name: 'governmentIDDocument', maxCount: 1 },
  { name: 'additionalCertificates', maxCount: 5 }, // Allow up to 5 additional certificates
]);

export default upload;
