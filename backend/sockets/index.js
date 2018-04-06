const express = require('express')
const http = require('http')
const socket = require('socket.io')

const port = 4000;
const app = express();

// crea un server
const server = http.createServer(app);

// asigna el server que socketIO estará escuchando todo el tiempo
const io = socket(server);

// se ejecuta cuando se realiza una conexion al servidor
io.on('connection', socket=>{
    console.log('alguien llegó loco!');

});

// el servidor es escuchado en el puerto definido anteriormente
server.listen(port,()=>console.log('server corriendo en el puerto: ' + port))