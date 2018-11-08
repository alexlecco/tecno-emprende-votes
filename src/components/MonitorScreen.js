import React, { Component } from 'react';
import '../App.css';

import { Grid, Row, Col, } from 'react-bootstrap';

export default class MonitorScreen extends Component {
  render() {
		return(
      <div className="container">
        <Grid className="grid">
          <Row className="row">
            <Col xs={9} md={6} className="col" >hola</Col>
            <Col xs={9} md={6} className="col" >hola</Col>
          </Row>
        </Grid>
      </div>
		);
	}
}