import React, { Component } from 'react';
import { Button, Card, Popup, Container, Label, TextArea, Placeholder } from 'semantic-ui-react';
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
		// var viewskill;
		let link = "/team/" + this.props.id;
		var colors = ["#A0CCC9", "#EBABCA"];
		var count = 0;
		var viewskill = this.props.interests.map((skill) => (
		<Label
			size="mini"
			className="labelStyle"
			style={{
			backgroundColor: colors[count++ % 2],
			}}
		>
			{skill}
		</Label>
		));
		var button = this.props.team ? <Placeholder></Placeholder> : <Button className="contact" content='Join Team' onClick={() => this.setState({showModal: true})} />;
		var text = this.props.team ? "newTeam" : "teamUp";
		return (
			<Card className="card1" basic={false} color='blue' centered='true'>
				<Card.Content className="content">
					<Card.Header><Container style={{overflow: 'auto', maxHeight: 60, minHeight: 60 }}>{this.props.name}</Container></Card.Header>
					{/* <Card.Meta>ID: {this.props.id}</Card.Meta> */}
					<div className="ui divider"></div>
					<Card.Description className="card-description">
						{viewskill}
					</Card.Description>
					<Card.Description className="card-description">
						<Container className="about" >Bio: {this.props.description}</Container>
					</Card.Description>
					<Card.Description>
					<div className="ui divider"></div>
							{button}
							<JoinTeam {...this.props} showModal={this.state.showModal} closeModal={this.closeModal} />
							<Link to={link}>
								<Button
									className={text}
									content="View Team"
								/>
							</Link>
					</Card.Description>
				</Card.Content>
			</Card>
		);
	};
};

export default TeamCard;
