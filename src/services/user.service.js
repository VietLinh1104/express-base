const userRepository = require('../repositories/user.repository');
const logger = require('../config/logger');

class UserService {
    async createUser(userData) {
        try {
            logger.info(`Creating new user with email: ${userData.email}`);

            // Check if user already exists
            const existingUser = await userRepository.findByEmail(userData.email);
            if (existingUser) {
                throw new Error('User already exists');
            }

            // In a real app, hash password here if not handled by model hooks
            return await userRepository.create(userData);
        } catch (error) {
            logger.error(`Error in UserService.createUser: ${error.message}`);
            throw error;
        }
    }

    async getUserById(id) {
        const user = await userRepository.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    async getAllUsers() {
        return await userRepository.findAll();
    }

    async updateUser(id, updateData) {
        const user = await userRepository.update(id, updateData);
        if (!user) {
            throw new Error('User not found or update failed');
        }
        return user;
    }

    async deleteUser(id) {
        const deleted = await userRepository.delete(id);
        if (!deleted) {
            throw new Error('User not found or delete failed');
        }
        return true;
    }
}

module.exports = new UserService();
