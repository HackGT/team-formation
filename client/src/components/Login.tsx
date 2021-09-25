import React, {Component} from 'react';
import {Button} from 'semantic-ui-react';
import './css/login-css/main.css';
import './css/login-css/util.css';

interface states {
    user_id: string,
    data: object,
    redirect: string
};

class Login extends Component<{}, states> {
    constructor() {
        super({});
        this.state = {
            user_id: "",
            data: {},
            redirect: ""
        };

    };

    render() {
        // const { redirect } = this.state;
        // console.log("redirect: ", redirect)
        // if (redirect ==  "feed") {
        //     console.log("redirect to feed");
        //     return <Redirect to="/feed/" />;
        // } else if (redirect == "edit-profile") {
        //     console.log("redirect to edit profile");
        //     return <Redirect to="/edit-profile/" />
        // }
        return (
        // <div className="Login-container">
        // 	<Button href = {"/api/user/login"}> Login </Button>
        //     <h3 id="login-message"> Participants must be confirmed for the Horizons event to access Team Formation</h3>
        // </div>
        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
                    <form className="login100-form validate-form" action="/api/user/login">
                        <span className="login100-form-title p-b-49">
                            HackGT
                        </span>

                        <span className="login100-form-title2 p-b-49">
                            Team Formation
                        </span>

                        <div className="container-login100-form-btn">
                            <div className="wrap-login100-form-btn">
                                <div className="login100-form-bgbtn"></div>
                                <button className="login100-form-btn" type="submit">
                                    Login with HackGT
                                </button>
                            </div>
                        </div>

                        <div className="txt1 text-center p-t-54 p-b-20">
                            <span>
                                This portal is only available to participants who are confirmed for HealthTech! Please contact hello@hack.gt if you encounter any issues
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>);
    };

};

export default Login;
