import React, { Component } from 'react';
import { Card, Container } from 'semantic-ui-react';

class TeamNotifications extends Component {
    render() {
        return (
            <Card fluid>
                <Card.Content className="card-content">
                    <Card.Header className="card-header">Notifications</Card.Header>
                    <Container style={{overflow: 'auto', maxHeight: 200, minHeight: 200 }}></Container>
                </Card.Content>
            </Card>
        );
    }
}

export default TeamNotifications;