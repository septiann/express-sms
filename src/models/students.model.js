module.exports = (sequelize, Sequelize) => {
    const Students = sequelize.define("students", {
        student_id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        full_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        nis: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        dob: {
            type: Sequelize.DATEONLY,
        },
        pob: {
            type: Sequelize.STRING,
        },
        user_id: {
            type: Sequelize.BIGINT,
            allowNull: false
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

    return Students;
}
