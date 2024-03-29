/* eslint-disable */
import React, { Component } from "react";
import { Button, Card, Popup, Container, Label } from "semantic-ui-react";
import JoinIndividual from "../ui_subcomponents/JoinIndividual";
import "../css/UserCard.css";

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

    
    // if(this.props.slackid) {
    //     const dm_url = `slack://user?team=T01AUT83XST&id=${this.props.slackid}`
    //     contact =
    //       <Button as="a" className="contact" content="Contact" href={dm_url}/>

    // }
    // else if(!this.props.contact) {
    //     contact = ""
    // }
    // else if (this.props.contact.includes("@")) {
    //   contact = (
    //     <Popup
    //       trigger={<Button className="contact" content="Contact" />}
    //       content= {<a href={`mailto:${this.props.contact}`} target="_blank">
    //         {this.props.contact}{" "}
    //       </a>}
    //       on="click"
    //       hideOnScroll
    //     />
    //   );
    // }
    var colors = ["#E1C531", "#4289CA"];
    var count = 0;
    var viewskill = this.props.skills.map((skill) => (
      <Label
        size="mini"
        className="userskill"
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
              {viewskill}
            </Card.Description>
            <Card.Description className="card-description">
              <div>
                About Them: {this.props.experience}
              </div>
            </Card.Description>
          </Container>
          {/* Separating to test absolute position */}
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
