import jwt from 'jsonwebtoken';
import User from '../models/User.model.js'; // Ensure correct model import

const checkRegisteredUser = async (req, res, next) => {
    try {
        // Check if token exists in cookies
        const token = req.cookies?.soulace_token;
        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        if (!decoded?.userId) {
            return res.status(401).json({ success: false, message: "Unauthorized: Invalid token payload" });
        }

        // Fetch user from DB
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ success: false, message: "Unauthorized: User not found" });
        }

        // Attach user to request object for further use
        req.user = user;
        next(); // Proceed to next middleware
    } catch (error) {
        console.error("Error in checkRegisteredUser middleware:", error);

        // Handle specific JWT errors
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ success: false, message: "Unauthorized: Token has expired" });
        } else if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
        }

        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export default checkRegisteredUser;
