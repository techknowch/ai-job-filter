const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['employer', 'jobseeker'], required: true },
    name: String,
    company: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema); 