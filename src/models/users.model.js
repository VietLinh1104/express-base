const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcryptjs');

class User extends Model {
    isAdmin() {
        return this.role === 'admin';
    }

    // Ẩn các thông tin nhạy cảm khi trả về JSON (như password_hash)
    toJSON() {
        const values = { ...this.get() };
        delete values.password_hash;
        return values;
    }

    // Kiểm tra mật khẩu
    async comparePassword(password) {
        return await bcrypt.compare(password, this.password_hash);
    }
}

User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: { isEmail: true } // Validate ngay tại tầng Model
    },
    password_hash: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    full_name: {
        type: DataTypes.STRING(255)
    },
    avatar_url: {
        type: DataTypes.TEXT
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    underscored: true,
    timestamps: true,
    hooks: {
        beforeSave: async (user) => {
            if (user.changed('password_hash')) {
                const salt = await bcrypt.genSalt(10);
                user.password_hash = await bcrypt.hash(user.password_hash, salt);
            }
        }
    }
});

module.exports = User;