import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import TeamInformation from './TeamInformation';
import JoinTeam from './ui_subcomponents/JoinTeam';
import MembersBlank from './MembersBlank';
import './css/TeamPage.css';
import ConfirmationModal from "./ui_subcomponents/ConfirmationModal";
import truncateTeamName from "../constants/functions"
import { Team } from "../types/index"

interface props {
    team: Team,
}

interface states {
    showModal: boolean,
    showTeam: boolean,
    showNotTeam: boolean,
    showSecondModal: boolean
}

class NoTeam extends Component<props, states> {
  constructor(props: props) {
    super(props);
    this.state = {
        showModal: false,
        showTeam: false,
        showNotTeam: false,
        showSecondModal: false
    }
  }
  // Closes all modals
  closeModal = () => {
    this.setState({ showModal: false });
  };

  // Displays confirmation of request
  secondModal = () => {
    this.setState({showSecondModal: true})
  }
  render() {
    // Reduce size of team name if too long for the header
    var teamName = truncateTeamName(this.props.team.name)
    return (
        <div id="not-team" className="team-page">
          <h1 className="no-team-heading">{teamName}</h1>
          <Button className="ask-to-join" content='Ask to Join' onClick={() => this.setState({showModal: true})} />
              <JoinTeam name={teamName} id={this.props.team.id} showModal={this.state.showModal} closeModal={this.closeModal} showSecond={this.secondModal}/>
              <ConfirmationModal
              message="Your request to join the team has been sent!"
              closeModal={() => this.setState({ showSecondModal:false})}
              showModal={this.state.showSecondModal}
              >
              </ConfirmationModal>
          <div className="noTeam-content">
              <TeamInformation editable={false} teamBio={this.props.team.description} projectIdea={this.props.team.project_idea} interests={this.props.team.interests}/>
              <MembersBlank members={this.props.team.members}/>
          </div>
        </div>
    )
  }
}

export default NoTeam;
