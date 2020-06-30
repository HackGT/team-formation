import React, { Component } from 'react';
import { Button, Card, Popup, Container, Label, Icon } from 'semantic-ui-react';
import './css/NotificationCard.css';
import IndividualRequest from './ui_subcomponents/IndividualRequest'
import TeamRequest from './ui_subcomponents/TeamRequest'

class NotificationCard extends Component {
    constructor(props) {
      super(props);
      this.state = {
        showTeamModal: false,
        showIndividualModal: false,
      };
    }
    closeIndividualModal = () => {
      console.log("close individual")
      this.setState({ showIndividualModal: false });
    };
    closeTeamModal = () => {
      console.log("close team")
      this.setState({ showTeamModal: false });
    };

    render() {
        console.log("render", this.state)
        return (
                <div>
    				<Card className="notification" onClick={(event, data) => {
                            console.log('hello')
                            console.log(event)
                            console.log(data)
                            this.props.type == 'individual' ?
                            this.setState({showIndividualModal: true}) : this.setState({showTeamModal: true})
                        }}>
    					<Card.Content className="content">
                            {this.props.message}
                            <div className='notification-buttonGroup'>
                                <Button inverted color='green' icon='check'>
                                </Button>
                                <Button inverted color='red' icon='close'>
                                </Button>

                            </div>
    					</Card.Content>
    				</Card>
                    {
                        this.props.type == 'individual' ?
                            <IndividualRequest
                                requestMessage={this.props.request}
                                userProjectIdea={this.props.idea}
                                {...this.props.meta}
                                showModal={this.state.showIndividualModal}
                                closeModal={this.closeIndividualModal}
                            />:
                            <TeamRequest
                                teamRequestMessage={this.props.request}
                                teamProjectIdea={this.props.idea}
                                {...this.props.meta}
                                showModal={this.state.showTeamModal}
                                closeModal={this.closeTeamModal}
                            />
                    }
                </div>

		);
	};
};

export default NotificationCard;
