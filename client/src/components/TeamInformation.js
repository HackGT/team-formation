import React, { Component } from 'react';
import { Card, Form, TextArea, Button } from 'semantic-ui-react'
import './css/TeamInformation.css'

class TeamInformation extends Component {
    state = {
        teamBio: this.props.teamBio,
        projectIdea: this.props.projectIdea
    }
    render() {
        if (this.props.editable) {
            return(
                <div className="team-card-container">
                    <Card fluid>
                        <Card.Content className="card-content">
                            <Card.Header className="card-header">Team Information</Card.Header>
                            <Form className="form">
                                <Form.Field className='input' control={TextArea} label='Team Bio' placeholder='Tell us about your team'/> 
                                <Form.Field className='input' control={TextArea} label='Project Idea' placeholder='Describe any ideas you have for a potential project'/>
                            </Form>
                            <Button className="save-button" icon='unlock'></Button>
                        </Card.Content>
                    </Card>
                </div>
            );
        } else {
            return(
                <div className="team-card-container">
                    <Card fluid>
                        <Card.Content className="card-content">
                            <Card.Header className="card-header">Team Information</Card.Header>
                            <Form className="form">
                                <Form.Field className='input' control={TextArea} label='Team Bio' defaultValue={this.props.teamBio} style={{ minHeight: 150, resize: 'none' }} disabled/>
                                <Form.Field className='input' control={TextArea} label='Project Idea' defaultValue={this.props.projectIdea} style={{ minHeight: 135, resize: 'none' }} disabled/>
                            </Form>
                        </Card.Content>
                    </Card>
                </div>
            );
        }
    }
}

export default TeamInformation;