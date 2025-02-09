const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const jobsRouter = require('./routes/jobs');
const usersRouter = require('./routes/users');
const matchingRouter = require('./routes/matching');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/jobs', jobsRouter);
app.use('/api/users', usersRouter);
app.use('/api/matching', matchingRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
