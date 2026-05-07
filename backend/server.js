require('dotenv').config();
const qualityRoutes =require('./routes/qualityRoutes.js');
const express = require('express');
const corsConfig = require('./config/corsConfig');
const ErrorMiddleware = require('./middleware/Error.js');
const cookieParser = require('cookie-parser');
const connectDb = require('./config/databse.js');
const authRoutes = require('./routes/userRoutes.js')
const orderRoutes = require('./routes/orderRoutes.js');
const aiRoutes = require('./routes/aiRoutes.js');
const analyticsRoutes =require('./routes/analyticsRoutes.js');
const app = express();

// Middleware
app.use(corsConfig());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API Routes
app.use('/api/v1', authRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/ai', aiRoutes);

app.use('/api/v1/quality',qualityRoutes);
app.use('/api/v1/analytics',analyticsRoutes);

// Error Middleware
app.use(ErrorMiddleware);

// Database Connection
connectDb();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});