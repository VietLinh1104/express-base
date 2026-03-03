const userRepository = require('../repositories/user.repository');
const { generateToken } = require('../utils/jwt.utils');
const logger = require('../config/logger');

class AuthService {
    /**
     * Đăng ký người dùng mới
     */
    async register(userData) {
        try {
            const existingUser = await userRepository.findByEmail(userData.email);
            if (existingUser) {
                throw new Error('Email đã được sử dụng.');
            }

            const user = await userRepository.create(userData);
            const token = generateToken({ id: user.id, email: user.email, role: user.role });

            return { user, token };
        } catch (error) {
            logger.error(`Register Service Error: ${error.message}`);
            throw error;
        }
    }

    /**
     * Đăng nhập
     */
    async login(email, password) {
        try {
            const user = await userRepository.findByEmail(email);

            if (!user || !(await user.comparePassword(password))) {
                throw new Error('Email hoặc mật khẩu không chính xác.');
            }

            if (!user.is_active) {
                throw new Error('Tài khoản của bạn đã bị khóa.');
            }

            const token = generateToken({ id: user.id, email: user.email, role: user.role });

            return { user, token };
        } catch (error) {
            logger.error(`Login Service Error: ${error.message}`);
            throw error;
        }
    }
}

module.exports = new AuthService();
