import React, { Component } from 'react';
import { Loader } from 'semantic-ui-react'
import '../css/Loading.css';


class Loading extends Component {
	render() {
		return(
			<div className="loader-container">
				<Loader active inline='centered' className="loader-spinner" />
				<center><p>Loading</p></center>
			</div>
		);
	}
}

export default Loading
