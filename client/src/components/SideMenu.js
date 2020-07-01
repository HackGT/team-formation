import React, { Component } from 'react';
// import {Fuse} from 'fuse.js'
import { Dropdown, Input } from 'semantic-ui-react'
import './css/SideMenu.css'
import skills from '../constants/skills'
import schools from '../constants/schools'


class SideMenu extends Component {
	constructor() {
		super();
		this.state = {
			search_string: ""
		};
	};

	render() {
		const skillOptions = []
		for (const skill in skills) {
			const name = skills[skill].value;
			skillOptions.push(
				{key:name, text:name, value:name, onClick: (e,{value}) => this.props.allFilterClickListener(value, "skills")}
			);
		}

		const years = ['First', 'Second','Third','Fourth', 'Fifth'];
		const yearOptions = []
		for (const year of years) {
			yearOptions.push(
				{key:year, text:year, value:year, onClick: (e,{value}) => this.props.allFilterClickListener(value, "years")}
			);
		}

		const schoolOptions = []
		for (const school in schools) {
			const name = schools[school].value;
			schoolOptions.push(
				{key:name, text:name, value:name, onClick: (e,{value}) => this.props.allFilterClickListener(value, "schools")}
			);
		}

		return (
			<div className="SideMenu-container">
				<Input placeholder="Search by skills" onChange={this.onSearchChange} onKeyPress={this.handleKeyPress} icon={{ name: 'search', circular: true}} size='small'/>
				<h3 className="h3">SKILLS</h3>
				<Dropdown id="dropdown" item text='Select Skills' search selection options={skillOptions} fullTextSearch="true" scrolling closeOnChange='false'/>
				<h3 className="h3">YEARS</h3>
				<Dropdown item text='Select Years' search selection options={yearOptions} fullTextSearch="true" scrolling closeOnChange='false'/>
				<h3 className="h3">SCHOOLS</h3>
				<Dropdown item text='Select Schools' search selection options={schoolOptions} fullTextSearch="true" scrolling closeOnChange='false'/>
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
