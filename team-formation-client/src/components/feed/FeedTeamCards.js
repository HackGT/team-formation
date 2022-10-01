/* eslint-disable */
import React, { Component } from "react";
import TeamCard from "../team/TeamCard";
import { Button } from "semantic-ui-react";

import { QueryRenderer } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import "../css/Feed.css";
import environment from "../auth/Environment";

const getTeamsQuery = graphql`
  query FeedTeamCardsQuery($interests: String, $search: String) {
    teams(interests: $interests, search: $search) {
      name
      interests
      description
      public
      members {
        name
      }
      id
    }
    user_profile {
      team {
        id
      }
    }
  }
`;

/**
 * Component that houses the cards of all teams that have been created that
 * are not full or private. Very similar to FeedCards.
 */
class FeedTeamCards extends Component {
  render() {
    let search = this.props.search;
    let interests = this.props.skill.join(",");
    console.log(`interests: ${interests}`);
    return (
      <QueryRenderer
        environment={environment}
        query={getTeamsQuery}
        variables={{
          search: search,
          interests: interests,
        }}
        render={({ error, props }) => {
          if (error) {
            return <div>{error.message}</div>;
          } else if (props) {
            let cards = props.teams.map((team) => {
              if (team.public == true) {
                console.log("rendering..");
                return (
                  <TeamCard
                    id={team.id}
                    name={team.name}
                    interests={team.interests.filter(function (el) {
                      return Boolean(el);
                    })}
                    description={team.description}
                    team={props.user_profile.team}
                  />
                );
              }
            });
            return (
              <div>
                <div className="Cards-container">
                  {cards.slice(
                    this.props.sliceIndexStart,
                    this.props.sliceIndexStart + this.props.numCardsPerPage
                  )}
                </div>
                <div className="buttons-container">
                  {this.props.sliceIndexStart !== 0 && (
                    <Button onClick={this.props.moveLeft}>Previous</Button>
                  )}
                  {Math.floor(
                    this.props.sliceIndexStart / this.props.numCardsPerPage
                  ) !==
                    Math.floor(
                      (cards.length - 1) / this.props.numCardsPerPage
                    ) &&
                    cards.length !== 0 && (
                      <Button onClick={this.props.moveRight}>Next</Button>
                    )}
                </div>
              </div>
            );
          }
        }}
      />
    );
  }
}

export default FeedTeamCards;
