import rateLimit from 'express-rate-limit';

// Define the rate limit settings
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // Limit each IP to 100 requests per windowMs
  message: { success: false, message: "Too many requests, please try again later." },
  headers: true,
});

export default limiter;
