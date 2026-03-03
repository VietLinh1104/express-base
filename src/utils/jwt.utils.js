const jwt = require('jsonwebtoken');
const config = require('../config');

/**
 * Tạo access token mới
 * @param {Object} payload - Dữ liệu muốn lưu vào token (thường là {id, email, role})
 * @returns {string} token
 */
const generateToken = (payload) => {
    return jwt.sign(payload, config.jwt.secret, {
        expiresIn: config.jwt.expiresIn || '1d'
    });
};

/**
 * Xác thực token
 * @param {string} token
 * @returns {Object} payload - Dữ liệu sau khi giải mã
 */
const verifyToken = (token) => {
    try {
        return jwt.verify(token, config.jwt.secret);
    } catch (error) {
        throw new Error('Token không hợp lệ hoặc đã hết hạn');
    }
};

module.exports = {
    generateToken,
    verifyToken
};
