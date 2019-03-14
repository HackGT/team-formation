import React, { Component } from 'react';
import { Loader } from 'semantic-ui-react'
import '../css/Loading.css';

class Loading extends Component {
	render() {
		return(
			<div className="loader-container">
				<Loader active inline='centered' className="loader-spinner" />
				<p>Loading</p>
			</div>
		);
	}
}

export default Loading
