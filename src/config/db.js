const { Pool } = require('pg');
const config = require('./index');
const logger = require('./logger'); // Tái sử dụng logger đã tạo ở bước trước

// Khởi tạo Pool với các thông số từ file .env
const pool = new Pool({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
});

// Kiểm tra kết nối khi khởi động
const connectDB = async () => {
    try {
        const client = await pool.connect();
        logger.info('🐘 PostgreSQL Connected Successfully!');
        client.release(); // Trả kết nối lại cho pool
    } catch (err) {
        logger.error('❌ PostgreSQL Connection Error: ' + err.message);
        process.exit(1); // Dừng app nếu ko có DB
    }
};

module.exports = {
    query: (text, params) => pool.query(text, params), // Export hàm query để dùng sau này
    connectDB
};