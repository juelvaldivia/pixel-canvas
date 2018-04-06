const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// se usan los middleware de body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const port = 9000;

// arreglo de usuarios
let users = [];

// asigna las cabeceras en todas las rutas
app.all('/*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type"),
    next();
})

// registra un usuario
app.post('/user', (req, res) => {

    // verifica que no exista el usuario
    if(users.indexOf(req.body.user) == -1){
        // agrega el usuario al arreglo
        users.push(req.body.user);
        // regresa un color random para el usuario
        res.send({color: '#'+ (Math.random()*0xFFFFFF<<0).toString(16)});
    }
    else res.status(500).send({error: "Usuario registrado"})
})

// el servidor es escuchado en el puerto definido anteriormente
app.listen(port, () => console.log('server de usuario corriendo en el puerto: ' + port));
