require('dotenv').config();

const express = require('express');
const corsConfig = require('./config/corsConfig');
const ErrorMiddleware = require('./middleware/Error.js');
const cookieParser = require('cookie-parser');
const connectDb = require('./config/databse.js');

const app = express();

// Middleware
app.use(corsConfig());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API Routes
// app.use('/api/auth', authRoutes);

// Error Middleware
app.use(ErrorMiddleware);

// Database Connection
connectDb();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});