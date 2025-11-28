import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Admin from '../models/admin.model.js';

dotenv.config();

const isAdmin = async (req, res, next) => {
  const token = req.cookies.soulace_admin_token;

  if (!token) {
    return res.status(401).json({ message: 'Access denied by Middleware. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Decoded =",decoded);
    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      return res.status(401).json({ message: 'Access denied. Admin not found.' });
    }

    req.admin = admin;
    next();
  } catch (err) {
    console.error('Error in isAdmin middleware:', err);
    res.status(400).json({ message: 'Invalid token.' });
  }
};

export default isAdmin;