//se requiere del mongoose el esquema-...
const { model, Schema }=require('mongoose');
require('./models.usuarios')

const tareasSchema = new Schema({
    persona_encargada:{
        type: Schema.ObjectId,
        ref:'ListaUsuarios',
        required: true
    },
    descripcion:{
        type: String,
        required: true
    },
    estado:{
        type: String,
        required: true
    },
    activa:{
        type: Boolean,
        default: true
    }
})

module.exports= model('ListaTareas', tareasSchema); //el nombre de la colección será ListaTareas