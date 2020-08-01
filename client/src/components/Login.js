import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import './css/login-css/main.css';
import './css/login-css/util.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    Redirect
} from "react-router-dom";

class Login extends Component {
    constructor(props) {
        super(props);
		this.state = {
			user_id: "",
			data: {},
		};

        this.onFetchLogin().then(() => {
            var login_json = this.state.data;
            console.log(login_json)
            if (login_json.uuid) {
                console.log("here1")
                if (!login_json.school) {
                    console.log("here3")
                    this.props.onNextClick(login_json.uuid, login_json.visible);
                    return <Redirect to="/edit-profile" />
                } else {
                    console.log("here4")
                    // this.props.onNextClick(login_json.uuid, login_json.visible);
                    return <Redirect to="/feed/" />
                }
            } else {
                console.log("here")
            }
		});
    };

    render() {
        return (
            // <div className="Login-container">
			// 	<Button href = {"/api/user/login"}> Login </Button>
            //     <h3 id="login-message"> Participants must be confirmed for the Horizons event to access Team Formation</h3>
            // </div>
            <div class="limiter">
                <div class="container-login100">
                    <div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
                        <form class="login100-form validate-form" action="/api/user/login">
                            <span class="login100-form-title p-b-49">
                                HackGT
                            </span>

                            <span class="login100-form-title2 p-b-49">
                                Team Formation
                            </span>

                            <div class="container-login100-form-btn">
                                <div class="wrap-login100-form-btn">
                                    <div class="login100-form-bgbtn"></div>
                                    <button class="login100-form-btn" type="submit">
                                        Login with HackGT
                                    </button>
                                </div>
                            </div>

                            <div class="txt1 text-center p-t-54 p-b-20">
                                <span>
                                    This portal is only available to participants who have registered for HackGT!
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
		);
    };

    onFetchLogin = () => {
        console.log("here2")
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
