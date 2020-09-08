import React, { Component } from "react";
import { Card, Form, Button, Label, Message, Input } from "semantic-ui-react";
import TeamInformation from "./TeamInformation";
import JoinTeam from "./ui_subcomponents/JoinTeam";
import TeamNotifications from "./TeamNotifications";
import TeamRequestsSent from "./TeamRequestsSent";
import Members from "./Members";
import MembersBlank from "./MembersBlank";
import "./css/TeamPage.css";
import { commitMutation } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import environment from "./Environment";

const mutation = graphql`
  mutation OnTeamMutation($name: String) {
    update_team(name: $name) {
      name
    }
  }
`;

class OnTeam extends Component {
  constructor(props) {
    super(props);
    this._onBlur = this._onBlur.bind(this);

    this.state = {
      name: this.props.team.name,
      icon: "lock",
      showModal: false,
      showTeam: false,
      showNotTeam: false,
      save_message_hidden: true,
      save_success: false,
    };
  }
  closeModal = () => {
    this.setState({ showModal: false });
  };
  render() {
    return (
      <div id="on-team" class="team-page">
        {/* <h1>{this.props.team.name}</h1> */}
        <h1 id="header">
          <Form.Input
            id="field"
            defaultValue={this.state.name}
            onBlur={this._onBlur}
            onChange={this.onTeamNameChange}
            className="input"
          />
          {/* <Message id="alert" hidden={this.state.save_message_hidden} success={this.state.save_success} header={this.state.save_success ? "Changes Saved" : "Unsaved Changes"}/> */}
        </h1>
        <Button
          style={{
            color: "white",
            background: "transparent",
            border: "1px solid white",
          }}
          onClick={() => this.setState({ showModal: true })}
        >
          Join Team
        </Button>
        <JoinTeam
          {...this.props}
          showModal={this.state.showModal}
          closeModal={this.closeModal}
        />
        <div className="first-row">
          <div className="first-col">
            <TeamNotifications />
            <TeamRequestsSent />
          </div>
          <div className="second-col">
            <TeamInformation
              editable={true}
              teamBio={this.props.team.description}
              projectIdea={this.props.team.project_idea}
              interests={this.props.team.interests}
            />
          </div>
        </div>
        <Members members={this.props.team.members} />
      </div>
    );
  }
  onTeamNameChange = (e) => {
    this.setState({ name: e.target.value });
  };

  _onBlur() {
    this.setState({
      save_message_hidden: false,
      save_success: true,
    });
    commitMutation(environment, {
      mutation,
      variables: {
        name: this.state.name,
      },
    });
  }
}

export default OnTeam;
