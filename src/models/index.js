const Sequelize = require("sequelize");
const dbConfig = require("../configs/db.config");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: "0",
    port: dbConfig.PORT,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
    timezone: 'Asia/Jakarta'
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.courses = require("./courses.model")(sequelize, Sequelize);
db.classes = require("./classes.model")(sequelize, Sequelize);
db.users = require("./users.model")(sequelize, Sequelize);
db.students = require("./students.model")(sequelize, Sequelize);
db.students_courses = require("./students_courses.model")(sequelize, Sequelize);

module.exports = db;
