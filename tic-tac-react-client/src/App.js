import React, { Component } from 'react';
import logo from './logo.svg';
import GameView from './views/GameView.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <p className="App-intro">
          <GameView></GameView>
        </p>
      </div>
    );
  }
}

export default App;
