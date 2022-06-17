/* eslint-disable */
import React, { Component } from "react";
import { Button, Card, Popup, Container, Label, TextArea, Placeholder } from "semantic-ui-react";
import JoinTeam from "./JoinTeam";
import "../css/TeamCard.css";
import { Team } from "../../types/index";

interface props {
  interests: [boolean];
  description: string;
  team: Team;
  name: string;
  id: any;
}

interface states {
  showModal: boolean;
}

class TeamCard extends Component<props, states> {
  constructor(props: props) {
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
    var count = 0;
    // var viewskill;
    let link = "/team/" + this.props.id;
    var colors = ["#E1C531", "#4289CA"];
    var viewskill = this.props.interests.map(skill => (
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
    var button = this.props.team ? (
      <Placeholder></Placeholder>
    ) : (
      <Button
        className="contact"
        content="Join Team"
        onClick={() => this.setState({ showModal: true })}
      />
    );
    var text = this.props.team ? "newTeam" : "teamUp";
    return (
      <Card className="card1" basic={false} color="blue" centered={true}>
        <Card.Content className="content">
          <Card.Header>
            <Container style={{ overflow: "auto", maxHeight: 60, minHeight: 60 }}>
              {this.props.name}
            </Container>
          </Card.Header>
          {/* <Card.Meta>ID: {this.props.id}</Card.Meta> */}
          <div className="ui divider"></div>
          <Card.Description className="card-description">
            <Container className="skills">{viewskill}</Container>
          </Card.Description>
          <Card.Description className="card-description">
            <Container className="about">Bio: {this.props.description}</Container>
          </Card.Description>
          <Card.Description>
            <div className="ui divider"></div>
            <div className="contact-button">
              {button}
              <JoinTeam
                {...this.props}
                showModal={this.state.showModal}
                closeModal={this.closeModal}
              />
              <Button
                className={text}
                content="View Team"
                onClick={() => {
                  window.location.href = link;
                }}
              />
            </div>
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

export default TeamCard;
