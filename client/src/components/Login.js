import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import './css/Login.css';

class Login extends Component {
    constructor(props) {
        super(props);
		this.state = {
			user_id: "",
			data: {},
		};

        this.onFetchLogin().then(() => {
            var login_json = this.state.data;
            if (login_json.uuid) {
                if (!login_json.school) {
                    this.props.onNextClick('setup-profile', login_json.uuid, login_json.visible);
                } else {
                    this.props.onNextClick('feed', login_json.uuid, login_json.visible);
                }
            }
		});
    };

    render() {
        return (
            <div className="Login-container">
				<Button href = {"/api/user/login"}> Login </Button>
                <h3 id="login-message"> Participants must be confirmed for the Horizons event to access Team Formation</h3>
            </div>
		);
    };

    onFetchLogin = () => {
        return fetch('/api/user/check', {
            method: "GET",
            credentials: "include"
        })
        .then(response => {
			return response.json();
        })
            .then(response => {
            return new Promise((resolve, reject) => {
                this.setState({data: response, user_id: response.uuid}, function() {
                    resolve();
                });
            });
        });
    };
};

export default Login;
