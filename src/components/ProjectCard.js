import React, { Component } from 'react';
import '../App.css';

import { Grid, Row, Col, Button, } from 'react-bootstrap';
import Rating from 'react-rating';
import firebaseApp from '../firebase';


export default class ProjectCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
      rating: 0
    };
	}
	
	voteProject() {
		let current_stars = this.props.jury.remaining_stars - this.state.rating;
		let new_total_stars = this.props.project.total_stars + this.state.rating;
		
		if(current_stars >= 0) {
			firebaseApp.database()
								.ref(`juries/${this.props.jury.id}`)
								.update({remaining_stars: current_stars}
			);

			firebaseApp.database()
								.ref()
								.child('votes').push({
									jury: this.props.jury.id,
									project: this.props.project.id,
									stars_assigned: this.state.rating,
									timestamp: Date.now(),
			});
			
			firebaseApp.database()
									.ref(`/projects/${this.props.project.id}`)
									.update({total_stars: new_total_stars}
			);
			
			alert("Voto realizado con exito");
			this.setState({ rating: 0 });

		} else {
			alert("Estrellas insuficientes");
			this.setState({ rating: 0 });
		}
	}

	render() {
		return (
			<div class="projectCard">
				<Grid>
					<Row>
						<Col xs={8} md={6}>
							<Row className="cellContainer">
							<Button onClick={() => {this.props.showWinnerInvestors(this.props.project)}}>
								{this.props.project.name}
							</Button>
							</Row>
							<Row className="cellContainer">
								{this.props.project.author}
							</Row>
							<Row className="cellContainer">
								Total de estrellas: {this.props.project.total_stars}
							</Row>
						</Col>
						<Col xs={5} md={3}>
							<Row className="cellContainer">
								Total de inversiones recibidas
							</Row>
							<div className="totalInvestment">
								<Row className="cellContainer">
									$ {this.props.project.total_investment}
								</Row>
							</div>
						</Col>
						<Col xs={5} md={3}>
							<Row className="cellContainer">
								<Button bsStyle="success" onClick={() => this.voteProject()}>Votar</Button>
								<Button bsStyle="danger" onClick={() => {this.setState({ rating: 0 })}}>Limpiar</Button>
							</Row>
							<Row className="cellContainer">
								<Rating
									initialRating={this.state.rating}
									onClick={(value) => this.setState({ rating: value })}
								/>
							</Row>
							<Row className="cellContainer">
								<div>{this.state.rating}</div>
							</Row>
						</Col>
					</Row>
				</Grid>
			</div>
		)
	}
}