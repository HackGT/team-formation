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
    if (this.props.contact === null) {
      contact = (
        <Popup
          trigger={
            <Button
              style={{
                color: "white",
                background: "#A8C5D6",
                boxShadow: "rgba(0, 0, 0,0.2) 0px 4px 4px 0px",
                fontFamily: "Quicksand-Bold",
              }}
              content="Contact"
            />
          }
          content="no contact available"
          on="click"
          hideOnScroll
        />
      );
    } else if (this.props.contact.includes("@")) {
      contact = (
        <Popup
          trigger={
            <Button
              style={{
                color: "white",
                background: "#A8C5D6",
                boxShadow: "rgba(0, 0, 0,0.2) 0px 4px 4px 0px",
                fontFamily: "Quicksand-Bold",
              }}
              content="Contact"
            />
          }
          content=<a href={`mailto:${this.props.contact}`} target="_blank">
            {this.props.contact}{" "}
          </a>
          on="click"
          hideOnScroll
        />
      );
    } else if (this.props.contact.includes(".")) {
      contact = (
        <Popup
          trigger={
            <Button
              style={{
                color: "white",
                background: "#A8C5D6",
                boxShadow: "rgba(0, 0, 0,0.2) 0px 4px 4px 0px",
                fontFamily: "Quicksand-Bold",
              }}
              content="Contact"
            />
          }
          content=<a href={this.props.contact} target="_blank">
            {this.props.contact}
          </a>
          on="click"
          hideOnScroll
        />
      );
    } else {
      contact = (
        <Popup
          trigger={
            <Button
              style={{
                color: "white",
                background: "#A8C5D6",
                boxShadow: "rgba(0, 0, 0,0.2) 0px 4px 4px 0px",
                fontFamily: "Quicksand-Bold",
              }}
              content="Contact"
            />
          }
          content={this.props.contact}
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
        style={{
          color: "white",
          backgroundColor: colors[count++ % 2],
          boxShadow: "rgba(0, 0, 0,0.2) 0px 4px 4px 0px",
          fontFamily: "Quicksand-Bold",
          fontSize: 10,
          marginTop: 5,
        }}
      >
        {skill}
      </Label>
    ));
    return (
      <Card
        className="card1"
        style={{
          boxShadow: "-20px 20px 0px -8px rgba(0, 0, 0, 0.20)",
          borderRadius: 15,
        }}
      >
        <Card.Content className="content">
          <Card.Header
            style={{
              textAlign: "center",
              paddingTop: 10,
              color: "#8895C1",
              fontFamily: "Quicksand-Bold",
              fontSize: 20,
            }}
          >
            {this.props.name}
          </Card.Header>
          <Card.Meta
            style={{
              color: "#85808A",
              paddingTop: 20,
              paddingLeft: 15,
              fontFamily: "Quicksand-Bold",
            }}
          >
            {this.props.school}
          </Card.Meta>
          <Card.Meta
            style={{
              color: "#85808A",
              paddingLeft: 15,
              fontFamily: "Quicksand-Bold",
            }}
          >
            Graduation Year: {this.props.grad_year}
          </Card.Meta>
          <div
            className="ui divider"
            style={{
              border: "1px solid #C3BBCD",
              marginTop: 5,
              marginBottom: 10,
            }}
          />
          <Card.Description className="card-description">
            {viewskill}
          </Card.Description>
          <Card.Description className="card-description">
            <Container
              style={{
                overflow: "auto",
                maxHeight: 100,
                color: "#867A96",
                paddingLeft: 15,
                paddingTop: 10,
                paddingBottom: 5,
                fontFamily: "Quicksand-Bold",
              }}
            >
              About Them: {this.props.experience}
            </Container>
          </Card.Description>
          <div
            className="ui divider"
            style={{
              border: "1px solid #C3BBCD",
              marginTop: 5,
            }}
          />
          <Card.Description>
            <div className="contact-button">
              {contact}
              <Button
                style={{
                  color: "white",
                  background: "#CCBEDF",
                  boxShadow: "rgba(0, 0, 0,0.2) 0px 4px 4px 0px",
                  marginLeft: 5,
                  fontFamily: "Quicksand-Bold",
                }}
                content="Team Up"
                onClick={() => this.setState({ showModal: true })}
              />
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
