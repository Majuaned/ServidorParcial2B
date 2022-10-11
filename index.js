const express = require('express');

const app = express();

const puerto = 4000;

app.listen(puerto, ()=>{
    console.log(`Servidor iniciado en el puerto ${puerto}`);
})