import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import TeamInformation from './TeamInformation';
import JoinTeam from './ui_subcomponents/JoinTeam';
import TeamNotifications from './TeamNotifications';
import TeamRequestsSent from './TeamRequestsSent';
import Members from './Members';
import './css/TeamPage.css';
import {QueryRenderer} from 'react-relay';
import {graphql} from 'babel-plugin-relay/macro';
import environment from './Environment';
import { withRouter } from "react-router-dom";

const getTeamQuery = graphql `
  query TeamPageQuery($team_id: String) {
    team(team_id:$team_id) {
        id
        name
        picture
        members {
          name
        }
        interests
        description
        notifications {
          id
          bio
          idea
          sender {
              __typename
              ... on User {
                  id
                  name
              }
              __typename
              ... on Team {
                  id
                  name
              }
          }
          senderType
        }
        public
    }
  }
`;

class TeamPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        showModal: false,
        team_id: this.props.match.params.id
    }
  }
  closeModal = () => {
    this.setState({ showModal: false });
  };
  render() {
    console.log('rendering team page..');
    console.log(`team id: ${JSON.stringify(this.state.team_id)}`);
    return (
      <QueryRenderer environment={environment} query={getTeamQuery} variables={{
        team_id: this.state.team_id
    }} render={({error, props}) => {
        if (error) {
          return <div>{error.message}</div>;
        } else if (props) {
          console.log(JSON.stringify(props));
          return(
            <div className="team-page">
              <h1>Team {props.team.name}</h1>
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
          );
        }
    }}/>

    )
  }
}

export default withRouter(TeamPage);