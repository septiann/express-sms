module.exports = (sequelize, Sequelize) => {
    const Classes = sequelize.define("classes", {
        class_id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        uuid: {
            type: Sequelize.STRING,
            allowNull: false
        },
        class_code: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        level: {
            type: Sequelize.STRING,
            allowNull: false
        },
        group: {
            type: Sequelize.STRING,
            allowNull: false
        },
        school_year: {
            type: Sequelize.STRING,
            allowNull: false
        },
        major: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        slug: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
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

    return Classes;
}
