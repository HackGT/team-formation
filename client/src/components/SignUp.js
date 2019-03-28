import React, {Component} from 'react';
import { Input } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import './css/SignUp.css';
import Loading from './ui_subcomponents/Loading';

class SignUp extends Component {

	state = {
		user_email: "",
		user_password: "",
		user_password_confirm: "",
		error_message: "",
		loading: false,
		data: {},
	};

	render() {
		let is_loading;
		if (this.state.loading) {
			is_loading = <Loading/>;
		}
		return (
			<div className="PasswordInput-container">
				<div><Input placeholder='Email' onChange={ (e) => this.onEmailChange(e) } className="email-box1"/></div>
				<div><Input placeholder='Password' type="password" onChange={ (e) => this.onPasswordChange(e) } className="password-box1"/></div>
				<div><Input placeholder='Confirm Password' type="password" onChange={ (e) => this.onPasswordConfirmChange(e) } className="password-box2"/></div>
				<div>{this.state.error_message}</div>
				<div>{is_loading}</div>
				<div className="button-container"><Button onClick={this.onNextClick}> Next </Button></div>
			</div>
		)
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

	onPasswordConfirmChange = (e) => {
		this.setState({
			user_password_confirm: e.target.value
		});
	};

	onNextClick = () => {
		this.setState({
      		loading: true
		})

		var signup_url = "http://localhost:3001/api/user/signup"
		var signup_data = {
			email: this.state.user_email,
			password: this.state.user_password,

		}
		var password_boolean = this.state.user_password === this.state.user_password_confirm;
		if (password_boolean) {
			this.onFetchSignUp(signup_url, signup_data).then(() => {
				var signup_json = this.state.data;
				if (signup_json.success === false) {
					this.setState({
						error_message: "Invalid Email or Password",
						loading: false
					});
				} else if (signup_json.success === true) {
					this.props.onFeedChange(signup_json.id);
				}
			});
		} else {
			this.setState({
				error_message: "Passwords do not match!",
				loading: false
			});
		}
	};

	onFetchSignUp = (url, data) => {
        var form_data = new FormData();

        for ( var key in data ) {
            form_data.append(key, data[key]);
        }
        const data_encoded = new URLSearchParams();
        for (const pair of form_data) {
            data_encoded.append(pair[0], pair[1]);
        }
		return fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: data_encoded,
		})
		.then(response => response.json())
		.then(response => {
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

export default SignUp;
