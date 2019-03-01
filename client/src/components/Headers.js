import React, { Component } from 'react';
import { Header } from 'semantic-ui-react'
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


/* const Headers= () => (
  <div>
    <Header as='h1'>HackGT</Header>
    <Header as='h2'>Team Formation</Header>
  </div>
) */

export default Headers
