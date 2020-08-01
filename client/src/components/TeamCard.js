import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import { Button, Card, Popup, Container, Label } from "semantic-ui-react";
import "./css/UserCard.css";

class TeamCard extends Component {
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
					<Card.Header>{this.props.name}</Card.Header>
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
						<Link to="/some-team-id">
							<Button
								basic
								onClick={this.onJoinTeamClick}
								color="blue"
								content="Join Team!"
							/>
						</Link>
					</div>
				</Card.Content>
			</Card>
    );
  }
  onJoinTeamClick = () => {
    this.props.onTeamPageClick("some team_id");
  };
}

export default TeamCard;
