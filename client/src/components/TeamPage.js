//import React, { Component } from 'react';
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
import React, { useState, useEffect} from 'react';
/*
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
    const curr_team_id = this.props.match.params.id;
    return (
      <QueryRenderer environment={environment} query={getTeamQuery} variables={{
        team_id: curr_team_id
    }} render={({error, props}) => {
        if (error) {
          return <div>{error.message}</div>;
        } else if (props) {
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
*/

export default function TeamPage(props) {
  const [newTeam, setNewTeam] = useState(null);
  /*
  useAsyncEffect(async () => {
    const myHeaders = new Headers();
    const BEARER_TOKEN = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImY0ZTc2NDk3ZGE3Y2ZhOWNjMDkwZDcwZTIyNDQ2YTc0YjVjNTBhYTkiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoicHJhbml0IiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FBVFhBSnhVZjZ6UEVNOEVHVjlRenR6b0hRdHFKZ195bGd5VGxQNXhDLTFCY3c9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vaGV4bGFicy1jbG91ZCIsImF1ZCI6ImhleGxhYnMtY2xvdWQiLCJhdXRoX3RpbWUiOjE2NTQ1MjcxNTQsInVzZXJfaWQiOiJzZWtRNTl4Q1F1TzlzSWNkMjZrdUQ0cm9HaXUyIiwic3ViIjoic2VrUTU5eENRdU85c0ljZDI2a3VENHJvR2l1MiIsImlhdCI6MTY1NDUyNzE1NCwiZXhwIjoxNjU0NTMwNzU0LCJlbWFpbCI6ImRvZGRhcHJhbml0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTAyMjU5Njg2MDM4MTA3MzA1MDA5Il0sImVtYWlsIjpbImRvZGRhcHJhbml0QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6ImN1c3RvbSJ9fQ.MRFCYgTBWMSYMNyoRmdgxS6MKiRIihecDcIYqOfZEZs3ypWlEDela34vQYhacgp4iGTglMq8acMxMOfqcsIISA5Blu_z1ujC2ciHhWdYk6z9CzOBqbbKODeksnUVYJgHJZw4ziNr9LYfy4wqcXHXhcd-u9Y8c7ZvpuupZfEX0WpokN8HcPin7ZAuhH-n4tBuBBxvldOHb1G-kUKExbZTeyBYCHJdfRQCfaN7BHfxlw70b2Y9Iq-7Ce2ze6Ezla0hfRRpRop23alAomxUqkV4VTpK3VzkWRG3URTJqxiDTZtYg01UwAfhpoRvN_mOwkKxQr_S0c2B8aL8Z_fkD9sLSw";
    myHeaders.append("Authorization", "Bearer " + BEARER_TOKEN);
    fetch("http://localhost:8001/teams/629d147df5dd1abb8b3aea0d", {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    })
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      console.log(json);
    });
  }, []);
 */
 useEffect(() => {
  const fetchData = async () => {
    const myHeaders = new Headers();
    //insert token for "token"
    const BEARER_TOKEN = "token";
    myHeaders.append("Authorization", "Bearer " + BEARER_TOKEN);
    //insert id for ":id"
    const res = await fetch("http://localhost:8001/teams/:id", {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    });
    setNewTeam(await res.json());
  }
  fetchData();
}, []);
  console.log(newTeam);
    return (
      <Button></Button>
    );
  }