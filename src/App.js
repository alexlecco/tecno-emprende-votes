import React, { Component } from 'react';
import './App.css';

import ProjectsContainer from './components/ProjectsContainer';
import StatisticsContainer from './components/StatisticsContainer';
import HeaderContainer from './components/HeaderContainer';
import WinnerInvestorsContainer from './components/WinnerInvestorsContainer'
import MonitorScreen from './components/MonitorScreen'

import { Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

import firebaseApp from './firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedJury: {
        email: '',
        id: '',
        name: '',
        password : '',
        remaining_stars: 0,
        is_admin : false,
      },
      project: {
        name: '',
        author: '',
        description: '',
        total_investment: 0,
        total_stars: 0,
        id: '',
      },
      showWinnerInvestors: false,
      investments: [],
      loggedJuryId: '',
      logged: false,
      input: '',
      value: '',
      showMonitorScreen: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateInput = this.updateInput.bind(this);
    
    this.juriesRef = firebaseApp.database().ref().child('juries');
    this.investmentsRef = firebaseApp.database().ref().child('investments');
  }

  componentWillMount() {
    this.listenForInvestments(this.investmentsRef);
  }

  listenForInvestments(investmentsRef) {
    investmentsRef.on('value', (snap) => {
      let investments = [];
      snap.forEach((child) => {
        investments.push({
          investor: child.val().investor,
          money_assigned: child.val().money_assigned,
          project: child.val().project,
          timestamp: child.val().timestamp,
          _key: child.key,
        });
      });

      this.setState({
        investments: investments
      })
    });
  }

  showWinnerInvestors(project) {
    if(!this.state.showWinnerInvestors) {
      this.setState({showWinnerInvestors: !this.state.showWinnerInvestors,
                     project: {
                       name: project.name,
                       author: project.author,
                       description: project.description,
                       total_investment: project.total_investment,
                       total_stars: project.total_stars,
                       id: project.id,
                     }
      });
    }
    else {
      this.setState({
          showWinnerInvestors: !this.state.showWinnerInvestors,
          project: {
            name: '',
            author: '',
            description: '',
            total_investment: '',
            total_stars: '',
            id: '',
          }
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      value: this.state.input,
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
      const juryEmail = 'alex@tecno'/*this.state.value*/;
      let juries = [];

      snap.forEach((child) => {
        if(child.val().email === juryEmail) {
          juries.push({
            email: child.val().email,
            id: child.val().id,
            name: child.val().name,
            password : child.val().password,
            remaining_stars: child.val().remaining_stars,
            is_admin : child.val().is_admin,
            _key: child.key,
          });
          this.setState({
            logged: true
          });
        }
      });

      this.setState({
        loggedJury: {
          email: this.getObjectOfArray(juries, 0).email,
          id: this.getObjectOfArray(juries, 0).id,
          name: this.getObjectOfArray(juries, 0).name,
          password : this.getObjectOfArray(juries, 0).password,
          remaining_stars: this.getObjectOfArray(juries, 0).remaining_stars,
          is_admin : this.getObjectOfArray(juries, 0).is_admin,
        }
      })
    });
  }

  render() {
    if(!this.state.logged) { // <<<<<<<<<<<<<<<<<<<<<<< quitar el "!"
      if(this.state.showMonitorScreen) {
        return <MonitorScreen />
      } else {
        if(this.state.showWinnerInvestors) {
          return (
            <div>
              <HeaderContainer loggedJury={this.state.loggedJury}  />
              <StatisticsContainer investments={this.state.investments} />
              <WinnerInvestorsContainer
                investments={this.state.investments}
                showWinnerInvestors={this.showWinnerInvestors.bind(this)}
                project={this.state.project} />
            </div>
          );
        } else {
          return (
            <div>
              <HeaderContainer loggedJury={this.state.loggedJury}  />
              <StatisticsContainer investments={this.state.investments} />
              <ProjectsContainer
                jury={this.state.loggedJury}
                showWinnerInvestors={this.showWinnerInvestors.bind(this)} />
            </div>
          );
        }
      }
    } else {
      return (
        <div className="App">
          <header className="App-header">
            <br/>
            <p>
              Bienvenido al TecnoEmprende 2018
            </p>
            <br/>
            <Form inline onSubmit={this.handleSubmit}>
              <FormGroup controlId="formInlineEmail">
                <ControlLabel>Usuario</ControlLabel>{' '}
                <FormControl type="email" value={this.state.input} onChange={this.updateInput} />
              </FormGroup>{' '}
              <Button type="submit">Ingresar</Button>
            </Form>
            <br/>
            <br/>
          </header>
        </div>
      );
    }
  }
}

export default App;
