import React, { Component } from 'react';
import { Input, Form, Checkbox } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react';
import './css/Login.css';
import Loading from './ui_subcomponents/Loading'

class Login extends Component {

	state = {
		user_email: "",
		user_password: "",
		user_id: "",
		is_loading: false,
		error_message: "",
		data: {},
	};

	render() {
		let cur_message;
		if (this.state.is_loading) {
			cur_message = <Loading/>;
		}
		return (
			<div className="Login-container">
				<Form method="POST" action="http://localhost:3001/api/user/login">
					<Form.Field className = "input-box">
						<label>email</label>
						<input  name = 'email' placeholder='email' />
					</Form.Field>
					<Form.Field className = "input-box">
						<label>password</label>
						<input name = 'password' placeholder='password' />
					</Form.Field>
					<div className="login-button"><Button type='submit'>Submit</Button></div>
				</Form>
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
			is_loading: true
		});
		var login_url = "http://localhost:3001/api/user/login";
		var login_data = {
			email: this.state.user_email,
			password: this.state.user_password
		};
		this.onFetchLogin(login_url, login_data).then(() => {
			var login_json = this.state.data;
			console.log(login_json);
			if (login_json.success === false) {
				this.setState({
					error_message: "Wrong email or password!"
				})
			} else if (login_json.success === true){
				this.setState({
					is_loading: true
				})
				this.props.onNextClick('feed');
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
