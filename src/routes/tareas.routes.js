const router = require('express').Router();
const validarJWT = require('../middlewares/validadorJWT');

const { getTareas,getTareas_User, postTareas,putTareas,deleteTarea} = require('../controllers/tareas.controllers');

router.get('/tareas',getTareas);

router.get('/tareas/misTareas',[validarJWT],getTareas_User)

router.post('/tareas',[validarJWT],postTareas);

router.put('/tareas/:idTarea',[validarJWT],putTareas);

router.delete('/tareas/:idTarea',[validarJWT],deleteTarea);

module.exports = router;
