const dotenv = require('dotenv');

// Tải file .env
dotenv.config();

const config = {
    port: process.env.PORT,
    nodeEnv: process.env.NODE_ENV,
    db: {
        uri: process.env.DATABASE_URL,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
    }
};

module.exports = config;