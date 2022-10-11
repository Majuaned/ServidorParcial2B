const router = require('express').Router();

const { getTareas, postTareas} = require('../controllers/tareas.controllers');

router.get('/tareas',getTareas);

router.post('/tareas',postTareas);

module.exports = router;
