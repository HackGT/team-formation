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
                    this.props.onFeedChange(login_json.uuid, login_json.name, login_json.email);
                    this.props.onNextClick('setup-profile', login_json.uuid);
                } else {
                    this.props.onNextClick('feed', login_json.uuid);
                }
            }
		});
    }

    render() {
        return (
            <div className="Login-container">
                <h3> Confirming attendance for Horizons is necessary to use the platform. Login will not work without participant's confirming their attendance </h3>
				<Button href = {process.env.REACT_APP_SERVER_URL}> Login </Button>
            </div>
		)
    }

    onFetchLogin = () => {
        return fetch(process.env.REACT_APP_SERVER_URL + '/api/user/check', {
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
    }
}


export default Login;
