import { graphql, QueryRenderer } from 'react-relay';
import React, { Component } from 'react';
import Login from './Login';
import EditProfile from './EditProfile';
import Feed from './Feed'
import HeaderLogin from './HeaderLogin'
import HeaderFeed from './HeaderFeed'
import HeaderEditProfile from './HeaderEditProfile'
import './css/Content.css';

class Content extends Component {
	state = {
		cur_state: 'login',
        user_id: ''
	};

	render() {
		let cur_display;
		let cur_header;
		if (this.state.cur_state === 'login') {
			cur_header = <HeaderLogin/>
			cur_display = <Login
				onNextClick={this.onNextClick}
                onSignUpClick={this.onSignUpClick}
                onFeedChange={this.onProfileChange}/>;
		} else if (this.state.cur_state === 'setup-profile') {
			cur_header = <HeaderEditProfile/>
			cur_display = <EditProfile
				onNextClick={this.onNextClick} user_id={this.state.user_id} name={this.state.name} email={this.state.email}
                />;
		} else if (this.state.cur_state === 'feed') {
			cur_header = <HeaderFeed onEditClick={this.onEditClick}/>
			cur_display = <Feed/>;
		}
		return (
			<div className="Content-container">
				<div> {cur_header} </div>
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
	onEditClick = () => {
		this.setState({
			cur_state: 'setup-profile'
		})
	}
}


export default Content
