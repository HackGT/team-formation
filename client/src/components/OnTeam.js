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
    this.props.editable = true;
    return (
      <div id="on-team" class="team-page">
        <h1>Team {this.props.name}</h1>
        <Button basic color='blue' content='Join Team' onClick={() => this.setState({showModal: true})} />
              <JoinTeam {...this.props} showModal={this.state.showModal} closeModal={this.closeModal} />
        <div className="first-row">
          <div className="first-col">
            <TeamNotifications />
            <TeamRequestsSent/>
          </div>
          <div className="second-col">
            <TeamInformation />
          </div>
        </div>
        <Members members={this.props.team.members}/>
      </div>
    )
  }
}

export default OnTeam;