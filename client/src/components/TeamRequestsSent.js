import React, { Component } from "react";
import { Card, Container } from "semantic-ui-react";
import NotificationCard from "./NotificationCard";
import { QueryRenderer } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import environment from "./Environment";
import "./css/NotificationCard.css";

const getSentRequestsQuery = graphql`
  query TeamRequestsSentQuery($sent: Boolean) {
    team_notifications(sent: $sent) {
      id
      message
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
          name
        }
      }
      senderType
      receiver {
        __typename
        ... on User {
          id
          name
        }
        __typename
        ... on Team {
          name
        }
      }
      resolved
    }
  }
`;

class TeamRequestsSent extends Component {
  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={getSentRequestsQuery}
        variables={{
            sent: true
        }}
        render={({ error, props }) => {
          if (error) {
            return <div>{error.message}</div>;
          } else if (props) {
            console.log(JSON.stringify(props));
            var sent_requests = props.team_notifications;
            var colors = ["#A8C5D6", "#CCBEDF"];
            var count = 0;
            var sentRequestCards = sent_requests.map((notif) => {
              return (
                <NotificationCard
                  sent_notification={true}
                  receiver={notif.receiver}
                  message={notif.bio}
                  type={notif.senderType}
                  request={notif.bio}
                  idea={notif.idea}
                  meta={notif.meta}
                  sender={notif.sender}
                  notification_id={notif.id}
                  color={colors[count++ % 2]}
                />
              );
            });
            return (
              <div className="requestsSent">
                <Card fluid>
                  <Card.Content className="card-content">
                    <Card.Header className="card-header">
                      Requests Sent
                    </Card.Header>
                    <Container
                      style={{
                        overflow: "auto",
                        maxHeight: 140,
                        minHeight: 140,
                      }}
                    >
                      {sentRequestCards}
                    </Container>
                  </Card.Content>
                </Card>
              </div>
            );
          }
        }}
      />
    );
  }
}

export default TeamRequestsSent;
