import React, { Component } from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import { Icon } from 'semantic-ui-react';
import './css/Feed.css';

class UserCard extends Component {
	render() {
		return (
				<Card>
				  <Card.Content className="content">
					<Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/steve.jpg' />
					<Card.Header>{this.props.name}</Card.Header>
					<Card.Meta>New User</Card.Meta>
					<Card.Description>
					  {this.props.email}
					</Card.Description>
				  </Card.Content>
				  <Card.Content className="content" extra>
				  <Button basic color='green' className="button">
					Learn Morea
				  </Button>
				  </Card.Content>
				</Card>
		);
	};
}

export default UserCard
