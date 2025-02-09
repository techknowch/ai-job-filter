const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const Resume = require('../models/Resume');
const nlpService = require('../services/nlpService');

// Get matching candidates for a job
router.get('/job/:jobId/candidates', async (req, res) => {
    try {
        const job = await Job.findById(req.params.jobId);
        const resumes = await Resume.find();
        const matches = await nlpService.findMatchingCandidates(job, resumes);
        res.json(matches);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get matching jobs for a resume
router.get('/resume/:resumeId/jobs', async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.resumeId);
        const jobs = await Job.find();
        const matches = await nlpService.findMatchingJobs(resume, jobs);
        res.json(matches);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 