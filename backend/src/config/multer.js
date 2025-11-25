import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'documents', // Store documents in Cloudinary under this folder
    allowed_formats: ["jpg", "jpeg", "png", "pdf", "doc", "docx"],
  },
});

// Allow a single file upload
const upload = multer({ storage }).single('document'); // Change 'document' to match frontend field name

export default upload;
