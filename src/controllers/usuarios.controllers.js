//Se importa el midleware json
//const {json}= require('express');

//se requiere el modelo de tareas de la carpeta de modelos, el cual ya debe estar hecho....y se la guarda en una variable 

const ColeccionUsuarios = require('../models/models.usuarios');

ctrlUsuarios = {};

ctrlUsuarios.getUsuarios = async (req,res)=>{
    const tareas = await ColeccionUsuarios.find()
    return res.json(tareas)
}

ctrlUsuarios.postUsuarios = async (req,res)=>{
    const {nombreUsuario,
           password,
           email}=req.body;
    //instanciado...
    const newUsuario = new ColeccionUsuarios({
        nombreUsuario,
        password,
        email
    })
    const usuariobd = await newUsuario.save();
    return res.json({
        message:'Usuario cargada a la base de datos',
        usuariobd
    })
}

module.exports = ctrlUsuarios;


