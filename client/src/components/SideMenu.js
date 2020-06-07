import React, { Component } from 'react';
// import {Fuse} from 'fuse.js'
import { Dropdown, Input } from 'semantic-ui-react'
import Search from './Search'
import './css/SideMenu.css'

// export default class SideMenu extends Component {
	

// 	state = {
// 		searchTerm: ""
// 	}
	
// 	render() {
// 	// const { } = this.state
// 		return (
// 			<div>
// 			<Search
// 				searchTerm={this.props.searchTerm}
// 				searchListener={this.props.searchListener}
// 				searchSubmitListener={this.props.searchSubmitListener}
// 			/>
// 			<Dropdown item text='Skills'>
// 				<Dropdown.Menu>
// 				<Dropdown.Item text='React' value='react' onClick={(e,data) => this.props.allFilterClickListener(data.value, "skills")}/>
// 				<Dropdown.Item text='Angular' value='angular' onClick={(e,data) => this.props.allFilterClickListener(data.value, "skills")}/>
// 				<Dropdown.Item text='GraphQL' value='graphql' onClick={(e,data) => this.props.allFilterClickListener(data.value, "skills")}/>
// 				<Dropdown.Item text='NodeJS' value='nodejs' onClick={(e,data) => this.props.allFilterClickListener(data.value, "skills")}/>
// 				<Dropdown.Item text='HTML' value='html' onClick={(e,data) => {
// 					this.props.allFilterClickListener(data.value, "skills")}}/>
// 				</Dropdown.Menu>
// 			</Dropdown>
// 			</div>
// 		)
// 	}
// }

class SideMenu extends Component {
	constructor() {
		super();
		this.state = {
			search_string: ""
		};
	};

	doOnClick = (e, {value}) => {
		this.props.allFilterClickListener(value, "skills")
	}

	render() {
		const skillOptions = [
			{key:'react', text:'React', value:'react', onClick: (e,{value}) => this.props.allFilterClickListener(value, "skills")},
			{key:'angular', text:'Angular', value:'angular', onClick: (e,{value}) => this.props.allFilterClickListener(value, "skills")},
			{key:'graphql', text:'GraphQL', value:'graphql', onClick: (e,{value}) => this.props.allFilterClickListener(value, "skills")},
			{key:'nodejs', text:'NodeJS', value:'nodejs', onClick: (e,{value}) => this.props.allFilterClickListener(value, "skills")},
			{key:'html', text:'HTML', value:'html', onClick: (e,{value}) => this.props.allFilterClickListener(value, "skills")}
			// {key:'reacta', text:'React1', value:'reacta'},
			// {key:'angular1jbgh', text:'Angular1', value:'angularhjbh'},
			// {key:'graphqlhb', text:'GraphQLbjh', value:'graphqljb'},
			// {key:'nodejsbb', text:'NodeJS1', value:'nodejsbhy'},
			// {key:'htmlbh', text:'HTML1', value:'htmlgb'},
			// {key:'reacth', text:'React2', value:'reactuj'},
			// {key:'angularbh', text:'Angular2', value:'angulardf'},
			// {key:'graphqlsd', text:'GraphQL2', value:'graphqldf'},
			// {key:'nodejshg', text:'NodeJS2', value:'nodejsgbb'},
			// {key:'htmlk', text:'HTML2', value:'htmlhhnn'},
			// {key:'reactjn', text:'React', value:'reacthnn'},
			// {key:'angularyh', text:'Angular', value:'angularhhn'},
			// {key:'graphqlfv', text:'GraphQL', value:'graphqlkj'},
			// {key:'nodejsk', text:'NodeJS', value:'nodejsik'},
			// {key:'htmlol', text:'HTML', value:'htmlgb'},
			// {key:'reactgb', text:'React', value:'reacthhnn'},
			// {key:'angularvb', text:'Angular', value:'angularhn'},
			// {key:'graphqlbgb', text:'GraphQL', value:'graphqljk'},
			// {key:'nodejsgb', text:'NodeJS', value:'nodejsk'},
			// {key:'htmldc', text:'HTML', value:'htmlln'}
		]
		return (
			<div className="SideMenu-container">
				<Input placeholder="Search by skills" onChange={this.onSearchChange} onKeyPress={this.handleKeyPress} icon='search' size='huge'/>
				<h3 className="h3">Skills</h3>
				<Dropdown id="dropdown" item text='Select' search selection options={skillOptions} fullTextSearch="true" scrolling closeOnChange='false'/>
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
