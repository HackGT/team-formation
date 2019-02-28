import React, {Component} from 'react'
import { Input } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'
import './css/SignUp.css'

class SignUp extends Component {
	render() {
		return (
			<div className="PasswordInput-container">
				<div><Input placeholder='Email' className="email-box1"/></div>
				<div><Input placeholder='Password' className="password-box1"/></div>
				<div><Input placeholder='Confirm Password' className="password-box2"/></div>
				<Button onClick={this.onNextClick}> Next </Button>
			</div>
		)
	}

	onNextClick = () => {
		this.props.onNextClick('setup-profile');
	};
}

export default SignUp
