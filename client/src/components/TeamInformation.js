import React, {Component} from 'react';
import {
    Card,
    Form,
    TextArea,
    Button,
    Label
} from 'semantic-ui-react'
import './css/TeamInformation.css'
import skills from '../constants/skills'
import {commitMutation} from 'react-relay';
import {graphql} from 'babel-plugin-relay/macro';
import environment from './Environment';

const mutation = graphql `
mutation TeamInformationMutation($name: String, $picture: String, $interests: [String], $description: String, $project_idea: String) {
  update_team(name: $name, picture: $picture, interests: $interests, description: $description, project_idea: $project_idea) {
    name
    picture
    interests
    description
    project_idea
  }
}
`;

class TeamInformation extends Component {
    state = {
        teamBio: this.props.teamBio,
        projectIdea: this.props.projectIdea,
        icon: 'lock',
        active: false,
        interests: this.props.interests,
        search: '',
        interest_options: skills
    }
    render() {
        var colors = ["#A0CCC9", "#EBABCA"];
        var count = 0;
        var interestLabels = this.state.interests.map((interest) => (
        <Label
            size="mini"
            className="labelStyle"
            style={{
            backgroundColor: colors[count++ % 2],
            }}
        >
            {interest}
        </Label>
        ));
        if (this.props.editable) {
            return (<div className="team-card-container">
                <Card fluid="fluid">
                    <Card.Content className="card-content">
                        <Card.Header className="card-header">Team Information</Card.Header>
                        <Form className="form">
                            <Form.Field defaultValue={this.state.teamBio} onChange={this.onTeamBioChange} control={TextArea} className='input' label='Team Bio' placeholder='Tell us about your team' disabled={this.state.icon === 'lock'}/>
                            <Form.Field defaultValue={this.state.projectIdea} onChange={this.onProjectIdeaChange} className='input' control={TextArea} label='Project Idea' placeholder='Describe any ideas you have for a potential project' disabled={this.state.icon === 'lock'}/>
                            <Form.Dropdown defaultValue={this.state.interests} disabled={this.state.icon === 'lock'} label='Interests' options={this.state.interest_options} placeholder='Select Interests' search="search" selection="selection" fluid="fluid" multiple="multiple" allowAdditions="allowAdditions" value={this.state.interests} onAddItem={this.handleAddition} onChange={this.handleChange}/>
                            <Button className="save-button" icon={this.state.icon} onClick={this.onLockClick}></Button>
                        </Form>
                    </Card.Content>
                </Card>
            </div>);
        } else {
            return (<div className="team-card-container">
                <Card fluid="fluid">
                    <Card.Content className="card-content">
                        <Card.Header className="card-header">Team Information</Card.Header>
                        <Form className="form">
                            <Form.Field className='input' control={TextArea} label='Team Bio' defaultValue={this.props.teamBio} style={{
                                    minHeight: 150,
                                    resize: 'none'
                                }} disabled="disabled"/>
                            <Form.Field className='input' control={TextArea} label='Project Idea' defaultValue={this.props.projectIdea} style={{
                                    minHeight: 150,
                                    resize: 'none'
                                }} disabled="disabled"/>
                        </Form>
                        <Card.Description>
                            Interests
                        </Card.Description>
                        <Card.Description>
                            {interestLabels}
                        </Card.Description>
                    </Card.Content>
                </Card>
            </div>);
        }
    };

    onTeamBioChange = (e) => {
        this.setState({teamBio: e.target.value});
    };

    onProjectIdeaChange = (e) => {
        this.setState({projectIdea: e.target.value});
    };

    onLockClick = (e) => {
        if(this.state.icon == 'unlock') {
            this.setState({icon: 'lock'})
            console.log(this.props.teamBio);
            console.log(this.state.teamBio);
            commitMutation(environment, {
                mutation,
                variables: {
                    interests: this.state.interests,
                    description: this.state.teamBio,
                    project_idea: this.state.projectIdea 
                }
            });
        } else {
            this.setState({icon: 'unlock'})
        }
        // this.state.icon === 'unlock'
        //     ? this.setState({icon: 'lock'})
        //     : this.setState({icon: 'unlock'})
    };

    handleAddition = (e, {value}) => {
        console.log(value);
        this.setState((prevState) => ({
            interest_options: [
                {
                    text: value,
                    value
                },
                ...prevState.interest_options
            ]
        }))
    };

    handleChange = (e, {value}) => this.setState({interests: value});

}

export default TeamInformation;
