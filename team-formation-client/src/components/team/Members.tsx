/* eslint-disable */
import React, { Component } from "react";
import UserCard from "../profile/UserCard";
import { Icon } from "semantic-ui-react";
import graphql from "babel-plugin-relay/macro";
import "../css/Members.css";
import environment from "../auth/Environment";
import { Link } from "react-router-dom";
import { processImport } from "@graphql-tools/import";
import { User } from "../../types/index";

// edit this query to pull on the team members
const getUsersQuery = graphql`
  query MembersQuery {
    user_profile {
      team {
        members {
          name
          school
          grad_year
          contact
          skills
          experience
          location
        }
      }
    }
  }
`;

interface props {
  members: [User];
}

class Members extends Component<props, {}> {
  render() {
    let memberCards = [];

    // sample users array
    let users: User[] = [];
    console.log("Team: " + this.props.members);
    if (this.props.members) {
      users = this.props.members;
    }

    // Populates team member's component with cards representing each user
    for (let i = 0; i < users.length; i++) {
      let user = users[i];

      console.log("Name: " + user.name);
      console.log("Skills: " + user.skills);
      memberCards.push(
        <UserCard
          name={user.name}
          grad_year={user.grad_year}
          school={user.school}
          contact={user.contact}
          skills={user.skills.filter(function (el: string) {
            return Boolean(el);
          })}
          experience={user.experience}
          //   location={user.location}
        />
      );
    }
    // Fills in remaining slots with placeholders that redirect back the non-team users Feed
    for (let j = 4 - users.length; j > 0; j--) {
      memberCards.push(
        <div className="emptyCard">
          <Link to="/feed/">
            <Icon name="plus" />
          </Link>
        </div>
      );
    }
    return <div className="member-cards-container">{memberCards}</div>;
  }
}

export default Members;
