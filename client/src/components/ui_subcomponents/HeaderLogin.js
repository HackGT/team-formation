import React, { Component } from 'react';
import '../css/Headers.css';
import { Button, Menu } from 'semantic-ui-react';

class Headers extends Component {

	render() {
		return (
			<div className="Header-container">
				<div className="headers">
					<h1>HackGT</h1>
					<h2>Team Formation</h2>
				</div>
			</div>
		);
	}
}

export default Headers;
