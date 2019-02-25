import React, {Component} from 'react'
import { Input } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'

class PasswordInput extends Component {
	render() {
		return (
			<div className="PasswordInput-container">
				<Input placeholder='password'/>
				<Input placeholder='confirm password'/>
				<Button onClick={this.onNextClick}> next </Button>
			</div>
		)
	}

	onNextClick = () => {
		this.props.onNextClick('setup-profile');
	};
}

export default PasswordInput
