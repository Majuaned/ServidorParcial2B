//se requiere del mongoose el esquema-...
const { model, Schema }=require('mongoose');

const tareasSchema = new Schema({
    encargado:{
        type: String,
        required: true
    },
    descripcion:{
        type: String,
        required: true
    },
    estado:{
        type: String,
        required: true
    }
})

module.exports= model('ListaTareas', tareasSchema);