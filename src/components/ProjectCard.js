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
						<Col xs={6} md={4}>
							<Row className="cellContainer">
							<Button onClick={() => {this.props.showWinnerInvestors(this.props.project)}}>
								{this.props.project.name}
							</Button>
							</Row>
							<Row className="cellContainer">
								{this.props.project.author}
							</Row>
							<Row className="cellContainer">
								<p className="cellContainerText">
									Total de estrellas: {this.props.project.total_stars}
								</p>
							</Row>
						</Col>
						<Col xs={6} md={4}>
							<Row className="cellContainer">
								Total de inversiones recibidas
							</Row>
							<div className="totalInvestment">
								<Row className="cellContainer">
									<p className="cellContainerText">
										$ {this.props.project.total_investment}
									</p>
								</Row>
							</div>
						</Col>
						<Col xs={6} md={4}>
							<Row className="cellContainer">
								<Button bsStyle="success" onClick={() => this.voteProject()}>Votar</Button>
								<Button bsStyle="danger" onClick={() => {this.setState({ rating: 0 })}}>Limpiar</Button>
							</Row>
							<Row className="cellContainer">
								<Rating
									initialRating={this.state.rating}
									onClick={(value) => this.setState({ rating: value })}
									start={0}
									stop={10}
									emptySymbol={<img src={require('../images/star-empty.png')} className="star-container" alt='empty star' />}
									fullSymbol={<img src={require('../images/star-full.png')} className="star-container" alt='filled star' />} 
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