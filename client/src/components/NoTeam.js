import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import TeamInformation from './TeamInformation';
import JoinTeam from './ui_subcomponents/JoinTeam';
import TeamNotifications from './TeamNotifications';
import TeamRequestsSent from './TeamRequestsSent';
import Members from './Members';
import MembersBlank from './MembersBlank';
import './css/TeamPage.css';

class NoTeam extends Component {
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
        <div id="not-team" class="team-page">
          <h1>{this.props.team.name}</h1>
          <Button basic color='blue' content='Ask to Join' onClick={() => this.setState({showModal: true})} />
                <JoinTeam {...this.props} showModal={this.state.showModal} closeModal={this.closeModal} />
          <div className="first-row">
            <div className="first-col">
              <MembersBlank members={this.props.team.members}/>
            </div>
            <div className="second-col">
              <TeamInformation editable={false} teamBio={this.props.team.description} projectIdea={this.props.team.project_idea} interests={this.props.team.interests}/>
            </div>
          </div>
        </div>
    )
  }
}

export default NoTeam;