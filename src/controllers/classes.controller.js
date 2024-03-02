const db = require('../models');
const Classes = db.classes;
const Op = db.Sequelize.Op;
const slugify = require("slugify");
const { v4 } = require("uuid");
const helper = require("../utils/helper.util");

const getLastClassCodeByMajor = async (major) => {
    try {
        const data = await db.sequelize.query(`SELECT (SUBSTR(class_code,5,3)) AS last_class_code 
        FROM classes
        WHERE 1 = 1 
        AND major = :major
        ORDER BY last_class_code DESC 
        LIMIT 1 `, {
            replacements: { major: major },
            type: db.sequelize.QueryTypes.SELECT
        });

        return data;
    } catch (error) {
        console.error(error);

        return "";
    }
};

exports.create = async (req, res) => {
    const lastClassCode = await getLastClassCodeByMajor(req.body.major);
    const nextNumber = helper.getNextNumber(lastClassCode);
    const slugClass = slugify(`${req.body.major}-${nextNumber}-${req.body.level}-${req.body.group}-${req.body.school_year}`).toLowerCase();

    // Validations
    if (!req.body.level || !req.body.school_year || !req.body.major || !req.body.group) {
        return res.status(400).send({
            message: "Content cannot be empty!"
        });
    }

    // Action
    const classes = {
        uuid: v4(),
        class_code: req.body.major + '-' + nextNumber,
        level: req.body.level,
        group: req.body.group,
        school_year: req.body.school_year,
        major: req.body.major,
        slug: slugClass,
        created_by: req.body.created_by
    }

    await Classes.create(classes)
    .then(data => {
        return res.status(200).json({
            message: "Successfully created a new class.",
            data: data
        });
    }).catch(err => {
        return res.status(500).send({
            message: err.message || "Some error occurred while creating the class."
        });
    });
};

exports.findAll = async (req, res) => {
    let conditions = {};

    if (req.query.major) {
        conditions.major = req.query.major;
    }
    if (req.query.level) {
        conditions.level = req.query.level;
    }
    if (req.query.school_year) {
        conditions.school_year = req.query.school_year;
    }

    await Classes.findAll({
        where: conditions
    }).then(data => {
        if (data.length == 0) {
            res.status(404).send({
                message: "Couldn't find any classes"
            });
        } else {
            res.status(200).send(data);
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving classes."
        });
    });
};

exports.findOne = async (req, res) => {
    const slug = req.params.slug;

    await Classes.findOne({
        where: {
            slug: slug
        }
    }).then(data => {
        if (!data) {
            res.status(404).send({
                message: "No class found"
            });
        } else {
            res.status(200).send(data);
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving class."
        });
    });
};

exports.update = async (req, res) => {
    const uuid = req.params.uuid;
    const lastClassCode = await getLastClassCodeByMajor(req.body.major);
    const nextNumber = helper.getNextNumber(lastClassCode);
    
    if (req.body.level || req.body.group || req.body.school_year || req.body.major) {
        const newSlug = `${req.body.major}-${nextNumber}-${req.body.level}-${req.body.group}-${req.body.school_year}`;

        req.body.class_code = req.body.major + "-" + nextNumber;
        req.body.slug = newSlug.toLowerCase();
    }

    try {
        await Classes.findOne({
            where: { 
                uuid: uuid 
            }
        }).then(async () => {
            await Classes.update(req.body, {
                where: { uuid: uuid },
                returning: true
            }).then(data => {
                console.log(data);

                res.status(200).send({
                    message: "Successfully updated the class."
                });
            }).catch(err => {
                throw new Error("Failed to update class. " + err.message);
            });
        }).catch(err => {
            throw new Error("No class found. " + err.message);
        });
    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const uuid = req.params.uuid;

        await Classes.findOne({
            where: {
                uuid: uuid
            }
        }).then(async () => {
            await Classes.destroy({
                where: {
                    uuid: uuid
                }
            }).then(() => {
                res.status(200).send({
                    message: "Successfully deleted the class."
                });
            });
        }).catch(error => {
            throw new Error("Failed to delete class. " + error.message);
        });
    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
};
