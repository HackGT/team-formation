import React, { Component } from 'react';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import EditProfile from './EditProfile';
import Feed from './Feed'

class Content extends Component {
	state = {
		cur_state: 'email-input',
	};

	render() {
		const cur_state = this.props.content;
		let cur_display;
		if (this.state.cur_state == 'email-input') {
			cur_display = <EmailInput
				onNextClick={this.onNextClick}/>;
		} else if (this.state.cur_state == 'password-input') {
			cur_display = <PasswordInput
				onNextClick={this.onNextClick}/>;
		} else if (this.state.cur_state == 'setup-profile') {
			cur_display = <EditProfile
				onNextClick={this.onNextClick}/>;
		} else if (this.state.cur_state == 'feed') {
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
}


export default Content
