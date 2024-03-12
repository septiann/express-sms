const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/courses.controller');
const courseValidator = require('../validators/courses.validator');

router.post('/', courseValidator.courseSchema, coursesController.create);
router.get('/', coursesController.findAll);
router.get('/:course_code', coursesController.findOne);
router.put('/:id', courseValidator.courseSchema, coursesController.update);
router.delete('/:id', coursesController.delete);

/* router.delete('/', coursesController.deleteAll); */

module.exports = router;
