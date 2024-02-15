const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/courses.controller');

router.get('/', (req, res) => {
    res.json({
        'message': 'ok'
    });
});

router.post('/', coursesController.create);

module.exports = router;
