import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import socketIOClient from 'socket.io-client';

// clase principal de la app
class App extends Component {

  state = {
    context: ''
  }

  componentDidMount(){
    // obtiene contexto del canvas en 2d
    let contextCanvas = this.refs.canvas.getContext('2d');
    
    // se le asigna el tamaño de todo el navegador al canvas
    this.refs.canvas.width=window.innerWidth;
    this.refs.canvas.height=window.innerHeight;

    // asigna el contexto a la variable state
    this.setState({context: contextCanvas});

    this.socket = socketIOClient('localhost:4000');
  }

  // funcion para dibujar 
  miguelMouse = (event) =>{
    // obtiene la posicion en X y Y del click en el canvas
    let x = event.clientX;
    let y = event.clientY;
    let context = this.state.context;

    // declaramos alto y ancho del rectangulo a dibujar 
    let rectWidth = 5;
    let rectHeight = 5;

    // dibuja un rectangulo en las coordenadas
    context.fillRect(x, y, rectWidth, rectHeight)
    context.fillStyle = '#fff'
  }

  // pinta el html en el navegador
  render() {
    return (
      // elemento canvas
      <canvas ref="canvas" className="canvas" onClick={(evt) => this.miguelMouse(evt)}/>      
    );
  }
}

export default App;
