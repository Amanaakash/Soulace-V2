import Professional from '../models/professional.model.js';

export const isProfessional = async (req, res, next) => {
    try {
        // Get the user ID from the authenticated request
        const userId = req.user.id;

        // Check if a professional exists with this user ID
        const professional = await Professional.findOne({ _id: userId });

        if (!professional) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Only professionals can access this resource.'
            });
        }

        // If verified as professional, attach professional data to request
        req.professional = professional;

        // Proceed to the next middleware/controller
        next();
    } catch (error) {
        console.error('Error in isProfessional middleware:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error while verifying professional status'
        });
    }
};
