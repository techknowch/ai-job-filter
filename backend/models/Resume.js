const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    fileType: {
        type: String,
        required: true
    },
    parsedSkills: [{
        type: String
    }],
    experience: {
        type: Number,
        default: 0
    },
    education: [String],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt timestamp before saving
ResumeSchema.pre('save', async function (next) {
    if (this.isModified('content')) {
        // Update parsed skills when content changes
        const nlpService = require('../services/nlpService');
        this.parsedSkills = await nlpService.extractSkillsFromText(this.content);
        this.experience = await nlpService.extractExperience(this.content);
    }
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Resume', ResumeSchema); 