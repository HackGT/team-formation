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
          <h1 className="no-team-heading">{this.props.team.name}</h1>
          <Button className="ask-to-join" content='Ask to Join' onClick={() => this.setState({showModal: true})} />
                <JoinTeam {...this.props} showModal={this.state.showModal} closeModal={this.closeModal} />
          <div className="noTeam-content">
              <MembersBlank members={this.props.team.members}/>
              <TeamInformation editable={false} teamBio={this.props.team.description} projectIdea={this.props.team.project_idea} interests={this.props.team.interests}/>
          </div>
        </div>
    )
  }
}

export default NoTeam;