import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import './css/Login.css';

class Login extends Component {

	state = {
		user_email: "",
		user_id: "",
	};

	render() {
		let cur_display = 'password-input';
		return (
			<div className="Login-container">
				<div><Input placeholder={'Email'} className="input"/></div>
				<div><Input placeholder={'Password'} className="input"/></div>
				<div>
					<div><Button onClick={this.onNextClick}> Next </Button></div>
					<div className="sign-up"><Button onClick={this.onSignUpClick}> Sign Up </Button></div>
				</div>
			</div>
		);
	}

	onNextClick = () => {
		this.props.onNextClick('feed');
	};

	onSignUpClick = () => {
		this.props.onSignUpClick();
	}
}


export default Login;
