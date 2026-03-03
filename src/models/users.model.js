const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

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
    underscored: true, // Tự động hiểu created_at thay vì createdAt
    timestamps: true   // Tự động quản lý created_at và updated_at
});

module.exports = User;