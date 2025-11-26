import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Admin from '../models/admin.model.js';
import dotenv from 'dotenv';

dotenv.config();

const insertAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@soulace.com' });
    
    if (existingAdmin) {
      console.log('Admin already exists with email: admin@soulace.com');
      process.exit(0);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash('12345678@soulace', 10);

    // Create new admin
    const newAdmin = new Admin({
      username: 'admin',
      email: 'admin@soulace.com',
      password: hashedPassword,
      role: 'Admin',
    });

    // Save admin to database
    await newAdmin.save();
    console.log('✅ Admin inserted successfully!');
    console.log('Email: admin@soulace.com');
    console.log('Password: 12345678@soulace');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error inserting admin:', error);
    process.exit(1);
  }
};

insertAdmin();
