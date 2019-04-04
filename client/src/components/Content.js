import React, { Component } from 'react';
import Login from './Login';
import EditProfile from './EditProfile';
import Feed from './Feed';
import HeaderLogin from './ui_subcomponents/HeaderLogin';
import HeaderFeed from './ui_subcomponents/HeaderFeed';
import HeaderEditProfile from './ui_subcomponents/HeaderEditProfile';
import './css/Content.css';

class Content extends Component {
	constructor() {
		super()
		this.state = {
			cur_state: 'login',
			user_id: ''
		};
	};

	render() {
		let cur_display;
		let cur_header;
		if (this.state.cur_state === 'login') {
			cur_header = <HeaderLogin/>;
			cur_display = <Login
				onNextClick={this.onNextClick}
                onFeedChange={this.onProfileChange}/>;
		} else if (this.state.cur_state === 'setup-profile') {
			cur_header = <HeaderEditProfile/>;
			cur_display = <EditProfile
				onNextClick={this.onNextClick}
				user_id={this.state.user_id}
                />;
		} else if (this.state.cur_state === 'feed') {
			cur_header = <HeaderFeed onEditClick={this.onEditClick}/>;
			cur_display = <Feed/>;
		}
		return (
			<div className="Content-container">
				<div> {cur_header} </div>
				<div>{cur_display}</div>
			</div>
		);
	};

	onEditClick = () => {
		this.setState({
			cur_state: 'setup-profile'
        });
	};

	onNextClick = (next_action, id) => {
		this.setState({
			cur_state: next_action,
			user_id: id
		});
	};
};


export default Content;
