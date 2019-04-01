import React, { Component } from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import { Icon } from 'semantic-ui-react';
import './css/UserCard.css';

class UserCard extends Component {
	render() {
		return (
			<div className="UserCard-container">
				<div className="card-container">
					<Card className="card1">
					  <Card.Content className="content">
						<Card.Header>{this.props.name}</Card.Header>
						<Card.Meta>{this.props.school}</Card.Meta>
						<Card.Meta>graduation year: {this.props.grad_year}</Card.Meta>
						<div className="ui divider"></div>
						<Card.Description className="card-description">
						  <strong> skills: </strong> {this.props.skills}
						</Card.Description>
						<Card.Description className="card-description">
						  <strong> interests: </strong> mobile development, AR, VR
						</Card.Description>
						<Card.Description className="card-description">
						  <strong> experience: </strong> participated in 3 hackathons, won one
						</Card.Description>
					  </Card.Content>

				</Card>
            </div>
			</div>
		);
	};
}

export default UserCard
