import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import './css/Login.css';

class Login extends Component {

	state = {
		user_email: "",
		user_password: "",
		user_id: "",
		error_message: "",
		data: {},
	};

	render() {
		return (
			<div className="Login-container">
				<div><Input placeholder={'Email'} onChange={ (e) => this.onEmailChange(e) } className="input"/></div>
				<div><Input placeholder={'Password'} onChange={ (e) => this.onPasswordChange(e) } className="input"/></div>
				<div><h3 className="error-message">{this.state.error_message}</h3></div>
				<div>
					<div><Button onClick={this.onNextClick}> Next </Button></div>
					<div className="sign-up"><Button onClick={this.onSignUpClick}> Sign Up </Button></div>
				</div>
			</div>
		);
	}

	onEmailChange = (e) => {
		this.setState({
			user_email: e.target.value
		});
	};

	onPasswordChange = (e) => {
		this.setState({
			user_password: e.target.value
		});
	};

	onNextClick = () => {
		this.setState({
			error_message: "Loading...",
		});
		var login_url = "http://localhost:3001/api/user/login";
		var login_data = {
			email: this.state.user_email,
			password: this.state.user_password
		};
		this.onFetchLogin(login_url, login_data).then(() => {
			var login_json = this.state.data;
			console.log(login_json);
			// if (login_json.success === false) {
			// 	this.setState({
			// 		error_message: "Wrong email or password!"
			// 	});
			// } else
			if (login_json.success === true){
				this.props.onNextClick('feed');
			} else {
				this.setState({
					error_message: "Wrong email or password!"
				});
			}
		});
	};

	onSignUpClick = () => {
		this.props.onSignUpClick();
	}

	componentDidMount() {

	}

	onFetchLogin = (url, data) => {
		return fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
		.then(response => response.json())
		.then(response => {
			console.log(response);
			return new Promise((resolve, reject) => {
				var data = {
					success: response.success,
					id: response.id,
				};
				this.setState({data: data}, function() {
					resolve();
					console.log(this.state.data);
				});
			});
		});


	};

}


export default Login;
