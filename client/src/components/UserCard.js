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
    let contact = this.props.contact;
    contact = <Popup
          trigger={<Button className="contact" content="Contact" />}
          content= {`Discord: ${this.props.contact}`}
          on="click"
          hideOnScroll
        />
    var colors = ["#ACBA4A", "#F8B52C"];
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
          <Card.Meta>
            Track: {(this.props.track) ? this.props.track : 'None'}
          </Card.Meta>
          <Card.Meta>
            Location: {this.props.location}
          </Card.Meta>
          <div
            className="ui divider"
            style={{
              marginBottom: 10,
            }}
          />
          <Container className="data">
            <Card.Description className="card-description">
              <div style={{color: '#10112E'}}>
                About Them: {this.props.experience}
              </div>
            </Card.Description>
            <div
              className="ui divider"
            />
            <Card.Description className="card-description">
              {viewskill}
            </Card.Description>
          </Container>
          <div className="buttons-anchor">
            <div className="ui divider" />
            <div className="contact-button">
                {contact}
                <Button
                  className="teamUp"
                  content={this.props.team ? "Send Invite" : "Team Up"}
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
          </div>
        </Card.Content>
      </Card>
    );
  }
}

export default UserCard;
