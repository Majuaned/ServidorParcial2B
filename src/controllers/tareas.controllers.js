//Se importa el midleware json
//const {json}= require('express');

//se requiere el modelo de tareas de la carpeta de modelos, el cual ya debe estar hecho....y se la guarda en una variable 

const ColeccionTareas = require('../models/models.tareas');
const ModeloUsuario = require('../models/models.usuarios');
ctrlTareas = {};


ctrlTareas.getTareas = async (req,res)=>{
    try {
        const tareas = await ColeccionTareas.find({activa: true})
        return res.json({
            message:`El numero de tareas son: ${tareas.length}`,
            tareas
        })
    } catch (error) {
        return res.json("No se encontraron las tareas")
    }
};

ctrlTareas.getTareas_User = async (req,res) => {
    try {
        const idUsua = req.user._id;
        const tareasUsu =  await ColeccionTareas.find({$and:[{idUsua},{activa: true}]})
        if(!tareasUsu.length){
            return res.json("No se encontraron tareas")
        }
        return res.json({tareasUsu})
        
    } catch (error) {
        return res.json("Error al obtener las tareas")
    }
};

ctrlTareas.postTareas = async (req,res)=>{
    try {
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
    } catch (error) {
        return res.json('Error para crear la tarea')
    }
};

ctrlTareas.putTareas = async (req,res)=>{
    try {
        const idTarea = req.params.idTarea;
        const idUsuar = req.user._id;

        const {persona_encargada,descripcion,estado}=req.body;
        
        if(!idTarea){
            return res.json("Falta información necesaria")
        }

        const idTareaString = idTarea.toString();
        const idUsuaString = idUsuar.toString();

        if((idTareaString===idUsuaString)||req.user.isAdmin === true){
            const tareaUpdate = await ColeccionTareas.findByIdAndUpdate(idTarea,{persona_encargada,descripcion,estado});
            console.log(tareaUpdate);
        
            return res.json(await ColeccionTareas.find({"_id":idTarea}));
        }

    } catch (error) {
        res.json('No se pudo actualizar la tarea')
    }
};

module.exports = ctrlTareas;

