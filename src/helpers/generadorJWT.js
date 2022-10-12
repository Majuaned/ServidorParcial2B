//Esto es una función generadora de toquen que será requerida

const jwt = require('jsonwebtoken');

const generadorJWT = (ID)=>{
    return new Promise((resolve,reject) => {
        jwt.sign(ID, process.env.SECRET,{expiresIn:'10h'}, (err,token)=>{
            if(err){
                reject('Error al generar el token')
            }
            resolve(token)
        })
    })
}

module.exports = generadorJWT;