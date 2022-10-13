const usuario = require('../models/models.usuarios');
const generarJWT = require('../helpers/generadorJWT');
const bcrypt = require('bcrypt');

const ctrlAuthen = {};

ctrlAuthen.login = async (req, res, next) => {
    try {
        const {nombreUsuario, password} = req.body;
        const userX = await usuario.findOne({nombreUsuario});
    if(!userX){
        return res.json("No se pudo autenticar")
    }
    if (!userX.activo) {
            return res.json("No se pudo autenticar el usuario")
    }
    // si pasan los errores...
    const passValidado = bcrypt.compareSync(password,userX.password);

    if(!passValidado){
        return res.json("Usuario o Contraseña incorrecta")
    }
    const token = await generarJWT(userX)

    return res.json({
        token
    })
    }catch(error){
        return res.json("Error al iniciar la sesión")
    }
}

module.exports = ctrlAuthen;