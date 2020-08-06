import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import TeamInformation from './TeamInformation';
import JoinTeam from './ui_subcomponents/JoinTeam';
import TeamNotifications from './TeamNotifications';
import TeamRequestsSent from './TeamRequestsSent';
import Members from './Members';
import './css/TeamPage.css';

class TeamPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        showModal: false
    }
  }
  closeModal = () => {
    this.setState({ showModal: false });
  };
  render() {
    return (
      <div className="team-page">
        <h1>Team {this.props.team_id}</h1>
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
        <Members />
      </div>
    )
  }
}

export default TeamPage;