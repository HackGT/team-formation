import React, { Component } from "react";
import { Card, Form, Button, Label, Message, Input } from "semantic-ui-react";
import TeamInformation from "./TeamInformation";
import JoinTeam from "./ui_subcomponents/JoinTeam";
import CheckingModal from "./ui_subcomponents/CheckingModal";
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

const leaveTeamMutation = graphql`
  mutation OnTeamLeaveMutation {
    leave_team {
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
      showSecondModal: false,
      leaveTeam: false,
    };
  }
  closeModal = () => {
    this.setState({ showModal: false });
  };
  sendInformation = () => {
    console.log("WOAH IN HERE");
    commitMutation(environment, {
      mutation: leaveTeamMutation
    });
    window.location.reload();
  }
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
            icon="pencil"
            fluid
          />
          {/* <Message id="alert" hidden={this.state.save_message_hidden} success={this.state.save_success} header={this.state.save_success ? "Changes Saved" : "Unsaved Changes"}/> */}
        </h1>
        <Button
          className="leaveTeam"
          onClick={() => {
              this.setState({showSecondModal: true});
              // this.sendInformation();
              console.log("STATEEEEE: ",this.state.leaveTeam)
          }}
        >
          Leave Team
        </Button>
        <CheckingModal
            message="Are you sure you want to leave the team?"
            closeModal={() => this.setState({ showSecondModal:false})}
            // secondModal={() => this.props.closeModal()}
            // onOpen={() => this.setState({ secondOpen:true})}
            showModal={this.state.showSecondModal}
            leaveTeam={this.sendInformation}
            >
          </CheckingModal>
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
