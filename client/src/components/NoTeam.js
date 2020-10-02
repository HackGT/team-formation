import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import TeamInformation from './TeamInformation';
import JoinTeam from './ui_subcomponents/JoinTeam';
import TeamNotifications from './TeamNotifications';
import TeamRequestsSent from './TeamRequestsSent';
import Members from './Members';
import MembersBlank from './MembersBlank';
import './css/TeamPage.css';
import ConfirmationModal from "./ui_subcomponents/ConfirmationModal";

class NoTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
        showModal: false,
        showTeam: false,
        showNotTeam: false,
        showSecondModal: false
    }
  }
  closeModal = () => {
    this.setState({ showModal: false });
  };
  secondModal = () => {
    this.setState({showSecondModal: true})
  }
  render() {
    return (
        <div id="not-team" class="team-page">
          <h1 className="no-team-heading">{this.props.team.name}</h1>
          <Button className="ask-to-join" content='Ask to Join' onClick={() => this.setState({showModal: true})} />
              <JoinTeam name={this.props.team.name} id={this.props.team.id} showModal={this.state.showModal} closeModal={this.closeModal} showSecond={this.secondModal}/>
              <ConfirmationModal
              message="Your request to join the team has been sent!"
              closeModal={() => this.setState({ showSecondModal:false})}
              // secondModal={() => this.props.closeModal()}
              // onOpen={() => this.setState({ secondOpen:true})}
              showModal={this.state.showSecondModal}
              >
              </ConfirmationModal>
          <div className="noTeam-content">
              <MembersBlank members={this.props.team.members}/>
              <TeamInformation editable={false} teamBio={this.props.team.description} projectIdea={this.props.team.project_idea} interests={this.props.team.interests}/>
          </div>
        </div>
    )
  }
}

export default NoTeam;
