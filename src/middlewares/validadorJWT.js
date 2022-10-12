const modelUsua = require('../models.usuarios');
const jwt = require('jsonwebtoken');

const validarJWT = async (req, res, next) => {
    const token = req.headers.authorization;

    if(!token){
        console.log("Error en el token de autenticación")
    }

    try {
        const {idUsertk} = await jwt.verify(token, process.env.SECRET);
        const usuariotk = await modelUsua.findByid(idUsertk);

        if(!usuariotk){
            return res.json('Token no válido')
        }

        req.user = Usuario;
        next();
    } catch (error) {
        res.json("Error con el token")
    }
}

module.exports = validarJWT;