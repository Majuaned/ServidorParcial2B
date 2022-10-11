const router = require('express').Router();

const {getUsuarios,postUsuarios} = require('../controllers/usuarios.controllers');

router.get('/tareas',getUsuarios);

router.post('/tareas',postUsuarios);

module.exports = router;
