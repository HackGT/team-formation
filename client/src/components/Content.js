import { graphql, QueryRenderer } from 'react-relay';
import React, { Component } from 'react';
import Login from './Login';
import SignUp from './SignUp';
import EditProfile from './EditProfile';
import Feed from './Feed'

class Content extends Component {
	state = {
		cur_state: 'login',
        user_id: ''
	};

	render() {
		let cur_display;
		if (this.state.cur_state === 'login') {
			cur_display = <Login
				onNextClick={this.onNextClick}
				onSignUpClick={this.onSignUpClick}/>;
		} else if (this.state.cur_state === 'signup') {
			cur_display = <SignUp
				onNextClick={this.onNextClick}
                onFeedChange={this.onProfileChange}/>;
		} else if (this.state.cur_state === 'setup-profile') {
			cur_display = <EditProfile
				onNextClick={this.onNextClick} user_id={this.state.user_id}
                />;
		} else if (this.state.cur_state === 'feed') {
			cur_display = <Feed/>;
		}
		return (
			<div className="Content-container">
				<div>{cur_display}</div>
			</div>
		);
	}

	onNextClick = (next_action) => {
		this.setState({cur_state: next_action});
	};
    onProfileChange = (id) => {
        this.setState({cur_state: 'setup-profile', user_id: id});
    };

	onSignUpClick = () => {
		this.setState({cur_state: 'signup'})
	}
}


export default Content
