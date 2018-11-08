import React, { Component } from 'react';
import '../App.css';

export default class HeaderContainer extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
		return(
      <header className="App-header">
        <p>TecnoEmprende 2018</p>
        {!this.props.loggedJury.is_admin ? (<p>Jurado: {this.props.loggedJury.name}</p>) : <div />}
        <p>Estrellas restantes: {this.props.loggedJury.remaining_stars}</p>
      </header>
		);
	}
}