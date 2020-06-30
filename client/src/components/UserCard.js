import React, { Component } from 'react';
import { Button, Card, Popup, Container, Label } from 'semantic-ui-react';
import JoinIndividual from './ui_subcomponents/JoinIndividual'
import './css/UserCard.css';

class UserCard extends Component {
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
		let contact;
		let cur_contact = this.props.contact;
		if (this.props.contact === null) {
			contact = <Popup
			trigger={<Button basic color='purple' content='Reach Out' />}
			content="no contact available"
			on='click'
			hideOnScroll
			/>
		} else if ((this.props.contact).includes("@")) {
			contact = <Popup
			trigger={<Button basic color='purple' content='Reach Out' />}
			content=<a href={`mailto:${this.props.contact}`} target="_blank">{this.props.contact} </a>
			on='click'
			hideOnScroll
			/>
		} else if ((this.props.contact).includes(".")) {
			contact = <Popup
			trigger={<Button basic color='purple' content='Reach Out' />}
			content=<a href={this.props.contact} target="_blank">{this.props.contact}</a>
			on='click'
			hideOnScroll
			/>
		} else {
			contact = <Popup
			trigger={<Button basic color='purple' content='Reach Out' />}
			content={this.props.contact}
			on='click'
			hideOnScroll
			/>
		}
		var colors = [
			'violet',
			'yellow',
			'orange'
		]
		var count = 0;
		var skill;
        var viewskill = this.props.skills.map((skill) =>
            <Label size='mini' color={colors[(count++)%3]}>
                {skill}
             </Label>
        )
        return (
					<Card>
						<Card.Content className="content">
							<Card.Header>{this.props.name}</Card.Header>
							<Card.Meta>{this.props.school}</Card.Meta>
							<Card.Meta>Graduation Year: {this.props.grad_year}</Card.Meta>
							<div className="ui divider"></div>

							<Card.Description className="card-description">
							{viewskill}
							</Card.Description>
							<Card.Description className="card-description">
								<Container style={{overflow: 'auto', maxHeight: 100, minHeight: 100 }}><strong> About Them: </strong>{this.props.experience}</Container>
							</Card.Description>
						</Card.Content>
                        <Card.Content extra>
                            <div className='contact-button'>
                                {contact}
                                <Button basic color='purple' content='Team Up' onClick={() => this.setState({showModal: true})} />
                                <JoinIndividual {...this.props} showModal={this.state.showModal} closeModal={this.closeModal} />
                            </div>
                        </Card.Content>
					</Card>
		);
	};
};

export default UserCard;
