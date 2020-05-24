import React, { Component } from 'react';
import { Icon, Input, Button } from 'semantic-ui-react';
import {Fuse} from 'fuse.js'
class SideMenu extends Component {
	constructor() {
		super();
		this.state = {
			search_string: ""
		};
	};

	render() {
		return (
			<div className="SideMenu-container">
                <Input placeholder="Search by skills" onChange={this.onSearchChange} onKeyPress={this.handleKeyPress} size='massive' icon='search' />
			</div>
		);
    };

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.props.onSearchClick(this.state.search_string);
        }
    };

	onSearchChange = (e) => {
		this.setState({
			search_string: e.target.value
		});
		if(e.target.value.length > 0) {
			this.props.onSearchClick(this.state.search_string);
		}
	};

	onSearchClick = (e) => {
		this.props.onSearchClick(this.state.search_string);
	};
}

export default SideMenu;
