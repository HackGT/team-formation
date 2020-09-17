import React, { Component } from "react";
import {
  Button,
  Card,
  Popup,
  Container,
  Label,
  Icon,
  Segment,
} from "semantic-ui-react";
import NotificationCard from "./NotificationCard";
import "./css/NotificationCard.css";
import { QueryRenderer } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import environment from "./Environment";

const getNotificationsQuery = graphql`
  query NotificationGroupQuery {
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
  }
`;

class NotificationGroup extends Component {
  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={getNotificationsQuery}
        variables={{}}
        render={({ error, props }) => {
          if (error) {
            return <div>{error.message}</div>;
          } else if (props) {
            console.log(props.notifications);
            var user = this.props.user_id;
            var notifications = props.notifications;
            var colors = ["#A8C5D6", "#CCBEDF"];
            var count = 0;
            var notificationCards = notifications.map((notif) => {
              console.log("SENDERR: ", notif.sender)
              return (
                <NotificationCard
                  message={notif.bio}
                  type={notif.senderType}
                  request={notif.bio}
                  idea={notif.idea}
                  meta={notif.meta}
                  sender={notif.sender}
                  receiver={'USER'}
                  notification_id={notif.id}
                  color={colors[count++ % 2]}
                />
              );
            });
            var notificationMessage = notificationCards.length > 0 ? notificationCards : "No notifications right now!"
            console.log(notificationMessage)
            return (
              <Segment
                style={{
                  overflow: "auto",
                  maxHeight: 400,
                  color: '#8895c1',
                  'text-align': 'center'
                }}
              >
                {notificationMessage}
              </Segment>
            );
          }
        }}
      />
    );
  }
}

export default NotificationGroup;
