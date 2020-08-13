import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import TeamInformation from './TeamInformation';
import JoinTeam from './ui_subcomponents/JoinTeam';
import TeamNotifications from './TeamNotifications';
import TeamRequestsSent from './TeamRequestsSent';
import Members from './Members';
import MembersBlank from './MembersBlank';
import './css/TeamPage.css';

class OnTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
        showModal: false,
        showTeam: false,
        showNotTeam: false
    }
  }
  closeModal = () => {
    this.setState({ showModal: false });
  };
  render() {
    return (
      <div id="on-team" class="team-page">
        <h1>{this.props.team.name}</h1>
        <Button basic color='blue' content='Join Team' onClick={() => this.setState({showModal: true})} />
              <JoinTeam {...this.props} showModal={this.state.showModal} closeModal={this.closeModal} />
        <div className="first-row">
          <div className="first-col">
            <TeamNotifications/>
            <TeamRequestsSent/>
          </div>
          <div className="second-col">
            <TeamInformation editable={true} teamBio={this.props.team.description} projectIdea={this.props.team.project_idea} interests={this.props.team.interests}/>
          </div>
        </div>
        <Members members={this.props.team.members}/>
      </div>
    )
  }
}

export default OnTeam;