const express = require('express');
const router = express.Router();
const classesController = require('../controllers/classes.controller');

router.post('/', classesController.create);
router.get('/', classesController.findAll);
router.get('/:slug', classesController.findOne);
router.put('/:uuid', classesController.update);
router.delete('/:uuid', classesController.delete);

/* router.delete('/', classesController.deleteAll); */

module.exports = router;
