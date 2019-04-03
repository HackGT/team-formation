import React, { Component } from 'react';
import { Button, Card, Image, Popup } from 'semantic-ui-react';
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
						<Card.Meta>Graduation Year: {this.props.grad_year}</Card.Meta>
						<div className="ui divider"></div>
						<Card.Description className="card-description">
						  <strong> skills: </strong>{this.props.skills.join(", ")}
						</Card.Description>
						<Card.Description className="card-description">
						  <strong> experience: </strong>{this.props.experience}
						</Card.Description>
						<div className="ui divider"></div>
						<div className='contact-button'>
						  <Popup
					        trigger={<Button basic color='teal' content='Reach Out' />}
					        content={this.props.contact}
					        on='click'
					        hideOnScroll
						  />
				        </div>
					  </Card.Content>

				</Card>
            </div>
			</div>
		);
	};
}

export default UserCard
