import React, { Component } from 'react';
import { Card, Container } from 'semantic-ui-react';
import NotificationCard from './NotificationCard';
import { QueryRenderer } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import environment from "./Environment";
import "./css/NotificationCard.css";

const getTeamNotificationsQuery = graphql`
    query TeamNotificationsQuery {
        team_notifications {
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

class TeamNotifications extends Component {
    render() {
        return(
            <QueryRenderer
                environment={environment}
                query={getTeamNotificationsQuery}
                variables={{}}
                render={({ error, props }) => {
                    if (error) {
                        return <div>{error.message}</div>;
                    } else if (props) {
                        console.log(JSON.stringify(props));
                        var notifications = props.team_notifications;
                        var colors = ["#A8C5D6", "#CCBEDF"];
                        var count = 0;
                        var notificationCards = notifications.map((notif) => {
                            return (
                                <NotificationCard
                                message={notif.bio}
                                type={notif.senderType}
                                receiver={'TEAM'}
                                request={notif.bio}
                                idea={notif.idea}
                                meta={notif.meta}
                                sender={notif.sender}
                                notification_id={notif.id}
                                color={colors[count++ % 2]}
                                />
                            );
                        });
                        let notificationMesssage = notificationCards.length > 0 ? notificationCards :
                        "No notifications right now!"
                        return (
                            <Card fluid>
                                <Card.Content className="card-content" textAlign='center'>
                                    <Card.Header className="card-header">Notifications</Card.Header>
                                    <Container style={{overflow: 'auto', maxHeight: 200, minHeight: 200, color: '#8895c1', margin: '0 auto', height: "100%",
                                        'line-height': "100%"}} textAlign='center'>
                                        {notificationMesssage}
                                    </Container>
                                </Card.Content>
                            </Card>
                        );
                    }
                }}
            />
        );
    }
}

export default TeamNotifications;
