import React, { Component } from "react";
import { Button, Card, Popup, Container, Label, Icon } from "semantic-ui-react";
import NotificationCard from "./NotificationCard";
import "./css/NotificationCard.css";

class NotificationGroup extends Component {
  render() {
    var props = {
      notifications: [
        {
          type: "team",
          message: "Team 23 wants you to join their team!",
          team_id: "absad",
          requestMessage: "Hey team23 here! Join us pls",
          requestIdea: "Pls join thnx",
          meta: {
            teamName: "Team 23",
          },
        },
        {
          type: "individual",
          message: "Meha A. wants to team up with you!",
          user_id: "abcd",
          requestMessage: "Hey im meha! I wanna join your team!",
          requestIdea: "I have lots of cool ideas hehe",
          meta: {
            name: "Meha A.",
            school: "Georgia Tech",
            grad_year: "graduated",
            experience: "Lots of useless things",
            skills: ["React", "NodeJS"],
            contact: "5712260277",
          },
        },
      ],
    };
    var user = props.user_id;
    var notifications = props.notifications;
    var notificationCards = notifications.map((notif) => {
      return (
        <NotificationCard
          message={notif.message}
          type={notif.type}
          request={notif.requestMessage}
          idea={notif.requestIdea}
          meta={notif.meta}
          onTeamPageClick={this.props.onTeamPageClick}
        />
      );
    });
    return <div>{notificationCards}</div>;
  }
}

export default NotificationGroup;
