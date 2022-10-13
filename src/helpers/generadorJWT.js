//Esto es una función generadora de toquen que será requerida

const jwt = require('jsonwebtoken');

const generadorJWT = (USER)=>{
    return new Promise((resolve,reject) => {
        jwt.sign({userID:USER['_id']}, process.env.SECRET,{expiresIn:'10h'}, (err,token)=>{
            if(err){
                reject('Error al generar el token')
            }
            resolve(token)
        })
    })
}

module.exports = generadorJWT;