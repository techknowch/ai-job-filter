const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const nlpService = require('../services/nlpService');

// Post a new job
router.post('/', async (req, res) => {
    try {
        const job = new Job(req.body);
        await job.save();
        res.status(201).json(job);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all jobs
router.get('/', async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get job by ID
router.get('/:id', async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        res.json(job);
    } catch (error) {
        res.status(404).json({ message: 'Job not found' });
    }
});

module.exports = router; 