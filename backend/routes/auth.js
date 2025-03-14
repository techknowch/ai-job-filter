const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Helper function to generate token
const generateToken = (user) => {
    return jwt.sign(
        {
            userId: user._id,
            role: user.role,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '24h',
            algorithm: 'HS512' // Using a more secure algorithm
        }
    );
};

// Register new user
router.post('/register', async (req, res) => {
    try {
        const { email, password, role, name } = req.body;

        // Input validation
        if (!email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }

        // Hash password with higher rounds for better security
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = new User({
            email,
            password: hashedPassword,
            role,
            name
        });

        await user.save();

        // Generate token
        const token = generateToken(user);

        // Remove password from response
        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(201).json({
            success: true,
            token,
            user: userResponse
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred during registration'
        });
    }
});

// Login user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Input validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide both email and password'
            });
        }

        // Find user
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Generate token
        const token = generateToken(user);

        // Remove password from response
        const userResponse = user.toObject();
        delete userResponse.password;

        res.json({
            success: true,
            token,
            user: userResponse
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred during login'
        });
    }
});

module.exports = router; 