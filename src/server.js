const config = require('./config');
const logger = require('./config/logger');
const express = require('express');
const morgan = require('morgan');
const { connectDB } = require('./config/db');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

// Cấu hình Morgan để đẩy log HTTP vào Winston
app.use(morgan(
    ':method :url :status :res[content-length] - :response-time ms',
    { stream: { write: (message) => logger.http(message.trim()) } }
));

// Routes
app.use('/api/v1/auth', require('./routes/auth.routes'));

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(3000, () => {
    logger.info('Server is running on port 3000');
});