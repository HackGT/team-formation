import React, { Component } from "react";
import UserCard from "./UserCard";
import { Card, Button, Icon } from "semantic-ui-react";

import { QueryRenderer } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import "./css/Members.css";
import environment from "./Environment";
import { Link } from "react-router-dom";

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

      console.log("Name: " + user.name);
      console.log("Skills: " + user.skills);
      memberCards.push(
        <UserCard
          name={user.name}
          grad_year={user.grad_year}
          school={user.school}
          contact={user.email}
          skills={user.skills.filter(function(el) {
            return Boolean(el);
          })}
          experience={user.experience}
          slackid={user.slackid}
        />
      );
    }
    for (let j = 4 - users.length; j > 0; j--) {
      memberCards.push(
        <div className="emptyCard">
          <Link to="/feed/">
            <Icon name="plus"/>
          </Link>
        </div>
      );
    }
    return <div className="member-cards-container">{memberCards}</div>;
  }
}

export default Members;
