const { Sequelize } = require('sequelize');
const config = require('./index');
const logger = require('./logger');

const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
    host: config.db.host,
    port: config.db.port,
    dialect: 'postgres',
    logging: (msg) => logger.debug(msg),
    pool: {
        max: 20,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        underscored: true,
        timestamps: true
    }
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        logger.info('🐘 PostgreSQL Connected Successfully (via Sequelize)!');

        // Sync models in dev environment if needed
        if (config.nodeEnv === 'development') {
            // await sequelize.sync({ alter: true });
            // logger.info('Database models synchronized.');
        }
    } catch (err) {
        logger.error('❌ PostgreSQL Connection Error: ' + err.message);
        process.exit(1);
    }
};

module.exports = sequelize;
module.exports.connectDB = connectDB;
