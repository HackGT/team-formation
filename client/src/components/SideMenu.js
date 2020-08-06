import React, { Component } from 'react';
// import {Fuse} from 'fuse.js'
import { Dropdown, Input, Icon } from 'semantic-ui-react'
import './css/SideMenu.css'
import skills from '../constants/skills'
import schools from '../constants/schools'
import years from '../constants/years'


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

		const yearOptions = []
		for (const year in years) {
			const name = years[year].value;
			yearOptions.push(
				{key:name, text:name, value:name, onClick: (e,{value}) => this.props.allFilterClickListener(value, "years")}
			);
		}

		const schoolOptions = []
		for (const school in schools) {
			const name = schools[school].value;
			schoolOptions.push(
				{key:name, text:name, value:name, onClick: (e,{value}) => this.props.allFilterClickListener(value, "schools")}
			);
		}

		if (this.props.onTeamPage) {
			return (
				<div className="SideMenu-container">
					<Input placeholder="Search by Anything" onChange={this.onSearchChange} onKeyPress={this.handleKeyPress} icon={<Icon name='search' circular='true' link onClick={this.onSearchClick}/>} size='small' focus/>
					<h3 className="h3">SEEKING SKILLS</h3>
					<Dropdown id="dropdown" item text='Select Skills' search selection options={skillOptions} fullTextSearch="true" scrolling closeOnChange='false'/>
				</div>
			);
		}
		return (
			<div className="SideMenu-container">
				<Input placeholder="Search by Anything" onChange={this.onSearchChange} onKeyPress={this.handleKeyPress} icon={<Icon name='search' circular='true' link onClick={this.onSearchClick}/>} size='small' focus/>
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
		// this.props.onSearchClick(e.target.value);
	};

	onSearchClick = (e) => {
		this.props.onSearchClick(this.state.search_string);
	};
}

export default SideMenu;
