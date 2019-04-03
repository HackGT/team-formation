import React, {Component} from 'react';
import { Input } from 'semantic-ui-react';
import { Button, Divider, TextArea, Message } from 'semantic-ui-react';
import { Form } from 'semantic-ui-react';
import Loading from './ui_subcomponents/Loading';
import YearDropdown from './ui_subcomponents/YearDropdown';
import ContactDropdown from './ui_subcomponents/ContactDropdown';
import './css/EditProfile.css'
import {commitMutation } from 'react-relay';
import {graphql} from 'babel-plugin-relay/macro';
import environment from './Environment'
const {
  Environment,
  Network,
  RecordSource,
  Store,
} = require('relay-runtime');

const mutation = graphql`
mutation EditProfileMutation($uuid: String, $name: String, $grad_year: String, $school: String, $skills: [String], $experience: String, $contact: String) {
  update_user(uuid: $uuid, name: $name, grad_year: $grad_year, school: $school,  skills: $skills, experience: $experience, contact: $contact) {
    name
    grad_year
    school
    skills
    experience
    contact
  }
}
`;

class EditProfile extends Component {

	constructor() {
		super();
		this.state = {
			user_first_name: "",
			user_last_name: "",
			user_school: "",
			user_grad_year: "",
			user_skills_1: "",
			user_skills_2: "",
			user_skills_3: "",
	        user_experience: "",
	        user_secondary_email: "",
	        user_contact: "",
			user_contact_info: "",
			cur_error_message: ""
		};
	}

	render() {
		let contact_method;
		if (this.state.user_contact === 'phone number') {
			contact_method = <Form.Input label='Phone Number:' placeholder='(###) ###-####' width={5} onChange={this.onContactInfoChange} required/>
		} else if (this.state.user_contact === 'email') {
			contact_method = <Form.Input label='Email:' placeholder='example@email.com' defaultValue={this.props.email} width={5} onChange={this.onContactInfoChange} required/>
		} else if (this.state.user_contact === "social media") {
			contact_method = <Form.Input label='Social Media URL:' placeholder='Social Media URL' width={5} onChange={this.onContactInfoChange} required/>
		} else {
			contact_method = ""
        }
		return (
			<div className="Form-container">
				<Form >
					<Form.Group>
					  <Form.Input label='Name' placeholder='Name' defaultValue= {this.props.name} width={5} onChange={this.onFirstNameChange} required/>
					</Form.Group>
					<Form.Group>
					  <Form.Input label='School' placeholder='School' width={5} onChange={this.onSchoolChange} required/>
					  <Form.Input label='Graduation Year' placeholder='Graduation Year' width={3} onChange={this.onGradYearChange} required/>
					</Form.Group>
					<Divider />
					<Form.Group>
					  <Form.Input label='Skill 1:' placeholder='Skill 1' width={5} onChange={this.onSkills1Change}/>
					  <Form.Input label='Skill 2:' placeholder='Skill 2' width={5} onChange={this.onSkills2Change}/>
					  <Form.Input label='Skill 3:' placeholder='Skill 3' width={5} onChange={this.onSkills3Change}/>
					</Form.Group>
					<Form.Group>
					  <Form.Field control={TextArea} label='About me:' placeholder='Tell us more about your experiences and interests...' width={15} onChange={this.onExperienceChange}/>
					</Form.Group>
					<Divider />
					<Form.Group>
					  <ContactDropdown contact={this.changeContact}/>
					</Form.Group>
					<Form.Group>
					  {contact_method}
					</Form.Group>
					<Divider />
					<Form.Group>
					  <Button onClick={this.onNextClick} className="save-button"> save </Button>
					</Form.Group>
					<Form.Group>
					  {this.state.error_message}
					</Form.Group>
				</Form>
			</div>
		);
    };
	onFirstNameChange = (e) => {
		this.setState({
			user_first_name: e.target.value
		});
	};

	onLastNameChange = (e) => {
		this.setState({
			user_last_name: e.target.value
		});
	};

	onSchoolChange = (e) => {
		this.setState({
			user_school: e.target.value
		});
	};

	onGradYearChange = (e) => {
		this.setState({
			user_grad_year: e.target.value
		});
	};

	onSkills1Change = (e) => {
		this.setState({
			user_skills_1: e.target.value
		});
	};

	onSkills2Change = (e) => {
		this.setState({
			user_skills_2: e.target.value
		});
	};

	onSkills3Change = (e) => {
		this.setState({
			user_skills_3: e.target.value
		});
	};

    onExperienceChange = (e) => {
        this.setState({
            user_experience: e.target.value
        });
    };

	onContactInfoChange = (e) => {
		this.setState({
			user_contact_info: e.target.value
		});
	};

	changeContact = (new_contact) => {
		this.setState({
			user_contact: new_contact
		})
	};

	onNextClick = () => {
		let cur_error
		if (this.state.name === "" || this.state.school === "" || this.state.grad_year === "" || this.state.contact === "" ) {
			cur_error = <Message
		      error
		      header='Some required fields left empty'
		      content='Make sure to fill in all starred fields'
		    />;
			this.setState({
				error_message: cur_error
			})
		} else {
	        let skills = [this.state.user_skills_1, this.state.user_skills_2, this.state.user_skills_3]
	        commitMutation(
	            environment,
	            {
	                mutation,
	                variables: {
	                    uuid: this.props.user_id,
	                    name: this.state.user_first_name + " " + this.state.user_last_name,
	                    grad_year: this.state.user_grad_year,
	                    school: this.state.user_school,
	                    contact: this.state.user_contact,
	                    skills: skills	,
						experience: this.state.user_experience,
	                }
	            }
	        )
			this.props.onNextClick('feed');
		}
	}
}

export default EditProfile
