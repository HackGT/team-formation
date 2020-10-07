import React, { Component } from "react";
import { Button, Card, Popup, Container, Label } from "semantic-ui-react";
import JoinIndividual from "./ui_subcomponents/JoinIndividual";
import "./css/UserCard.css";

class UserCard extends Component {
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
    let contact;
    let cur_contact = this.props.contact;
    if(this.props.slackid) {
        const dm_url = `slack://user?team=T0FFP3FNY&id=${this.props.slackid}`
        contact =
          <Button as="a" className="contact" content="Contact" href={dm_url}/>

    }
    else if(!this.props.contact) {
        contact = ""
    }
    else if (this.props.contact.includes("@")) {
      contact = (
        <Popup
          trigger={<Button className="contact" content="Contact" />}
          content=<a href={`mailto:${this.props.contact}`} target="_blank">
            {this.props.contact}{" "}
          </a>
          on="click"
          hideOnScroll
        />
      );
    }
    var colors = ["#A0CCC9", "#EBABCA"];
    var count = 0;
    var viewskill = this.props.skills.map((skill) => (
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
    var text;
    return (
      <Card className="card1">
        <Card.Content className="content">
          <Card.Header>{this.props.name}</Card.Header>
          <Card.Meta
            style={{
              paddingTop: 20,
            }}
          >
            {this.props.school}
          </Card.Meta>
          <Card.Meta className="gradYear">
            Graduation Year: {this.props.grad_year}
          </Card.Meta>
          <div
            className="ui divider"
            style={{
              marginBottom: 10,
            }}
          />
          <Card.Description className="card-description">
            <Container className="skills">{viewskill}</Container>
          </Card.Description>
          <Card.Description className="card-description">
            <Container className="about">
              About Them: {this.props.experience}
            </Container>
          </Card.Description>
          <div className="ui divider" />
          <Card.Description>
            <div className="contact-button">
              {contact}
              <Button
                className="teamUp"
                content={this.props.team ? "Invite to Join" : "Team Up"}
                onClick={() => {
                  if(this.props.teamid) {
                    text="The user is already on a team";
                  } else {
                    this.setState({ showModal: true })
                  }

                }
              }/>
              {text}
              <JoinIndividual
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

export default UserCard;
