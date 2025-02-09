const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    requirements: [String],
    skills: [String],
    company: { type: String, required: true },
    location: String,
    salary: String,
    createdAt: { type: Date, default: Date.now },
    employerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Job', jobSchema); 