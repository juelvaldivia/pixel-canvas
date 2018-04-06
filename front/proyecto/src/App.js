import React, { Component } from 'react';
import './App.css';
import socketIOClient from 'socket.io-client';
import axios from 'axios';

// clase principal de la app
class App extends Component {

  // variables de estado de la app
  state = {
    context: null,
    pixelSize: 5,
    color: '',
    inputValue: ''
  }

  // arreglo de pixeles
  pixels = [];

  // metodo de la libreria de react Component 
  // se invoca inmediatamente despues de crear un componente
  componentDidMount(){

    // obtiene los pixeles registrados en el server Socket
    axios.get(process.env.REACT_APP_SOCKET_BACKEND+'/state')
    .then((res) => {
      // asigna los pixeles recibidos a nuestro arreglo de pixeles
      this.pixels = res.data,
      // renderiza los pixeles
      this.renderPixels()
    })
    .catch((err) => {
      console.log('Error cae en catch', err);
    })

    // se crea la conexion al server Socket
    this.socket = socketIOClient(process.env.REACT_APP_SOCKET_BACKEND);

    // pinta el pixel emitido por el socket
    this.socket.on('render pixel', (pixels) => {
      // suma el pixel recibido a nuestro arreglo de pixeles
      this.pixels.push(pixels);
      // renderiza los pixeles
      this.renderPixels();
    })

    // obtiene contexto del canvas en 2d
    let contextCanvas = this.refs.canvas.getContext('2d');
    
    // se le asigna el tamaño de todo el navegador al canvas
    this.refs.canvas.width=window.innerWidth - 20;
    this.refs.canvas.height=window.innerHeight - 20;

    // asigna el contexto del canvas a la variable de estado 'context' 
    this.setState({context: contextCanvas});

  }

  // pinta los pixeles en el canvas
  renderPixels = () => {
    
    // verifica que exista un contexto del canvas
    if(this.state.context != null){

      let contextCanv = this.state.context;

      // recorre el arreglo de pixeles y los pinta
      this.pixels.map(pixel => {
        // dibuja un rectangulo en las coordenadas de cada pixel
        contextCanv.fillStyle = pixel.color;
        contextCanv.fillRect(pixel.x, pixel.y, this.state.pixelSize, this.state.pixelSize);
      })
    }
  }

  // envía la posicion del click 
  sendPosition = (event) =>{

    // verifica que exista un color
    if(this.state.color!==''){
      let x = event.clientX;
      let y = event.clientY;

      // notifica al server la posicion del click
      this.socket.emit('add pixel', {
        x: x,
        y: y,
        color: this.state.color
      })
    }else alert('no tienes usuario compa!');    

  }

  // registra el usuario para obetener el color para pintar
  registerUser = () => {
    
    // verifica que el input text no esté vacío
    if (this.state.inputValue.length > 0) {

      // envia el valor del input al server de usuarios
      axios({
        method: 'post',
        url: process.env.REACT_APP_USER_BACKEND + '/user',
        data: { user: this.state.inputValue },
        headers: { 'Content-Type': 'application/json' }
      }).then((resp) => {
        // trata la respuesta asignando los valores a la app cliente
        this.setState({ color: resp.data.color, inputValue: '' });
      }).catch((err) => {
        // se muestra en una alerta el error
        alert(err);
      })

    }
  }

  // pinta el html en el navegador
  render() {
    this.renderPixels();

    return (     
      <div>
        <input placeholder='escribe tu usuario' value={this.state.inputValue} onChange={evt => this.setState({ inputValue: evt.target.value })} />
        <button onClick={() => { this.registerUser() }}>A dibujar!</button>
        <canvas ref="canvas" className="canvas" onClick={(evt) => this.sendPosition(evt)} />
      </div>
    );
  }
}

export default App;
