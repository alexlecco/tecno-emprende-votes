import React, { Component } from 'react';
import '../App.css';

import { Grid, Row, } from 'react-bootstrap';

import ProjectCard from './ProjectCard';
import firebaseApp from '../firebase';

export default class ProjectsContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			investments: [],
			projects: [],
			total_investments: [],
		}
		this.investmentsRef = firebaseApp.database().ref().child('investments');
		this.projectsRef = firebaseApp.database().ref().child('projects');
	}

	componentWillMount() {
		this.listenForInvestments(this.investmentsRef);
		this.listenForProjects(this.projectsRef);
	}

	listenForProjects(projectsRef) {
		projectsRef.on('value', snap => {
			let projects = [];
			snap.forEach((child) => {
				projects.push({
					author: child.val().author,
					description: child.val().description,
					id: child.val().id,
					name: child.val().name,
					total_investment: child.val().total_investment,
					total_stars: child.val().total_stars,
					_key: child.key,
				});
			});
			this.setState({
				projects: projects
			});
		});
	}

	listenForInvestments(investmentsRef) {
		investmentsRef.on('value', snap => {
			let investments = [];
			snap.forEach((child) => {
				investments.push({
					author: child.val().author,
					description: child.val().description,
					id: child.val().id,
					name: child.val().name,
					_key: child.key,
				});
			});
			this.setState({
				investments: investments
			});
		});
	}

	render() {
		return(
			<div>
				<div bsStyle="container">
					<Grid>
						<Row>
							{
								this.state.projects.map(
									(project) =>
										<ProjectCard
											project={project}
											jury={this.props.jury}
											showWinnerInvestors={this.props.showWinnerInvestors.bind(this)} />
								)
							}
						</Row>
					</Grid>
				</div>
			</div>
		);
	}
}