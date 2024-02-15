const db = require("../models/");
const Courses = db.courses;
const Op = db.Sequelize.Op;
const slugify = require("slugify");
const { v4 } = require("uuid");

exports.create = async (req, res) => {
    // Validation
    if (!req.body.course_name || !req.body.course_student) {
        return res.status(400).json({
            status: "error",
            message: "Content cannot be empty!",
        });
    }

    // Action
    try {
        const slug = slugify(req.body.course_name).toLowerCase();
        const uuid = v4();

        const course = {
            uid: uuid,
            course_name: req.body.course_name,
            course_student: req.body.course_student,
            slug: slug
        }

        await Courses.create(course)
            .then(data => {
                res.status(201).json({
                    "status": "success",
                    "message": "Course created successfully",
                    "data": data
                });
            }).catch(err => {
                console.error(err);

                res.status(500).json({
                    "status": "error",
                    "message": "Some error occurred while creating the course"
                });
            });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            status: "error",
            message: "Internal Server Error: " + error.message,
            data: null
        });
    }
}
