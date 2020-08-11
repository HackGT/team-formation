import React, { Component } from "react";
import { Button, Card, Container } from "semantic-ui-react";
import JoinTeam from "./ui_subcomponents/JoinTeam";
import "./css/TeamCard.css";

class TeamCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }
  closeModal = () => {
    console.log("close individual");
    this.setState({ showModal: false });
  };
  render() {
    return (
      <Card className="card1" basic={false} centered="true">
        <Card.Content className="content">
          <Card.Header>
            <Container className="name">{this.props.name}</Container>
          </Card.Header>
          <div className="ui divider" />
          <Card.Description className="card-description">
            <Container className="seeking">
              Seeking: {this.props.interests}
            </Container>
          </Card.Description>
          <Card.Description>
            <Container className="bio">Bio: {this.props.description}</Container>
          </Card.Description>
          <div className="ui divider" />
          <Card.Description color="blue" extra="extra">
            <div className="contact-button">
              <Button
                className="joinTeam"
                content="Join Team"
                onClick={() => this.setState({ showModal: true })}
              />
              <JoinTeam
                {...this.props}
                showModal={this.state.showModal}
                closeModal={this.closeModal}
              />
            </div>
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

export default TeamCard;
