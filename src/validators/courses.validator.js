const Joi = require('joi');

exports.courseSchema = (req, res, next) => {
    const data = req.body;

    const courseSchema = Joi.object({
        course_name: Joi.string().required().messages({ "string.empty": "Course Name is not allowed to be empty" }),
        course_desc: Joi.string().optional(),
        course_type_id: Joi.string().required().messages({ "string.empty": "Course Type is not allowed to be empty"}),
        class: Joi.string().required().messages({ "string.empty": "Class is not allowed to be empty"}),
        status: Joi.string().required().messages({ "string.empty": "Status is not allowed to be empty" }),
        created_by: Joi.string().required(),
    });
    
    const { error, value } = courseSchema.validate(data, {
        abortEarly: false,
        errors: {
            label: "key",
            wrap: {
                label: false
            }
        }
    });

    if (error) {
        console.log(error);
        const errorMessage = [];

        error.details.forEach((el) => {
            errorMessage.push(el.message);
        });

        return res.status(400).send(errorMessage);
    }

    next();
}
