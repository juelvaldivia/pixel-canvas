const express = require('express')
const http = require('http')
const socket = require('socket.io')

const port = 4000;
const app = express();

// crea un server
const server = http.createServer(app);

// asigna el server que socketIO estará escuchando todo el tiempo
const io = socket(server);

// arreglo de pixeles
let pixels = [];

// asigna las cabeceras en todas las rutas
app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

// se ejecuta cuando se realiza una conexion al servidor
io.on('connection', socket=>{
    console.log('alguien llegó loco!');

    // evento que comunica los pixeles registrados
    socket.on('add pixel', (pixel)=>{
        console.log('Pixel: ', pixel);
        pixels.push(pixel);
        io.sockets.emit('render pixel', pixel);
    })

    // evento de desconexion de un cliente
    socket.on('disconnect',()=>{
        console.log('se fué, se fue el orgullo de tu misterio');
    })
});

// regresa los pixeles que están registrados
app.get('/state', function (req, res) {
    res.send(pixels);
})

// el servidor es escuchado en el puerto definido anteriormente
server.listen(port,()=>console.log('server de socket corriendo en el puerto: ' + port))