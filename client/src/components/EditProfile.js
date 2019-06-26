import React, {Component} from 'react';
import { Button, Divider, Dropdown, TextArea, Message, Form } from 'semantic-ui-react';
import {QueryRenderer } from 'react-relay';
import ContactDropdown from './ui_subcomponents/ContactDropdown';
import './css/EditProfile.css';
import {commitMutation } from 'react-relay';
import {graphql} from 'babel-plugin-relay/macro';
import environment from './Environment';
import tags from '../constants/tags'
import Filter from 'bad-words'
const mutation = graphql`
mutation EditProfileMutation($uuid: String, $name: String, $grad_year: String, $school: String, $skills: [String], $experience: String, $contact: String, $contact_method: String) {
  update_user(uuid: $uuid, name: $name, grad_year: $grad_year, school: $school,  skills: $skills, experience: $experience, contact: $contact, contact_method: $contact_method) {
    name
    grad_year
    school
    skills
    experience
    contact
  }
}
`;

const getUsersProfile = graphql`
query EditProfileQuery($uuid: String) {
    user_profile(uuid:$uuid) {
        name
        school
        grad_year
        contact
        skills
        experience
        contact_method
    }
}
`;



class EditProfile extends Component {

	constructor() {
        super();
		this.state = {
			name: "",
			school: "",
			grad_year: "",
            skills: [],
	        experience: "",
	        contact_method: "",
			contact: "",
            cur_error_message: "",
		};
        this.profanityFilter = new Filter();

	};

	render() {

		let contact_form;
		if (this.state.contact_method === 'phone number') {
			contact_form = <Form.Input label='Phone Number:' placeholder='(###) ###-####' defaultValue={this.state.contact} width={5} onChange={this.onContactChange} required/>
		} else if (this.state.contact_method === 'email') {
			contact_form = <Form.Input label='Email:' placeholder='example@email.com' defaultValue={this.state.contact} width={5} onChange={this.onContactChange} required/>
		} else if (this.state.contact_method === "social media") {
			contact_form = <Form.Input label='Social Media URL:' placeholder='Social Media URL' defaultValue={this.state.contact} width={5} onChange={this.onContactChange} required/>
		} else {
			contact_form = ""
        }
		return (
            <QueryRenderer
                environment={environment}
                query={getUsersProfile}
                variables={{
                    uuid: this.props.user_id,
                }}
                render={({ error, props }) => {
                    if (error) {
                        return <div>{error.message}</div>;
                    } else if (props) {
                        props = props.user_profile;
                        if (!this.state.name && props.name) {
                            this.setState({...props})
                        }
                    return (
                    <div className="Form-container">
                        <Form >
                            <Form.Group>
                            	<Form.Input label='Name' placeholder='Name' defaultValue= {props.name} width={5} onChange={this.onNameChange} required/>
                            </Form.Group>
                            <Form.Group>
                            	<Form.Input label='School' placeholder='School' defaultValue={props.school} width={5} onChange={this.onSchoolChange} required/>
                            	<Form.Input label='Graduation Year' placeholder='Graduation Year' defaultValue={props.grad_year} width={3} onChange={this.onGradYearChange} required/>
                            </Form.Group>
                            <Divider />

                            <Form.Group>
                                <Dropdown placeholder='Skills'
                                          onChange={this.onSkillsChange}
                                          fluid
                                          multiple
                                          selection
                                          search
                                          options={tags}/>
                            </Form.Group>
                            <Form.Group>
                            	<Form.Field control={TextArea} label='About me:' placeholder='Tell us more about your experiences and interests...' defaultValue={props.experience} width={15} onChange={this.onExperienceChange}/>
                            </Form.Group>
                            <Divider />

                            <Form.Group>
                            	<ContactDropdown contact={this.changeContactMethod} contact_method={props.contact_method}/>
                            </Form.Group>
                            <Form.Group>
                            	{contact_form}
                            </Form.Group>
                            <Divider />

                            <Form.Group>
                            	<Button onClick={this.onNextClick} className="save-button"> save </Button>
                            </Form.Group>
                            <Form.Group>
                                {this.state.cur_error_message}
                            </Form.Group>
                        </Form>
                    </div>)}
                }}
            />
		);
    };
	onNameChange = (e) => {
		this.setState({
			name: e.target.value
		});
	};

	onSchoolChange = (e) => {
		this.setState({
			school: e.target.value
		});
	};

	onGradYearChange = (e) => {
		this.setState({
			grad_year: e.target.value
		});
	};

    onExperienceChange = (e) => {
        this.setState({
            experience: e.target.value
        });
    };

	onContactChange = (e) => {
		this.setState({
			contact: e.target.value
		});
	};

    onSkillsChange = (e, {value}) => {
        this.setState({
            skills: value
        })
    }

	changeContactMethod = (new_contact) => {
		this.setState({
			contact_method: new_contact
		})
	};

    checkProfanity = () => {
        return Object.keys(this.state).some((key) => {
            return typeof(this.state[key]) == typeof("string") &&
                   this.profanityFilter.isProfane(this.state[key])
        })
    }
	onNextClick = () => {
		let cur_error;
		if (this.state.name === "" || this.state.school === "" || this.state.grad_year === "" || this.state.contact_method === "" ) {
			cur_error = <Message
		      error
		      header='Some required fields left empty'
		      content='Make sure to fill in all starred fields'
		    />;
			this.setState({
				cur_error_message: cur_error
			});

		} else if(this.checkProfanity()){
            cur_error =
            <Message>
              <Message.Header>Your profile contains profanity</Message.Header>
              <p>
                Please review your profile for profane language and try again
              </p>
            </Message>
			this.setState({
				cur_error_message: cur_error
			});
        }
        else {
	        commitMutation(
	            environment,
	            {
	                mutation,
	                variables: {
	                    uuid: this.props.user_id,
	                    name: this.state.name,
	                    grad_year: this.state.grad_year,
	                    school: this.state.school,
	                    contact: this.state.contact,
	                    skills: this.state.skills,
                        experience: this.state.experience,
                        contact_method: this.state.contact_method
	                }
	            }
	        );
			this.props.onNextClick('feed', this.props.user_id);
		}
	};
};

export default EditProfile;
