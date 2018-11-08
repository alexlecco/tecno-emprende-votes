import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
      loggedJury: "",
      input: '',
      value: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateInput = this.updateInput.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      value: this.state.input,
      logged: true
    });
  }

  updateInput(event) {
    this.setState({input: event.target.value});
  }

  render() {

    if(this.state.logged) {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Bienvenido { this.state.value }
            </p>    
          </header>
        </div>
      );
    } else {
      return (
        <div className="App">
          <header className="App-header">
            <p>
              Ingresar
            </p>
            <form onSubmit={this.handleSubmit}>
              <input type="text" placeholder="email" value={this.state.input} onChange={this.updateInput} />
              <input type="text" placeholder="contraseña" />

              <input type="submit" value="Submit" />
            </form>
          </header>
        </div>
      );
    }
  }
}

export default App;
