import React, { Component } from 'react';
import { Button, Card, Popup, Container, Label } from 'semantic-ui-react';
import './css/UserCard.css';

class TeamCard extends Component {
    render() {
		let contact;
		contact = <Popup
		trigger={<Button basic={true} color='blue' content='Join Team!' />}
		content="Team has been joined!"
		on='click'
		hideOnScroll
		/>
		var colors = [
			'violet',
			'yellow',
			'orange'
		]
		var count = 0;
		var skill;
		var viewskill;
        return (
			<Card className="card1" basic={false} color='blue' centered='true'>
				<Card.Content className="content">
					<Card.Header><Container style={{overflow: 'auto', maxHeight: 60, minHeight: 60 }}>{this.props.name}</Container></Card.Header>
					<div className="ui divider"></div>
					<Card.Description className="card-description">
						<Container style={{overflow: 'auto', maxHeight: 42 }}><strong>Seeking: </strong>{this.props.interests}</Container>
					</Card.Description>
					<Card.Description>
						<Container style={{overflow: 'auto', maxHeight: 42 }}><strong>Bio: </strong>{this.props.description}</Container>
					</Card.Description>
				</Card.Content>
				<Card.Content color='blue' extra>
					<div className='contact-button'>
						<p>{contact}</p>
					</div>
				</Card.Content>
			</Card>
		);
	};
};

export default TeamCard;
