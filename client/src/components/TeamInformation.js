import React, { Component } from 'react';
import { Card, Form, TextArea, Button, Select, Dropdown } from 'semantic-ui-react'
import './css/TeamInformation.css'
import skills from '../constants/skills'

class TeamInformation extends Component {
    state = {
        teamBio: this.props.teamBio,
        projectIdea: this.props.projectIdea,
        icon: 'unlock',
        active: false,
        currentValues: [],
        search: '',
        options: skills
    }
    render() {
        if (this.props.editable) {
            return(
                <div className="team-card-container">
                    <Card fluid>
                        <Card.Content className="card-content">
                            <Card.Header className="card-header">Team Information</Card.Header>
                            <Form className="form">
                                <Form.Field 
                                    className='input' 
                                    control={TextArea} 
                                    label='Team Bio' 
                                    placeholder='Tell us about your team' 
                                    disabled={this.state.icon === 'unlock'}
                                /> 
                                <Form.Field 
                                    className='input' 
                                    control={TextArea} 
                                    label='Project Idea' 
                                    placeholder='Describe any ideas you have for a potential project' 
                                    disabled={this.state.icon === 'unlock'}
                                />
                                <Form.Dropdown
                                    disabled={this.state.icon === 'unlock'}
                                    icon={this.state.icon === 'unlock' ? null : 'dropdown'}
                                    label='Seeking'
                                    options={this.state.options}
                                    placeholder='Select Seeking Skills'
                                    search
                                    selection
                                    fluid
                                    multiple
                                    allowAdditions
                                    value={this.state.currentValues}
                                    onAddItem={this.handleAddition}
                                    onChange={this.handleChange}
                                />
                                <Button className="save-button" icon={this.state.icon} onClick={this.onLockClick}></Button>
                            </Form>
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
                                <Form.Field 
                                    className='input' 
                                    control={TextArea} 
                                    label='Team Bio' 
                                    defaultValue={this.props.teamBio} 
                                    style={{ minHeight: 150, resize: 'none' }} 
                                    disabled
                                />
                                <Form.Field 
                                    className='input' 
                                    control={TextArea} 
                                    label='Project Idea' 
                                    defaultValue={this.props.projectIdea} 
                                    style={{ minHeight: 150, resize: 'none' }} 
                                    disabled
                                />
                                <Form.Dropdown
                                    disabled
                                    multiple
                                    icon={null}
                                    label='Seeking'
                                    fluid
                                    selection
                                    value={this.state.currentValues}
                                />
                            </Form>
                        </Card.Content>
                    </Card>
                </div>
            );
        }
    }
    onLockClick = (e) => {
        this.state.icon === 'unlock' ? this.setState({icon:'lock'}) : this.setState({icon:'unlock'})
    }
    handleAddition = (e, { value }) => {
        this.setState((prevState) => ({
          options: [{ text: value, value }, ...prevState.options],
        }))
    }
    
    handleChange = (e, { value }) => this.setState({ currentValues: value })
    
}


export default TeamInformation;