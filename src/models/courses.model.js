module.exports = (sequelize, Sequelize) => {
    const Courses = sequelize.define("courses", {
        course_id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        course_code: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        course_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        course_desc: {
            type: Sequelize.TEXT,
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'active'
        },
        created_by: {
            type: Sequelize.STRING
        },
        updated_by: {
            type: Sequelize.STRING
        }
    }, {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    return Courses;
}
