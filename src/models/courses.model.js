module.exports = (sequelize, Sequelize) => {
    const Courses = sequelize.define("courses", {
        course_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        uid: {
            type: Sequelize.STRING,
            allowNull: false
        },
        course_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        course_student: {
            type: Sequelize.STRING,
            allowNull: false
        },
        slug: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    return Courses;
}
