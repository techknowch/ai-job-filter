const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, required: true },
    parsedSkills: [String],
    experience: [String],
    education: [String],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Resume', resumeSchema); 