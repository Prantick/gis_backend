import sequelize from 'sequelize';
export const dbConfig = async () => {
    try {
        const db = new sequelize.Sequelize('gis', 'root', 'root', {
            host: 'localhost',
            dialect: 'mysql',
            port: '3307',
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        });
        await db.authenticate();
        console.log('Database Connection has been established successfully.');
        global.sequelize = db;
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};