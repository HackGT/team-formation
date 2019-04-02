import React, {Component} from 'react';
import { Input } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import { Form } from 'semantic-ui-react';
import Loading from './ui_subcomponents/Loading';
import YearDropdown from './ui_subcomponents/YearDropdown';
import './css/EditProfile.css'
import {commitMutation } from 'react-relay';
import {graphql} from 'babel-plugin-relay/macro';
import environment from './Environment'
import ValidatorForm, {TextValidator} from 'react-form-validator-core';
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
    email
    grad_year
    school
    skills
    experience
    contact
  }
}
`;

class EditProfile extends Component {

	state = {
		user_first_name: "",
		user_last_name: "",
		user_school: "",
		user_grad_year: "",
		user_skills_1: "",
		user_skills_2: "",
		user_skills_3: "",
        user_experience: "",
        user_secondary_email: "",
        user_contact: ""
	}

	render() {
		return (
			<div className="EditProfile-container">
				<h2 className="page-title">Your Profile</h2>
				<div><p className="input-name">First Name:</p> <Input placeholder={'first name'} className="input-name" onChange={this.onFirstNameChange}/>
				<p className="input-name">Last Name:</p><Input placeholder={'last name'} className="input" onChange={this.onLastNameChange}/></div>
				<div><p className="input-label">Secondary Eamil:</p><Input placeholder={'test@gmail.com'} className="input-label" onChange={this.onEmailChange}/></div>
				<div><p className="input-school">School:</p><Input placeholder={'school'} className="input-school" onChange={this.onSchoolChange}/></div>
				<div><p className="input-label">Graduation Year:</p><Input placeholder={'graduation year'} className="input-school" onChange={this.onGradYearChange}/></div>

				<div><div><p className="input-label">Skill 1:</p><Input placeholder={'skill 1'} className="input-box" onChange={this.onSkills1Change}/></div>
				<div><p className="input-label">Skill 2:</p><Input placeholder={'skill 2'} className="input-box" onChange={this.onSkills2Change}/></div>
				<div><p className="input-label">Skill 3:</p><Input placeholder={'skill 3'} className="input-box" onChange={this.onSkills3Change}/></div>
				<div><p className="input-label">Experience:</p><Input placeholder={'experience'} onChange={this.onExperienceChange} className="input-box"/></div></div>

				<div><p className="input-label">Method of contact (facebook, email, phone...):</p><Input placeholder={'method of contact'} className="input-box" onChange={this.onContactChange}/></div>
				<Button onClick={this.onNextClick} className="save-button"> save </Button>
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

    onEmailChange = (e) => {
        this.setState({
            user_secondary_email: e.target.value
        });
    };


	onNextClick = () => {
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
                    skills: skills,
                    experience: this.state.experience,
                }
            }
        )
		this.props.onNextClick('feed');
	}
}

export default EditProfile
