import React, { Component } from 'react';
import FeedTeamCards from './FeedTeamCards';
import FeedCards from './FeedCards';
import SideMenu from './SideMenu';
import { Button, Grid } from 'semantic-ui-react';
import { setState } from 'semantic-ui-react';
import './css/Feed.css';

class Feed extends Component {

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
						<Button id="user" onClick={() => this.setState({displayTeams: false, individuals: true, teams: false})} basic={!this.state.individuals} color='purple'>Individuals</Button>
						<Button.Or />
						<Button id="team" onClick={() => this.setState({displayTeams: true, individuals: false, teams: true})} basic={!this.state.teams} color='purple'>Team</Button>
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
		
    };
};

export default Feed;
