import { graphql, QueryRenderer } from 'react-relay';
import React, { Component } from 'react';
import Login from './Login';
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
                onSignUpClick={this.onSignUpClick}
                onFeedChange={this.onProfileChange}/>;
		} else if (this.state.cur_state === 'setup-profile') {
			cur_display = <EditProfile
				onNextClick={this.onNextClick} user_id={this.state.user_id} name={this.state.name} email={this.state.email}
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
    onProfileChange = (id, name, email) => {
        this.setState({cur_state: 'setup-profile', user_id: id, name: name, email: email});
    };
}


export default Content
