const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const pdf = require('pdf-parse');
const Resume = require('../models/Resume');
const nlpService = require('../services/nlpService');

// Configure multer for file upload
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['.pdf', '.doc', '.docx'];
        const ext = path.extname(file.originalname).toLowerCase();
        if (allowedTypes.includes(ext)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'));
        }
    },
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

// Upload and process resume
router.post('/upload', upload.single('resume'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        let textContent = '';

        // Extract text from PDF
        if (req.file.mimetype === 'application/pdf') {
            const data = await pdf(req.file.buffer);
            textContent = data.text;
        } else {
            // For doc/docx files, you'd need additional processing
            // Consider using mammoth or similar library
            textContent = req.file.buffer.toString();
        }

        // Process the text using NLP
        const skills = await nlpService.extractKeywords(textContent);

        // Create new resume document
        const resume = new Resume({
            userId: req.user?._id, // Assuming user authentication is implemented
            content: textContent,
            parsedSkills: skills,
            // Add more extracted information as needed
        });

        await resume.save();

        res.status(201).json({
            message: 'Resume uploaded successfully',
            resumeId: resume._id,
            skills: skills
        });

    } catch (error) {
        console.error('Resume upload error:', error);
        res.status(500).json({ message: 'Error processing resume' });
    }
});

module.exports = router; 