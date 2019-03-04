import React, { Component } from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import { Icon } from 'semantic-ui-react';
import './css/Feed.css';

class Feed extends Component {
	render() {
		return (
			<div className="Feed-container">
				<Card>
				  <Card.Content className="content">
					<Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/steve.jpg' />
					<Card.Header>Steve Sanders</Card.Header>
					<Card.Meta>New User</Card.Meta>
					<Card.Description>
					  Steve wants to add you to the group <strong>best friends</strong>
					</Card.Description>
				  </Card.Content>
				  <Card.Content className="content" extra>
				  <Button basic color='green' className="button">
					Learn More
				  </Button>
				  </Card.Content>
				</Card>
				<Card>
				  <Card.Content>
					<Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/molly.png' />
					<Card.Header>Molly Thomas</Card.Header>
					<Card.Meta>New User</Card.Meta>
					<Card.Description>
					  Molly wants to add you to the group <strong>musicians</strong>
					</Card.Description>
				  </Card.Content>
				  <Card.Content extra>
				  <Button basic color='green' className="button">
					Learn More
				  </Button>
				  </Card.Content>
				</Card>
				<Card>
				  <Card.Content>
					<Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg' />
					<Card.Header>Jenny Lawrence</Card.Header>
					<Card.Meta>New User</Card.Meta>
					<Card.Description>Jenny requested permission to view your contact details</Card.Description>
				  </Card.Content>
				  <Card.Content extra>
				  <Button basic color='green' className="button">
					Learn More
				  </Button>
				  </Card.Content>
				</Card>
				<Card>
				  <Card.Content>
					<Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/steve.jpg' />
					<Card.Header>Steve Sanders</Card.Header>
					<Card.Meta>New User</Card.Meta>
					<Card.Description>
					  Steve wants to add you to the group <strong>best friends</strong>
					</Card.Description>
				  </Card.Content>
				  <Card.Content extra>
				  <Button basic color='green' className="button">
					Learn More
				  </Button>
				  </Card.Content>
				</Card>
				<Card>
				  <Card.Content>
					<Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/molly.png' />
					<Card.Header>Molly Thomas</Card.Header>
					<Card.Meta>New User</Card.Meta>
					<Card.Description>
					  Molly wants to add you to the group <strong>musicians</strong>
					</Card.Description>
				  </Card.Content>
				  <Card.Content extra>
				  <Button basic color='green' className="button">
					Learn More
				  </Button>
				  </Card.Content>
				</Card>
				<Card>
				  <Card.Content>
					<Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg' />
					<Card.Header>Jenny Lawrence</Card.Header>
					<Card.Meta>New User</Card.Meta>
					<Card.Description>Jenny requested permission to view your contact details</Card.Description>
				  </Card.Content>
				  <Card.Content extra>
				  <Button basic color='green' className="button">
					Learn More
				  </Button>
				  </Card.Content>
				</Card>

			</div>
		);
	};
}

export default Feed