import React, { Component } from 'react';
import '../App.css';

export default class HeaderContainer extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
		return(
      <header className="App-header">
        <p>TecnoEmprende 2018 - Jurado: {this.props.loggedJury.name}</p>
        <p>Estrellas restantes: {this.props.loggedJury.remaining_stars}</p>
      </header>
		);
	}
}