import React, { Component } from 'react';
import './css/Headers.css'

class Headers extends Component {


	render() {
		return (
			<div className="Header-container">
				<h1>HackGT</h1>
				<h2>{this.props.subHeader}</h2>
			</div>
		);
	}
}

export default Headers
