import React, { Component } from "react";
import { Button, Card, Popup, Container, Label, Icon } from "semantic-ui-react";
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

  closeIndividualModal = () => {
    this.setState({ showIndividualModal: false });
  };
  closeTeamModal = () => {
    this.setState({ showTeamModal: false });
  };

  render() {
    return (
      <div>
        <Card
          className="notification"
          onClick={(event, data) => {
            this.props.type === "individual"
              ? this.setState({ showIndividualModal: true })
              : this.setState({ showTeamModal: true });
          }}
        >
          <Card.Content
            className="content"
            style={{
              backgroundColor: this.props.color,
              boxShadow: "rgba(0, 0, 0,0.2) 0px 4px 4px 0px",
            }}
          >
            {this.props.message}
            <div className="notification-buttonGroup">
              <Button inverted color="white" icon="check" />
              <Button inverted color="white" icon="close" />
            </div>
          </Card.Content>
        </Card>
        {this.props.type == "individual" ? (
          <IndividualRequest
            requestMessage={this.props.request}
            userProjectIdea={this.props.idea}
            {...this.props.meta}
            showModal={this.state.showIndividualModal}
            closeModal={this.closeIndividualModal}
          />
        ) : (
          <TeamRequest
            teamRequestMessage={this.props.request}
            teamProjectIdea={this.props.idea}
            {...this.props.meta}
            showModal={this.state.showTeamModal}
            closeModal={this.closeTeamModal}
          />
        )}
      </div>
    );
  }
}

export default NotificationCard;
