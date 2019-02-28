import React, { Component } from 'react';
import { Input } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'
import './css/EmailInput.css'

class EmailInput extends Component {

	render() {
		let cur_display = 'password-input';
		return (
			<div className="EmailInput-container">
				<Input placeholder={'email'}/>
				<Button onClick={this.onNextClick}> next </Button>
			</div>
		);
	}

	onNextClick = () => {
		this.props.onNextClick('password-input');
	};
}


export default EmailInput
