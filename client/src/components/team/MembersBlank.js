/* eslint-disable */
import React, { Component } from "react";
import UserCard from "../profile/UserCard";
import { Card, Button, Icon } from "semantic-ui-react";

import { QueryRenderer } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import "../css/MembersBlank.css";
import environment from "../auth/Environment";

// edit this query to pull on the team members
const getUsersQuery = graphql`
  query MembersBlankQuery($skill: String) {
    users(skill: $skill) {
      name
      school
      grad_year
      contact
      skills
      experience
      visible
      uuid
    }
  }
`;

class Members extends Component {
  render() {
    let memberCards = [];

    // sample users array
    let users = [];

    if (this.props.members) {
      users = this.props.members;
    }

    for (let i = 0; i < users.length; i++) {
      let user = users[i];
      memberCards.push(
        <UserCard
          name={user.name}
          grad_year={user.grad_year}
          school={user.school}
          contact={user.contact}
          skills={user.skills.filter(function (el) {
            return Boolean(el);
          })}
          experience={user.experience}
        />
      );
    }

    let cards = (
      <Card.Group centered itemsPerRow={2} className="center-group">
        {memberCards}
      </Card.Group>
    );
    return <div className="member-cards-container">{memberCards}</div>;
  }
}

export default Members;
