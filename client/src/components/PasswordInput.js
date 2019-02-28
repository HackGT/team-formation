import React, {Component} from 'react'
import { Input } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'
import './css/PasswordInput.css'

class PasswordInput extends Component {
	render() {
		return (
			<div className="PasswordInput-container">
				<div><Input placeholder='password' className="password-box1"/></div>
				<div><Input placeholder='confirm password' className="password-box2"/></div>
				<Button onClick={this.onNextClick}> next </Button>
			</div>
		)
	}

	onNextClick = () => {
		this.props.onNextClick('setup-profile');
	};
}

export default PasswordInput
