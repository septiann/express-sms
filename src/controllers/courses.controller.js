const db = require("../models/");
const Courses = db.courses;
const Op = db.Sequelize.Op;
const helper = require("../utils/helper.util");

const getLastCoursesByClass = async (courseType, classCode) => {
    try {
        const data = await db.sequelize.query(`SELECT (SUBSTR(course_code,7,3)) AS last_code, (SUBSTR(course_code,4,2)) AS class
        FROM courses
        WHERE 1 = 1 
        AND course_code LIKE '${courseType}-${classCode}-%'
        ORDER BY last_code DESC, class DESC
        LIMIT 1 `, {
            type: db.sequelize.QueryTypes.SELECT
        });

        return data;
    } catch (error) {
        console.error(error);

        return "";
    }
};

exports.create = async (req, res) => {
    const lastCourseCode = await getLastCoursesByClass(req.body.course_type_id, req.body.class);
    const nextNumber = helper.getNextNumber(lastCourseCode);
    let course_code = `${req.body.course_type_id}-${req.body.class}-${nextNumber}`; // ex: 01-10-001 | 01 = General, 02 = IPA, 03 = IPS

    const course = {
        course_code: course_code,
        course_name: req.body.course_name,
        course_desc: req.body.course_desc,
        status: req.body.status,
        created_by: req.body.created_by
    }

    await Courses.create(course)
    .then(data => {
        return res.status(200).json({
            message: "Successfully created a new course.",
            data: data
        });
    }).catch(err => {
        return res.status(500).send({
            message: err.message || "Some error occurred while creating a new course."
        });
    });
};

exports.findAll = async (req, res) => {
    let conditions = {};

    if (req.query.course_code) {
        conditions.course_code = req.query.course_code;
    }
    if (req.query.course_name) {
        conditions.course_name = { [Op.like]: '%'+ req.query.course_name +'%' };
    }
    if (req.query.status) {
        conditions.status = req.query.status === 'active' ? 'active' : 'inactive';
    }
    if (req.query.course_class) {
        conditions.course_code = { [Op.like]: '%-'+ req.query.course_class +'-%' };
    }

    await Courses.findAll({
        where: conditions
    }).then(data => {
        if (data.length == 0) {
            res.status(404).send({
                message: "Couldn't find any courses"
            });
        } else {
            res.status(200).send(data);
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving courses."
        });
    });
};

exports.findOne = async (req, res) => {
    const course_code = req.params.course_code;

    await Courses.findOne({ where: { course_code: course_code }})
    .then(data => {
        if (!data) {
            res.status(404).send({
                message: "No course found"
            });
        } else {
            res.status(200).send(data);
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving course."
        });
    });
};

exports.update = async (req, res) => {
    const course_id = req.params.id;
    
    await Courses.findOne({
        where: {
            course_id: course_id
        }
    })
    .then(async () => {
        await Courses.update(req.body, {
            where: { course_id: course_id }
        }).then(() => {
            res.status(200).send({
                message: "Successfully updated the course."
            });
        }).catch(err => {
            res.status(500).send({
                message: "Failed to update course. " + err.message
            });
        });
    })
    .catch(err => {
        return res.status(404).send({
            message: 'Course not found',
        });
    });
}

exports.delete = async (req, res) => {
    const course_id = req.params.id;

    await Courses.findOne({
        where: {
            course_id: course_id
        }
    }).then(async () => {
        await Courses.destroy({
            where: {
                course_id: course_id
            }
        }).then(() => {
            res.status(200).send({
                message: "Successfully deleted the class."
            });
        });
    }).catch(error => {
        res.status(404).send({
            message: "Failed to delete class. " + error.message
        });
    });
};

/* exports.deleteAll = async (req, res) => {
    await Courses.destroy({
        where: {},
        truncate: false
    }).then(nums => {
        res.status(200).json({
            "status": "S",
            "message": `${nums} Course(s) were deleted successfully!`
        });
    }).catch(err => {
        res.status(500).json({
            "status": "E",
            "message": "Something was wrong. Err: " + err.message
        });
    });
};

exports.findByCondition = async (req, res) => {
    const className = req.query.class ? req.query.class : "";
    const status = req.query.status;

    await Courses.findAll({
        where: {
            course_student: className,
            status: status
        }
    }).then(data => {
        res.status(200).json({
            "status": "S",
            "message": "Course retrieved successfully.",
            "data": data
        });
    }).catch(err => {
        res.status(500).json({
            "status": "E",
            "message": "Something was wrong. Err: " + err.message,
            "data": data
        });
    });
}; */
