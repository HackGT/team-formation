import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react'

class YearDropdown extends Component {
	render() {
		return(
			<div className="YearDropdown-container">
			<Dropdown text='Year'>
				<Dropdown.Menu>
				  <Dropdown.Item text='1st' />
				  <Dropdown.Item text='2nd' />
				  <Dropdown.Item text='3rd' />
				  <Dropdown.Item text='4th' />
				  <Dropdown.Item text='5th' description='or older' />
				</Dropdown.Menu>
			</Dropdown>
			</div>
		);
	}
}

export default YearDropdown
