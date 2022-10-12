//Se importa el midleware json
//const {json}= require('express');

//se requiere el modelo de tareas de la carpeta de modelos, el cual ya debe estar hecho....y se la guarda en una variable 

const ColeccionTareas = require('../models/models.tareas');

ctrlTareas = {};

ctrlTareas.getTareas = async (req,res)=>{
    const tareas = await ColeccionTareas.find()
    return res.json({
        message:`El numero de tareas son: ${tareas.length}`,
        tareas
    })
}

ctrlTareas.postTareas = async (req,res)=>{
    const {persona_encargada,descripcion,estado}=req.body;
    //instanciado...
    const newTarea = new ColeccionTareas({
        persona_encargada,
        descripcion,
        estado
    })
    const tareabd = await newTarea.save();
    return res.json({
        message:'Tarea cargada a la base de datos',
        tareabd
    })
}

ctrlTareas.putTareas = async (req,res)=>{
    
    const id = req.params.id;
    const {persona_encargada,descripcion,estado}=req.body;

    const tareaUpdate = await ColeccionTareas.findByIdAndUpdate(id,{persona_encargada,descripcion,estado});
    console.log(tareaUpdate);

    return res.json(await ColeccionTareas.find({"_id":id}));
}
module.exports = ctrlTareas;

