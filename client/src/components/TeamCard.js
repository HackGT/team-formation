import React, { Component } from 'react';
import { Button, Card, Popup, Container, Label } from 'semantic-ui-react';
import './css/TeamCard.css';

class TeamCard extends Component {
    render() {
		let contact;
		contact = <Popup
		trigger={<Button basic color='blue' content='Join Team!' />}
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

					<Card className="card1" color='blue' centered='true'>
						<Card.Content className="content">
							<Card.Header>{this.props.name}</Card.Header>
							<div className="ui divider"></div>
							<Card.Description className="card-description">
								<Container style={{overflow: 'auto', maxHeight: 42 }}><strong> About Us: </strong>{this.props.about}</Container>
							</Card.Description>
						</Card.Content>
						<Card.Content extra>
							<div className='contact-button'>
								<p>{contact}</p>
							</div>
						</Card.Content>
					</Card>
		);
	};
};

export default TeamCard;

