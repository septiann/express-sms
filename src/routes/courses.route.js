const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/courses.controller');

/* router.get('/', (req, res) => {
    res.json({
        'message': 'ok'
    });
}); */

router.post('/', coursesController.create);
router.get('/', coursesController.findAll);
router.get('/:uid', coursesController.findOne);
router.put('/:uid', coursesController.update);

module.exports = router;
