import React, { Component } from 'react';
import { Button, Card, Popup } from 'semantic-ui-react';
import './css/UserCard.css';

class UserCard extends Component {
    render() {
		let contact;
		let cur_contact = this.props.contact;
		if (this.props.contact === null) {
			contact = <Popup
			trigger={<Button basic color='teal' content='Reach Out' />}
			content="no contact available"
			on='click'
			hideOnScroll
			/>
		} else if ((this.props.contact).includes("@")) {
			contact = <Popup
			trigger={<Button basic color='teal' content='Reach Out' />}
			content=<a href={`mailto:${this.props.contact}`} target="_blank">{this.props.contact} </a>
			on='click'
			hideOnScroll
			/>
		} else if ((this.props.contact).includes(".")) {
			contact = <Popup
			trigger={<Button basic color='teal' content='Reach Out' />}
			content=<a href={this.props.contact} target="_blank">{this.props.contact}</a>
			on='click'
			hideOnScroll
			/>
		} else {
			contact = <Popup
			trigger={<Button basic color='teal' content='Reach Out' />}
			content={this.props.contact}
			on='click'
			hideOnScroll
			/>
		}
        return (

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

export default UserCard;
