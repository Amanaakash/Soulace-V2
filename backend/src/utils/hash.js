import bcrypt from 'bcryptjs';

// Function to hash a password
export const hashPassword = async (rawPassword) => {
  try {
    // Generate salt
    const salt = await bcrypt.genSalt(10); // 10 rounds of salting
    
    // Hash the password with the salt
    const hashedPassword = await bcrypt.hash(rawPassword, salt);
    
    return hashedPassword;  // Return the hashed password
  } catch (error) {
    console.error('Error hashing password:', error);
    throw new Error('Error while hashing password');
  }
};
