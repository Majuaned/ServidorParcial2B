const modelUsua = require('../models/models.usuarios');
const jwt = require('jsonwebtoken');

const validarJWT = async (req, res, next) => {
    const token = req.headers.authorization;

    if(!token){
        console.log("Error en el token de autenticación")
    }

    try {
        const {userID} = await jwt.verify(token, process.env.SECRET);
        const usuariotk = await modelUsua.findById(userID);

        if(!usuariotk){
            return res.json('Token no válido')
        }
        //linea más importante
        req.user = usuariotk;

        next();
    } catch (error) {
        res.json({message:"Error con el token",error:error.message})
    }
}

module.exports = validarJWT;