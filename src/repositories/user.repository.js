const User = require('../models/users.model');

class UserRepository {
    async create(userData) {
        return await User.create(userData);
    }

    async findById(id) {
        return await User.findByPk(id);
    }

    async findByEmail(email) {
        return await User.findOne({ where: { email } });
    }

    async update(id, updateData) {
        const user = await User.findByPk(id);
        if (user) {
            return await user.update(updateData);
        }
        return null;
    }

    async delete(id) {
        const user = await User.findByPk(id);
        if (user) {
            await user.destroy();
            return true;
        }
        return false;
    }

    async findAll(filters = {}) {
        return await User.findAll({ where: filters });
    }
}

module.exports = new UserRepository();
