//se requiere del mongoose el esquema-...
const { model, Schema }=require('mongoose');

const usuariosSchema = new Schema({
    nombreUsuario:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    activo:{
        type: Boolean,
        default: true
    }
})

module.exports= model('ListaUsuarios', usuariosSchema); //el nombre de la colección será ListaUsuarios.