const authService = require('../services/auth.service');

class AuthController {
    /**
     * POST /api/v1/auth/register
     */
    async register(req, res) {
        try {
            const { user, token } = await authService.register(req.body);
            res.status(201).json({
                message: 'Đăng ký thành công!',
                data: { user, token }
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    /**
     * POST /api/v1/auth/login
     */
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const { user, token } = await authService.login(email, password);
            res.status(200).json({
                message: 'Đăng nhập thành công!',
                data: { user, token }
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    /**
     * GET /api/v1/auth/me
     * (Route bảo vệ bởi middleware)
     */
    async getMe(req, res) {
        res.status(200).json({
            message: 'Lấy thông tin cá nhân thành công!',
            data: req.user
        });
    }
}

module.exports = new AuthController();
