import React, { Component } from 'react';
import { Dropdown, Icon, Input, Menu, Button } from 'semantic-ui-react'

class SideMenu extends Component {
	constructor() {
		super();
		this.state = {
			search_string: ""
		}
	}

	render() {
		return (
			<div className="SideMenu-container">
				<Input placeholder="Search..." onChange={this.onSearchChange}/>
				<Button icon onClick={this.onSearchClick}>
    				<Icon name='search' />
  				</Button>
			</div>
		);
	}

	onSearchChange = (e) => {
		this.setState({
			search_string: e.target.value
		})
	}

	onSearchClick = (e) => {
		this.props.onSearchClick(this.state.search_string)
	}
}

export default SideMenu
