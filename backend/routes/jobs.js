const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const auth = require('../middleware/auth');

// Get all jobs
router.get('/', async (req, res) => {
    try {
        const jobs = await Job.find().sort({ createdAt: -1 });
        console.log('Jobs retrieved:', jobs);
        res.json({
            success: true,
            data: jobs
        });
    } catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching jobs'
        });
    }
});

// Get employer's jobs
router.get('/employer/:userId', auth, async (req, res) => {
    try {
        const jobs = await Job.find({ userId: req.params.userId }).sort({ createdAt: -1 });
        res.json({
            success: true,
            data: jobs
        });
    } catch (error) {
        console.error('Error fetching employer jobs:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching employer jobs'
        });
    }
});

// Post a new job
router.post('/', auth, async (req, res) => {
    try {
        const { title, company, description, location, skills, salary, requiredExperience } = req.body;

        const job = new Job({
            title,
            company,
            description,
            location,
            skills: Array.isArray(skills) ? skills : [],
            salary,
            requiredExperience,
            userId: req.user.userId
        });

        await job.save();

        console.log('Job created:', job);

        res.status(201).json({
            success: true,
            data: job
        });
    } catch (error) {
        console.error('Error creating job:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating job'
        });
    }
});

// Get job by ID
router.get('/:id', async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({
                success: false,
                message: 'Job not found'
            });
        }
        res.json({
            success: true,
            data: job
        });
    } catch (error) {
        console.error('Error fetching job:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching job'
        });
    }
});

// Update job
router.put('/:id', auth, async (req, res) => {
    try {
        const job = await Job.findOne({ _id: req.params.id, userId: req.user.userId });
        if (!job) {
            return res.status(404).json({
                success: false,
                message: 'Job not found or unauthorized'
            });
        }

        Object.assign(job, req.body);
        await job.save();

        res.json({
            success: true,
            data: job
        });
    } catch (error) {
        console.error('Error updating job:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating job'
        });
    }
});

// Delete job
router.delete('/:id', auth, async (req, res) => {
    try {
        const job = await Job.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
        if (!job) {
            return res.status(404).json({
                success: false,
                message: 'Job not found or unauthorized'
            });
        }
        res.json({
            success: true,
            message: 'Job deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting job:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting job'
        });
    }
});

module.exports = router; 