const router = require('express').Router();

const {getUsuarios,postUsuarios} = require('../controllers/usuarios.controllers');

router.get('/usuarios',getUsuarios);

router.post('/usuarios',postUsuarios);

module.exports = router;
