const express = require('express');
const app = express();
const cors = require('cors'); //estandariza la aplicación para q sea aceptada por todos los navegadores
const morgan = require('morgan'); //para ver las peticiones e ipes por consola
require('dotenv').config();
//CONEXION
const coneccionbd = require('./src/conexiones')
coneccionbd();
//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

const puerto = 4000;

app.use(require('./src/routes/tareas.routes'));
app.use(require('./src/routes/usuarios.routes'));
app.use(require('./src/routes/authen.routes'));


app.listen(puerto, ()=>{
    console.log(`Servidor iniciado en el puerto ${puerto}`);
})