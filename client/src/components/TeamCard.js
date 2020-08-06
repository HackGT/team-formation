import React, { Component } from "react";
import { Button, Card, Popup, Container, Label } from "semantic-ui-react";
import JoinTeam from './ui_subcomponents/JoinTeam';
import './css/TeamCard.css';

class TeamCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
        showModal: false
    }
  }
  closeModal = () => {
    console.log("close individual")
    this.setState({ showModal: false });
  };
  render() {
    let contact;
    contact = (
      <Popup
        trigger={<Button basic color="blue" content="Join Team!" />}
        content="Team has been joined!"
        on="click"
        hideOnScroll
      />
    );
    var colors = ["violet", "yellow", "orange"];
    var count = 0;
    var skill;
    var viewskill;
    return (
      <Card className="card1" color="blue" centered="true">
        <Card.Content className="content">
        <Card.Header><Container style={{overflow: 'auto', maxHeight: 60, minHeight: 60 }}>{this.props.name}</Container></Card.Header>
          <div className="ui divider" />
          <Card.Description className="card-description">
            <Container style={{ overflow: "auto", maxHeight: 42 }}>
              <strong> About Us: </strong>
              {this.props.about}
            </Container>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className="contact-button">
            <Button basic color='blue' content='Join Team' onClick={() => this.setState({showModal: true})} />
              <JoinTeam {...this.props} showModal={this.state.showModal} closeModal={this.closeModal} />
            <Button
              basic
              onClick={this.onViewTeamClick}
              color="blue"
              content="View Team"
            />
          </div>
        </Card.Content>
      </Card>
    );
  }
  onViewTeamClick = () => {
    this.props.onTeamPageClick("some team_id");
  };
}

export default TeamCard;

