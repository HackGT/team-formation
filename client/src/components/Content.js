import React, { Component } from 'react';
import Login from './Login';
import EditProfile from './EditProfile';
import Feed from './Feed';
import HeaderLogin from './ui_subcomponents/HeaderLogin';
import HeaderFeed from './ui_subcomponents/HeaderFeed';
import TeamPage from './TeamPage';
import HeaderEditProfile from './ui_subcomponents/HeaderEditProfile';
import './css/Content.css';

class Content extends Component {
	constructor() {
		super()
		this.state = {
			cur_state: 'login',
						user_id: '',
						team_id: '',
            visible: 0
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
			cur_header = <HeaderFeed onEditClick={this.onEditClick} user_id={this.state.user_id} visible={this.state.visible} onNextClick={this.onNextClick} />;
			cur_display = <EditProfile
				onNextClick={this.onDoneEditClick}
				user_id={this.state.user_id}
                />;
		} else if (this.state.cur_state === 'feed') {
				cur_header = <HeaderFeed onEditClick={this.onEditClick} user_id={this.state.user_id} visible={this.state.visible} onNextClick={this.onNextClick} />;
				cur_display = <Feed user_id={this.state.user_id} onTeamPageClick={this.onTeamPageClick} />;
		} else if (this.state.cur_state == 'team-page') {
				cur_header = <HeaderFeed onEditClick={this.onEditClick} user_id={this.state.user_id} visible={this.state.visible} onNextClick={this.onNextClick} />;
				cur_display = <TeamPage user_id={this.state.user_id} team_id={this.state.team_id} />;
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
    }
    onDoneEditClick = (next_action, id) => {
		this.setState({
			cur_state: next_action,
            user_id: id
		});
	};

  onNextClick = (next_action, id, visible) => {
    this.setState({
      cur_state: next_action,
      user_id: id,
      visible: visible,
    });
  };

	onTeamPageClick = (team_id) => {
		this.setState({
			cur_state: 'team-page',
			team_id: team_id
		});
	}

	onNextClick = (next_action, id, visible) => {
		this.setState({
			cur_state: next_action,
            user_id: id,
            visible: visible
		});
    };


}

export default Content;
