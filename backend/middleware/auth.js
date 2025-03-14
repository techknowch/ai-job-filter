const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const verifyAsync = promisify(jwt.verify);

module.exports = async (req, res, next) => {
    try {
        // Get token from header
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. No token provided.'
            });
        }

        // Verify token
        const decoded = await verifyAsync(token, process.env.JWT_SECRET);

        // Add user info to request
        req.user = decoded;

        // Check token expiration
        if (Date.now() >= decoded.exp * 1000) {
            return res.status(401).json({
                success: false,
                message: 'Token has expired'
            });
        }

        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Invalid token'
        });
    }
}; 