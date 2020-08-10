import React, {Component} from "react";
import {
    Button,
    Card,
    Popup,
    Container,
    Label,
    Icon
} from "semantic-ui-react";
import "./css/NotificationCard.css";
import IndividualRequest from "./ui_subcomponents/IndividualRequest";
import TeamRequest from "./ui_subcomponents/TeamRequest";

class NotificationCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showTeamModal: false,
            showIndividualModal: false
        };
    }
    closeTeamModal = () => {
        console.log("close team")
        this.setState({showTeamModal: false});
    };
    closeIndividualModal = () => {
        console.log("close individual");
        this.setState({showIndividualModal: false});
    };
    closeIndividualModal = () => {
      console.log("close individual");
      this.setState({ showIndividualModal: false });
    };

    render() {
        console.log("render", this.state)
        return (<div>
            <Card className="notification"
                onClick={(event, data) => {
                    console.log('hello')
                    console.log(event)
                    console.log(data)
                    this.props.type == 'User'
                        ? this.setState({showIndividualModal: true})
                        : this.setState({showTeamModal: true})
                }}>
                <Card.Content className="content" style={{
                  backgroundColor: this.props.color,
                  boxShadow: "rgba(0, 0, 0,0.2) 0px 4px 4px 0px",
                }}>
                    {this.props.message}
                    <div className='notification-buttonGroup'>
                        <Button inverted color="white" icon="check" />
                        <Button inverted color="white" icon="close" />
                    </div>
                </Card.Content>
            </Card>
            {
                this.props.type == 'User'
                    ? <IndividualRequest requestMessage={this.props.request} userProjectIdea={this.props.idea} {...this.props.meta} showModal={this.state.showIndividualModal} closeModal={this.closeIndividualModal} sender={this.props.sender}
                    notification_id={this.props.notification_id}
                    />
                    : <TeamRequest teamRequestMessage={this.props.request} teamProjectIdea={this.props.idea} {...this.props.meta} showModal={this.state.showTeamModal} closeModal={this.closeTeamModal}
                    sender={this.props.sender}
                    notification_id={this.props.notification_id}
                    />
            }
        </div>)
    }

}

export default NotificationCard;
