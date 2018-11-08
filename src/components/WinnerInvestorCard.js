import React, { Component } from 'react';
import '../App.css';

import { Grid, Row, Col, } from 'react-bootstrap';

export default class WinnerInvestorContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	calculateInvestments(investments) {
		let total = 0;
		
		investments.forEach(
			(investment) => {
				if(investment.investor === this.props.investor.id) {
					if(investment.project === this.props.project.id) {
						total += investment.money_assigned;									
					} 
				}
			}
		)
		return total;
	}

	render() {
		const { investments } = this.props;
		let investments_in_project = this.calculateInvestments(investments);
		
		let timestamp_inMS = 0;
		let partial_investment = 0;
		switch(this.props.project.id) {
			case 'proj01': 
				timestamp_inMS = this.props.investor.investments_inProjects.proj01.last_timestamp;
				partial_investment = this.props.investor.investments_inProjects.proj01.partial_investment;
				break;
			case 'proj02': 
				timestamp_inMS = this.props.investor.investments_inProjects.proj02.last_timestamp;
				partial_investment = this.props.investor.investments_inProjects.proj02.partial_investment;
				break;
			case 'proj03': 
				timestamp_inMS = this.props.investor.investments_inProjects.proj03.last_timestamp;
				partial_investment = this.props.investor.investments_inProjects.proj03.partial_investment;
				break;
			case 'proj04': 
				timestamp_inMS = this.props.investor.investments_inProjects.proj04.last_timestamp;
				partial_investment = this.props.investor.investments_inProjects.proj04.partial_investment;
				break;
			case 'proj05': 
				timestamp_inMS = this.props.investor.investments_inProjects.proj05.last_timestamp;
				partial_investment = this.props.investor.investments_inProjects.proj05.partial_investment;
				break;
			case 'proj06': 
				timestamp_inMS = this.props.investor.investments_inProjects.proj06.last_timestamp;
				partial_investment = this.props.investor.investments_inProjects.proj06.partial_investment;
				break;
			case 'proj07': 
				timestamp_inMS = this.props.investor.investments_inProjects.proj07.last_timestamp;
				partial_investment = this.props.investor.investments_inProjects.proj07.partial_investment;
				break;
			case 'proj08': 
				timestamp_inMS = this.props.investor.investments_inProjects.proj08.last_timestamp;
				partial_investment = this.props.investor.investments_inProjects.proj08.partial_investment;
				break;
			case 'proj09': 
				timestamp_inMS = this.props.investor.investments_inProjects.proj09.last_timestamp;
				partial_investment = this.props.investor.investments_inProjects.proj09.partial_investment;
				break;
			case 'proj10': 
				timestamp_inMS = this.props.investor.investments_inProjects.proj10.last_timestamp;
				partial_investment = this.props.investor.investments_inProjects.proj10.partial_investment;
				break;
			default:
				break;
		}

		let timestamp_inDATE = new Date(timestamp_inMS);
		let hours = timestamp_inDATE.getHours();
		let minutes = "0" + timestamp_inDATE.getMinutes();
		let seconds = "0" + timestamp_inDATE.getSeconds();
		let miliseconds = timestamp_inDATE.getMilliseconds()
		let timestamp_inTIME = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2) + ':' + miliseconds;

		if(investments_in_project !== 0) {
			return(
				<div>
					<div class="projectCard">
						<Grid>
							<Row>
								<Col xs={2}>
									<Row className="cellContainer">
										{this.props.investor.name}
									</Row>
								</Col> 
								<Col xs={2}>
									<Row className="cellContainer">
										$ {partial_investment}
									</Row>
								</Col>
								<Col xs={2}>
									<Row className="cellContainer">
										{timestamp_inTIME}
									</Row>
								</Col>
							</Row>
						</Grid>
					</div>
				</div>
			);
		} else {
			return(
				<div />
			)
		}
	}
}