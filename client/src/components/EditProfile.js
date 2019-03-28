import React, {Component} from 'react';
import { Input } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import { Form } from 'semantic-ui-react';
import Loading from './ui_subcomponents/Loading';
import YearDropdown from './ui_subcomponents/YearDropdown';
import './css/EditProfile.css'
import {commitMutation } from 'react-relay';
import {graphql} from 'babel-plugin-relay/macro';

`
`

class EditProfile extends Component {
	render() {
		return (
			<div className="EditProfile-container">
				<h2 className="page-title">Your Profile</h2>
				<div><p className="input-name">First Name:</p> <Input placeholder={'first name'} className="input-name"/>
				<p className="input-name">Last Name:</p><Input placeholder={'last name'} className="input"/></div>

				<div><p className="input-school">School:</p><Input placeholder={'school'} className="input-school"/>
				<YearDropdown/></div>

				<div><div><p className="input-label">Skills:</p><Input placeholder={'skills'} className="input-box"/></div>
				<div><p className="input-label">Interests:</p><Input placeholder={'interest'} className="input-box"/></div>
				<div><p className="input-label">Experience:</p><Input placeholder={'experience'} className="input-box"/></div></div>

				<div><p className="input-label">Method of contact (facebook, email, phone...):</p><Input placeholder={'secondary email (optional)'} className="input-box"/></div>
				<div><p className="input-label">Personal Website (optional):</p><Input placeholder={'website (optional)'} className="input-box"/></div>
				<Button onClick={this.onNextClick} className="save-button"> save </Button>
			</div>
		);
	};

	onNextClick = () => {
		this.props.onNextClick('feed');
	}
}

export default EditProfile
