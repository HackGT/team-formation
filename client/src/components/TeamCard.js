import React, { Component } from 'react';
import { Button, Card, Popup, Container, Label } from 'semantic-ui-react';
import JoinTeam from './ui_subcomponents/JoinTeam';
import './css/TeamCard.css';
import { Link, useParams } from "react-router-dom";

class TeamCard extends Component {
	constructor(props) {
        super(props)
        this.state = {
            showModal: false
        }
    }
    closeModal = () => {
      console.log("close individual")
      this.setState({ showModal: false });
    };
    render() {
		// let contact;
		// contact = <Popup
		// trigger={<Button basic={true} color='blue' content='Join Team!' />}
		// content="Team has been joined!"
		// on='click'
		// hideOnScroll
		// />
		var colors = [
			'violet',
			'yellow',
			'orange'
		]
		var count = 0;
		var skill;
		var viewskill;
		let link = "/team/" + this.props.id;
        return (
			<Card className="card1" basic={false} color='blue' centered='true'>
				<Card.Content className="content">
					<Card.Header><Container style={{overflow: 'auto', maxHeight: 60, minHeight: 60 }}>{this.props.name}</Container></Card.Header>
					{/* <Card.Meta>ID: {this.props.id}</Card.Meta> */}
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
							<Button basic color='blue' content='Join Team' onClick={() => this.setState({showModal: true})} />
                            <JoinTeam {...this.props} showModal={this.state.showModal} closeModal={this.closeModal} />
							<Link to={link}>
								<Button
									basic
									color="blue"
									content="View Team"
								/>
							</Link>
					</div>
				</Card.Content>
			</Card>
		);
	};
};

export default TeamCard;
