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
        const tareasUsu =  await ColeccionTareas.find({$and:[{idUser:idUsua},{activa: true}]})
        .populate('idUser',['nombreUsuario'])
        if(!tareasUsu.length){
            return res.json("No se encontraron tareas")
        }
        return res.json({tareasUsu})
        
    } catch (error) {
        return res.json("Error al obtener las tareas")
    }
};

ctrlTareas.postTareas = async (req,res)=>{
    const idUser = req.user._id

    try {
        const {encargado,descripcion,estado}=req.body;
        //instanciado...
        const newTarea = new ColeccionTareas({
            encargado,
            descripcion,
            estado,
            idUser
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

        const {encargado,descripcion,estado}=req.body;
        
        if(!idTarea){
            return res.json("Falta información necesaria")
        }
        const tareaUpdate = await ColeccionTareas.findById(idTarea);

        const idTareaString = tareaUpdate.idUser.toString();
        const idUsuaString = idUsuar.toString();

        if(!(idTareaString==idUsuaString||req.user.isAdmin === true)){
            return res.status(401).json({
                message:"Ustede no está autorizado para hacer esta petición."
            })
        }
        await tareaUpdate.updateOne({encargado,descripcion,estado})
        return res.json({message:"Tarea actualizada con éxito."});

    } catch (error) {
        res.json('No se pudo actualizar la tarea')
    }
};

ctrlTareas.deleteTarea = async (req, res) => {
    try {
        const idTarea = req.params.idTarea;
        //const idUsuar = req.user._id;

        const tareaDel = await ColeccionTareas.findOne({$and:[{_id:idTarea},{activa:true}]})
        if(!tareaDel || !tareaDel.activa){
            return res.json('Tarea inexistente')
        }

        await tareaDel.updateOne({activa:false});
        return res.json('Tarea eliminada exitosamente')

    } catch (error) {
        return res.json('No se pudo eliminar la tarea')
    }
}

module.exports = ctrlTareas;

