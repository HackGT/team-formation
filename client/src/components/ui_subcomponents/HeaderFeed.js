import React, { Component } from 'react';
import '../css/Headers.css';
import { Button, Menu } from 'semantic-ui-react';

class Headers extends Component {
	render() {
		return (
			<div className="Header-container">
				<div className="logout-button">
					<Menu>
						<Menu.Item>
							<Button className="edit-button" onClick={this.props.onEditClick}> Edit Profile </Button>
						</Menu.Item>
						<Menu.Item>
							<Button  href={'/api/user/logout'} className="logout-button"> Logout </Button>
						</Menu.Item>
					</Menu>
				</div>

				<div className="headers">
					<h1>HackGT</h1>
					<h2>Team Formation</h2>
				</div>
			</div>
		);
	};
};

export default Headers;
