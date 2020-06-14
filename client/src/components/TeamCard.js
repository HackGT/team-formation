import React, { Component } from 'react';
import { Button, Card, Popup, Container, Label } from 'semantic-ui-react';
import './css/TeamCard.css';

class TeamCard extends Component {
    render() {
		let contact;
		contact = <Popup
			trigger={<Button basic color='purple' content='Join Team!' />}
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

					<Card className="card1">
						<Card.Content className="content">
							<Card.Header>{this.props.name}</Card.Header>
							<div className="ui divider"></div>

							<Card.Description className="card-description">
							{viewskill = this.props.skills.map((skill) => 
      							<Label size='mini' color={colors[(count++)%3]}>
        							{skill}
     							 </Label>
     						)}
							</Card.Description>
							<Card.Description className="card-description">
								<Container style={{overflow: 'auto', maxHeight: 42 }}><strong> About Them: </strong>{this.props.experience}</Container>
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

