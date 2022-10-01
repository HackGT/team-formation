/* eslint-disable */
import React, { Component, useState } from "react";
import { Button } from "semantic-ui-react";
import TeamInformation from "./TeamInformation";
import JoinTeam from "./JoinTeam";
import TeamNotifications from "./TeamNotifications";
import TeamRequestsSent from "./TeamRequestsSent";
import OnTeam from "./OnTeam";
import NoTeam from "./NoTeam";
import Members from "./Members";
import "../css/TeamPage.css";
import { QueryRenderer } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import environment from "../auth/Environment";
import { useMatch, useParams } from "react-router-dom";

const getTeamQuery = graphql`
  query TeamPageQuery($teamId: String) {
    team(team_id: $teamId) {
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

const TeamPage: React.FC<any> = (props) => {
  const [showModal, setShowModal] = useState(false);
  const { teamId } = useParams();

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <QueryRenderer
      environment={environment}
      query={getTeamQuery}
      variables={{
        teamId,
      }}
      render={({ error, props }: any) => {
        if (error) {
          return <div>{error.message}</div>;
        } else if (props) {
          var doc;
          if (props.user_profile.team == null) {
            doc = <NoTeam team={props.team} />;
          } else {
            doc =
              props.team.id == props.user_profile.team.id ? (
                <OnTeam team={props.team} />
              ) : (
                <NoTeam team={props.team} />
              );
          }
          return doc;
        }
      }}
    />
  );
};

export default TeamPage;
