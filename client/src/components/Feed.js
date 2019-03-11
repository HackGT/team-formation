import React, { Component } from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import { Icon } from 'semantic-ui-react';
import { Divider } from 'semantic-ui-react';
import './css/Feed.css';

class Feed extends Component {
	render() {
		return (
			<div className="Feed-container">
				<div className="card-container"><Card className="card1">
				  <Card.Content className="content">
					<Card.Header>Rahul Rajan</Card.Header>
					<Card.Meta>Georgia Tech</Card.Meta>
					<Card.Meta>1st year</Card.Meta>
					<div class="ui divider"></div>
					<Card.Description className="card-description">
					  <strong> skills: </strong> databases, graphql, relay
					</Card.Description>
					<Card.Description className="card-description">
					  <strong> interests: </strong> mobile development, AR, VR
					</Card.Description>
					<Card.Description className="card-description">
					  <strong> experience: </strong> participated in 3 hackathons, won one
					</Card.Description>
				  </Card.Content>
				  <Card.Content extra>
					 <div className='ui two buttons'>
						<Button basic color='grey' href="https://www.linkedin.com/in/rahulrajanus/" target="_blank">
						  website
						</Button>
						<Button basic color='teal'>
						  reach out
						</Button>
					  </div>
				  </Card.Content>
				</Card></div>

				<div className="card-container"><Card className="card1">
				  <Card.Content className="content">
					<Card.Header> Abhinav Kumar </Card.Header>
					<Card.Meta>Georgia Tech</Card.Meta>
					<Card.Meta>1st year</Card.Meta>
					<div class="ui divider"></div>
					<Card.Description className="card-description">
					  <strong> skills: </strong> databases, graphql, relay
					</Card.Description>
					<Card.Description className="card-description">
					  <strong> interests: </strong> mobile development, AR, VR
					</Card.Description>
					<Card.Description className="card-description">
					  <strong> experience: </strong> participated in 3 hackathons, won one
					</Card.Description>
				  </Card.Content>
				  <Card.Content extra>
					  <div className='ui two buttons'>
						<Button basic color='grey' href="https://www.linkedin.com/in/rahulrajanus/" target="_blank">
						  website
						</Button>
						<Button basic color='teal'>
						  reach out
						</Button>
					  </div>
				  </Card.Content>
				</Card></div>

				<div className="card-container"><Card className="card1">
				  <Card.Content className="content">
					<Card.Header> Meha Agrawal </Card.Header>
					<Card.Meta>Georgia Tech</Card.Meta>
					<Card.Meta>1st year</Card.Meta>
					<div class="ui divider"></div>
					<Card.Description className="card-description">
					  <strong> skills: </strong> databases, graphql, relay
					</Card.Description>
					<Card.Description className="card-description">
					  <strong> interests: </strong> mobile development, AR, VR
					</Card.Description>
					<Card.Description className="card-description">
					  <strong> experience: </strong> participated in 3 hackathons, won one
					</Card.Description>
				  </Card.Content>
				  <Card.Content extra>
					  <div className='ui two buttons'>
						<Button basic color='grey' href="https://www.linkedin.com/in/rahulrajanus/" target="_blank">
						  website
						</Button>
						<Button basic color='teal'>
						  reach out
						</Button>
					  </div>
				  </Card.Content>
				</Card></div>

				<div className="card-container"><Card className="card1">
				  <Card.Content className="content">
					<Card.Header>Rahul Rajan</Card.Header>
					<Card.Meta>Georgia Tech</Card.Meta>
					<Card.Meta>1st year</Card.Meta>
					<div class="ui divider"></div>
					<Card.Description className="card-description">
					  <strong> skills: </strong> databases, graphql, relay
					</Card.Description>
					<Card.Description className="card-description">
					  <strong> interests: </strong> mobile development, AR, VR
					</Card.Description>
					<Card.Description className="card-description">
					  <strong> experience: </strong> participated in 3 hackathons, won one
					</Card.Description>
				  </Card.Content>
				  <Card.Content extra>
					  <div className='ui two buttons'>
						<Button basic color='grey' href="https://www.linkedin.com/in/rahulrajanus/" target="_blank">
						  website
						</Button>
						<Button basic color='teal'>
						  reach out
						</Button>
					  </div>
				  </Card.Content>
				</Card></div>

			</div>
		);
	};
}

export default Feed
