import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import TeamInformation from './TeamInformation';
import JoinTeam from './ui_subcomponents/JoinTeam';
import TeamNotifications from './TeamNotifications';
import TeamRequestsSent from './TeamRequestsSent';
import OnTeam from './OnTeam';
import NoTeam from './NoTeam';
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
          school
          grad_year
          contact
          skills
          experience
          visible
          uuid
          id
          slackid
        }
        interests
        description
        project_idea
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
    user_profile {
      team {
          id
      }
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
    const curr_team_id = this.props.match.params.id;
    return (
      <QueryRenderer environment={environment} query={getTeamQuery} variables={{
        team_id: curr_team_id
    }} render={({error, props}) => {
        if (error) {
          return <div>{error.message}</div>;
        } else if (props) {
          console.log(JSON.stringify(props));
          console.log(props.team.members.skills);
          var doc;
          if(props.user_profile.team == null) {
            doc = <NoTeam team={props.team}/>;
          } else{
            doc = props.team.id == props.user_profile.team.id ? <OnTeam team={props.team}/> : <NoTeam team={props.team} />;
          }
          return(
            doc
          );
        }
    }}/>

    )
  }
}

export default withRouter(TeamPage);
