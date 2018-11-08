import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import firebaseApp from './firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
      loggedJury: {
        id: '',
        name: '',
        remaining_stars: 0,
      },
      input: '',
      value: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateInput = this.updateInput.bind(this);
    
    this.juriesRef = firebaseApp.database().ref().child('juries');
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      value: this.state.input,
      logged: true
    });
    this.selectJury(this.juriesRef);
  }

  updateInput(event) {
    this.setState({input: event.target.value});
  }

  getObjectOfArray(array, index) {
    return array[index] = array[index] || {};
  }

  selectJury(juriesRef) {
    juriesRef.on('value', (snap) => {
      const juryEmail = this.state.value;
      let juries = [];

      snap.forEach((child) => {
        if(child.val().email === juryEmail) {
          juries.push({
            name: child.val().name,
            remaining_stars: child.val().remaining_stars,
            id: child.val().id,
            _key: child.key,
          });
        }
      });

      this.setState({
        loggedJury: {
          name: this.getObjectOfArray(juries, 0).name,
          remaining_stars: this.getObjectOfArray(juries, 0).remaining_stars,
          id: this.getObjectOfArray(juries, 0).id,
        }
      })
    });
  }

  render() {
    if(this.state.logged) {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Bienvenido { this.state.loggedJury.name }
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

              <input type="submit" value="Submit" />
            </form>
          </header>
        </div>
      );
    }
  }
}

export default App;
