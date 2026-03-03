const { verifyToken } = require('../utils/jwt.utils');
const userRepository = require('../repositories/user.repository');
const logger = require('../config/logger');

/**
 * Middleware xác thực JWT
 */
const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Không tìm thấy Token. Vui lòng đăng nhập.' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = verifyToken(token);

        // Lấy thông tin user từ database để đảm bảo user vẫn tồn tại và active
        const user = await userRepository.findById(decoded.id);

        if (!user || !user.is_active) {
            return res.status(401).json({ message: 'User không tồn tại hoặc đã bị khóa.' });
        }

        // Gắn thông tin user vào request object
        req.user = user;
        next();
    } catch (error) {
        logger.error(`Auth Middleware Error: ${error.message}`);
        return res.status(401).json({ message: error.message });
    }
};

/**
 * Middleware kiểm tra quyền Admin
 */
const adminMiddleware = (req, res, next) => {
    if (req.user && req.user.isAdmin()) {
        next();
    } else {
        return res.status(403).json({ message: 'Bạn không có quyền truy cập tính năng này.' });
    }
};

module.exports = {
    authMiddleware,
    adminMiddleware
};
