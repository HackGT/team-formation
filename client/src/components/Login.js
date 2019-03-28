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
		loading: false,
		error_message: "",
		data: {},
	};

	render() {
		let is_loading;
		if (this.state.loading) {
			is_loading = <Loading/>;
		}
		return (
			<div className="Login-container">
				<Form method="POST"  onSubmit={this.onSubmitClick}>
					<Form.Field className = "input-box">
						<label>email</label>
						<input name = 'email' placeholder='email' value={this.state.email} onChange={this.onEmailChange}/>
					</Form.Field>
					<Form.Field className = "input-box">
						<label>password</label>
						<input name = 'password' type='password' placeholder='password' value={this.state.password} onChange={this.onPasswordChange}/>
					</Form.Field>
					<div className="login-button">
                        <Button type="submit">Submit</Button>
                    </div>


				</Form>
				<div>{this.state.error_message}</div>
				<div>{is_loading}</div>
                <div className="login-button">
                    <Button type="submit" onClick={this.onSignUpClick}>Sign Up</Button>
                </div>
			</div>

		);
	}
    onSubmitClick = (e) => {
        e.preventDefault();
        this.onNextClick('feed');

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
			loading: true,
			error_message: ""
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
					error_message: "Wrong email or password!",
					loading: false
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
        console.log("okok" + data.email)
        var form_data = new FormData();

        for ( var key in data ) {
            form_data.append(key, data[key]);
        }
        const data_encoded = new URLSearchParams();
        for (const pair of form_data) {
            data_encoded.append(pair[0], pair[1]);
        }
        console.log()
		return fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: data_encoded,
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
