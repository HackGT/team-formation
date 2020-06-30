import React, { Component } from 'react';
import FeedTeamCards from './FeedTeamCards';
import FeedCards from './FeedCards';
<<<<<<< HEAD
import SideMenu from './SideMenu';
import { Button, Grid } from 'semantic-ui-react';
import { setState } from 'semantic-ui-react';
=======
import Members from './Members';
import SideMenu from './SideMenu';
import InputTagCollection from './InputTagCollection'
>>>>>>> origin/master
import './css/Feed.css';
import TeamInformation from './TeamInformation'

class Feed extends Component {
<<<<<<< HEAD

    constructor(props){
        super(props)
        this.state = {
			displayTeams: false,
			individuals: true,
			teams: false
		};
	};


    render() {
		var cards = this.state.displayTeams ? <FeedTeamCards skill={this.state.skill} user_id={this.props.user_id} /> : <FeedCards skill={this.state.skill} user_id={this.props.user_id} />
		return (<div className="Feed-container">
			<Grid>
				<Grid.Column textAlign="center">
					<Button.Group>
						<Button id="user" onClick={() => this.setState({displayTeams: false, individuals: true, teams: false})} basic={!this.state.individuals} color='blue'>Individuals</Button>
						<Button.Or />
						<Button id="team" onClick={() => this.setState({displayTeams: true, individuals: false, teams: true})} basic={!this.state.teams} color='blue'>Team</Button>
					</Button.Group>
				</Grid.Column>
			</Grid>
			{cards}
			<div className="menu">
						{/* <SideMenu onSearchClick={this.onSearchClick} className="search"/> */}
			</div>
		</div>);
	};


	onSearch = (search_string) => {
		this.setState({skill:search_string});
	};

    onSearchClick = (search_string) => {
		this.setState({skill:search_string});
		
=======
	state = {
		searchTerm: "",
		skills: [],
		years: [],
		schools: []
	}
	
    render() {
		return (
			<div>
				<div className="member-cards">
						<Members skill={this.state.searchTerm} user_id={this.props.user_id} />
				</div>
				<div className="user-input">
					<InputTagCollection
						skills={this.state.skills}
						years={this.state.years}
						schools={this.state.schools}
						allFilterClickListener={this.allFilterClickListener}
					/>
				</div>
				<div className="Feed-container">
					<div className="menu">
						<SideMenu className="Side-menu" 
							allFilterClickListener={this.allFilterClickListener}
							onSearchClick={this.onSearchClick}
						/>
					</div>
					<div className="feed-cards">
						<FeedCards skill={this.state.skills} user_id={this.props.user_id} />
					</div>
				</div>
			</div>
        );
	};

	allFilterClickListener = (name, filterProp) => {
		let index = this.state[filterProp].indexOf(name)
		if (index > -1) {
			this.state[filterProp].splice(index, 1)
			this.setState({
				[filterProp]: this.state[filterProp]
			});
		} else {
			this.setState({
				[filterProp]: [...this.state[filterProp], name]
			})
		}
	};

	searchListener = e => {
		this.setState({ searchTerm: e.target.value });
	};

    onSearchClick = (search_string) => {
        this.setState({searchTerm:search_string});
>>>>>>> origin/master
    };
};

export default Feed;
