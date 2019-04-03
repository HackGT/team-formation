import React, { Component } from 'react';
import { Button, Card, Image, Popup, Icon } from 'semantic-ui-react';
import './css/UserCard.css';

class UserCard extends Component {
    render() {
		console.log(this.props.contact)
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
								<strong> Skills: </strong>{this.props.skills.join(", ")}
							</Card.Description>
							<Card.Description className="card-description">
								<strong> About Them: </strong>{this.props.experience}
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
