const db = require("../models/");
const Courses = db.courses;
const Op = db.Sequelize.Op;
const slugify = require("slugify");
const { v4 } = require("uuid");

// Membuat dan menyimpan Course baru
exports.create = async (req, res) => {
    // Validation
    if (!req.body.course_name || !req.body.course_student) {
        return res.status(400).json({
            status: "E",
            message: "Content cannot be empty!",
        });
    }

    // Action
    try {
        const slug = slugify(req.body.course_name + '-' + req.body.course_student).toLowerCase();
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
                    "status": "S",
                    "message": "Course created successfully.",
                    "data": data
                });
            }).catch(err => {
                console.error(err);

                res.status(500).json({
                    "status": "E",
                    "message": "Some error occurred while creating the Course."
                });
            });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            "status": "E",
            "message": "Internal Server Error: " + error.message,
            "data": null
        });
    }
};

// Mendapatkan semua data Courses dari database
exports.findAll = async (req, res) => {
    const courseStudent = req.query.course_student;
    let condition = courseStudent ? { course_student: `${courseStudent}`} : null;

    try {
        await Courses.findAll({ where: condition })
            .then(data => {
                if (data.length === 0) throw 0;

                res.status(200).json({
                    "status": "S",
                    "message": "Courses retrieved successfully.",
                    "data": data
                });
            }).catch(err => {
                console.error(err);

                let httpStatusCode = 500;
                let msg = "Some error occured while retrieving Courses.";

                if (err === 0) {
                    httpStatusCode = 404;
                    msg = "Courses not found with Course Student: " + courseStudent;
                }

                res.status(httpStatusCode).json({
                    "status": "E",
                    "message": msg,
                    "data": null
                });
            });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            "status": "E",
            "message": "Internal Server Error: " + error.message,
            "data": null
        });
    }
};

// Mendapatkan data single Course with UUID
exports.findOne = async (req, res) => {
    const uid = req.params.uid;

    await Courses.findOne({ where: { uid: `${uid}` }})
        .then(data => {
            if (data) {
                res.status(200).json({
                    "status": "S",
                    "message": `Course retrieved successfully.`,
                    "data": data
                });
            } else {
                res.status(404).json({
                    "status": "E",
                    "message": `Course not found.`,
                    "data": null
                });
            }
        }).catch(err => {
            res.status(500).json({
                "status": "E",
                "message": "Internal Server Error: " + err.message,
                "data": null
            });
        });
};

// Update Course berdasarkan UID di request
exports.update = (req, res) => {
    const uid = req.params.uid;

    try {
        // Get Course first
        const courseObj = Courses.findOne({
            where: {
                uid: uid
            }
        });

        // Validation
        if (!courseObj) {
            throw "Course not found";
        }

        req.body.slug = slugify(req.body.course_name + '-' + req.body.course_student).toLowerCase();

        // Action
        Courses.update(req.body, {
            where: { uid: uid }
        }).then(status => {
            console.log(status);

            if (status == 1) {
                res.status(200).json({
                    "status": "S",
                    "message": "Course was updated successfully."
                });
            } else {
                res.status(500).json({
                    "status": "E",
                    "message": `Cannot update Course!`
                });
            }
        }).catch(err => {
            console.error(err);

            res.status(500).json({
                "status": "E",
                "message": "Error updating Tutorial: " + err.message,
                "data": null
            });
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            "status": "E",
            "message": "Internal Server Error: " + error.message,
            "data": null
        });
    }
}
