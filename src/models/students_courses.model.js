module.exports = (sequelize, Sequelize) => {
    const StudentsCourses = sequelize.define("students_courses", {
        student_course_id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        uuid: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        student_id: {
            type: Sequelize.BIGINT,
            allowNull: false
        },
        course_id: {
            type: Sequelize.BIGINT,
            allowNull: false
        },
        class_id: {
            type: Sequelize.BIGINT,
            allowNull: false
        },
        active_year: {
            type: Sequelize.STRING,
            allowNull: false
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

    return StudentsCourses;
}
