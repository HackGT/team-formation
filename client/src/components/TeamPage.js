import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import TeamInformation from './TeamInformation';
import Members from './Members';
import './css/TeamPage.css';

class TeamPage extends Component {
  render() {
    return (
      <div className="team-page">
        <h1>Team {this.props.team_id}</h1>
        <Button>Join Team!</Button>
        <div className="first-row">
          <TeamInformation />
          <TeamInformation />
        </div>
        <Members />
      </div>
    )
  }
}

export default TeamPage;
