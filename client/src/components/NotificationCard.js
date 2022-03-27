import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import "./css/NotificationCard.css";
import IndividualRequest from "./ui_subcomponents/IndividualRequest";
import TeamRequest from "./ui_subcomponents/TeamRequest";


class NotificationCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTeamModal: false,
      showIndividualModal: false,
    };
  }
  closeTeamModal = () => {
    console.log("close team");
    this.setState({ showTeamModal: false });
  };
  closeIndividualModal = () => {
    console.log("close individual");
    this.setState({ showIndividualModal: false });
  };

  render() {
    console.log("render", this.state);
    let sender = this.props.sender.name
    let receiver = this.props.receiver.name
    if (sender) {
      sender = this.truncate(sender)
    }
    if (receiver) {
      receiver = this.truncate(receiver)
    }
    let notif_msg = this.props.sent_notification ? `You requested ${receiver} to team up` : `${sender} wants to team up with you`
    return (
      <div>
        {sender ? 
          <Card
            className="notification"
            onClick={(event, data) => {
              console.log("hello");
              console.log(event);
              console.log(data);
              this.props.type == "User"
                ? this.setState({ showIndividualModal: true })
                : this.setState({ showTeamModal: true });
            }}
            style={{
              backgroundColor: this.props.color,
              boxShadow: "rgba(0, 0, 0,0.2) 0px 4px 4px 0px",
              height: 45
            }}
          >
            <Card.Content
              className="message"
            >
              {notif_msg}
            </Card.Content>
          </Card>
        : <Card
            className="sent-notification"
            style={{
              backgroundColor: this.props.color,
              boxShadow: "rgba(0, 0, 0,0.2) 0px 4px 4px 0px",
              height: 45
            }}
          >
            <Card.Content
              className="message"
            >
              {notif_msg}
            </Card.Content>
          </Card>
        }
        {this.props.type == "User" ? (
          <IndividualRequest
            requestMessage={this.props.request}
            userProjectIdea={this.props.idea}
            {...this.props.meta}
            showModal={this.state.showIndividualModal}
            closeModal={this.closeIndividualModal}
            sender={this.props.sender}
            receiver={this.props.receiver}
            notification_id={this.props.notification_id}
          />
        ) : (
          <TeamRequest
            teamRequestMessage={this.props.request}
            teamProjectIdea={this.props.idea}
            {...this.props.meta}
            showModal={this.state.showTeamModal}
            closeModal={this.closeTeamModal}
            sender={this.props.sender}
            notification_id={this.props.notification_id}
          />
        )}
      </div>
    );
  }
  truncate(string) {
    if (string.length > 18) {
      if (string.charAt(15) == ' ') {
        string = string.substring(0,15) + '...';
      } else {
        string = string.substring(0,16) + '...';
      }
    }
    return string;
  }
}



export default NotificationCard;
