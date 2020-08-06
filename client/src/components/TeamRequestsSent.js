import React, { Component } from 'react';
import { Card, Container } from 'semantic-ui-react'

class TeamRequestsSent extends Component {
    render() {
        return (
            <Card fluid>
                <Card.Content className="card-content">
                    <Card.Header className="card-header">Requests Sent</Card.Header>
                    <Container style={{overflow: 'auto', maxHeight: 140, minHeight: 140 }}></Container>
                </Card.Content>
            </Card>
        );
    }
}

export default TeamRequestsSent;