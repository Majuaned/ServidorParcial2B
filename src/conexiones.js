const mongoose = require('mongoose');

const CONEXBD = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Conectado a la base de datos')
    } catch (error) {
        console.log('No se pudo conectar a la base de datos ',error.message)
    }
}
module.exports = CONEXBD;