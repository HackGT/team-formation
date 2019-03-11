import React, {Component} from 'react'
import { Input } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'
import './css/EditProfile.css'

class EditProfile extends Component {
	render() {
		return (
			<div className="EditProfile-container">
				<h2 className="page-title">Your Profile</h2>
				<div><Input placeholder={'first name'} className="input-box"/></div>
				<div><Input placeholder={'last name'} className="input-box"/></div>
				<div><Input placeholder={'secondary email (optional)'} className="input-box"/></div>
				<div><Input placeholder={'school'} className="input-box"/></div>
				<div><Input placeholder={'year'} className="input-box"/></div>
				<div><Input placeholder={'skills'} className="input-box"/></div>
				<div><Input placeholder={'interest'} className="input-box"/></div>
				<div><Input placeholder={'experience'} className="input-box-1"/></div>
				<div><Input placeholder={'website (optional)'} className="input-box-1"/></div>
				<Button onClick={this.onNextClick} className="save-button"> save </Button>
			</div>
		);

	};

	onNextClick = () => {
		this.props.onNextClick('feed');
	}
}

export default EditProfile
