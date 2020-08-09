import React, { Component } from 'react';
import { Button, Divider } from 'semantic-ui-react';
import TeamInformation from './TeamInformation';
import JoinTeam from './ui_subcomponents/JoinTeam';
import TeamNotifications from './TeamNotifications';
import TeamRequestsSent from './TeamRequestsSent';
import Members from './Members';
import MembersBlank from './MembersBlank';
import OnTeam from './OnTeam';
import NoTeam from './NoTeam';
import './css/TeamPage.css';

class TeamPage extends Component {
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
    console.log(this.props.team_id);  
    var doc = this.props.team_id == this.props.group_id ? <OnTeam /> : <NoTeam />;
    return (
      doc
    )
  }
}

export default TeamPage;