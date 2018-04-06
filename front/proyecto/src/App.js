import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// clase principal de la app
class App extends Component {

  componentDidMount(){
    // se le asigna el tamaño de todo el navegador al canvas
    this.refs.canvas.width=window.innerWidth;
    this.refs.canvas.height=window.innerHeight;

  }

  // pinta el html en el navegador
  render() {
    return (
      // elemento canvas
      <canvas ref="canvas" className="canvas"/>      
    );
  }
}

export default App;
