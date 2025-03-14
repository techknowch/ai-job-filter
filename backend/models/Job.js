const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    requirements: [String],
    skills: [{ type: String, required: true }],
    company: { type: String, required: true },
    location: { type: String, required: true },
    salary: { type: String },
    requiredExperience: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Job', JobSchema); 