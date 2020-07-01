import React, { Component } from 'react';
import FeedTeamCards from './FeedTeamCards';
import FeedCards from './FeedCards';
import Members from './Members';
import SideMenu from './SideMenu';
import InputTagCollection from './InputTagCollection'
import './css/Feed.css';
import TeamInformation from './TeamInformation'
import { Button } from 'semantic-ui-react'

class Feed extends Component {
	state = {
		searchTerm: "",
		skills: [],
		years: [],
		schools: [],
		individuals: true,
		teams: false
	}
	
    render() {
		return (
			<div>
				<div className="member-cards">
						<Members skill={this.state.searchTerm} user_id={this.props.user_id} />
				</div>
				<div className="switch-feed">
					<Button.Group>
						<Button onClick={this.feedTypeListener} basic={!this.state.individuals} color='purple'>Individuals</Button>
						<Button.Or />
						<Button onClick={this.feedTypeListener} basic={!this.state.teams} color='purple'>Teams</Button>
					</Button.Group>
				</div>
				<div className="Feed-container">
					<div className="menu">
						<SideMenu className="Side-menu" 
							allFilterClickListener={this.allFilterClickListener}
							onSearchClick={this.onSearchClick}
						/>
					</div>
					<div>
						{this.state.skills.length || this.state.years.length || this.state.schools.length ? 
							<div className="user-input">
								<div className="filters-applied">
									<text>Filters Applied</text>
								</div>
								<div className='filter-tags'>
									<InputTagCollection
										skills={this.state.skills}
										years={this.state.years}
										schools={this.state.schools}
										allFilterClickListener={this.allFilterClickListener}
									/>
								</div>
							</div> 
						: null}
						<div className="feed-cards">
							<FeedCards skill={this.state.skills} user_id={this.props.user_id} />
						</div>
					</div>
				</div>
				<div className="team-info-container">
					<TeamInformation TeamInformation editable={true}/>
					<TeamInformation editable={false} teamBio="This is our team bio!" projectIdea="This is our project idea!"/>
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
	};
	
	feedTypeListener = (e, data) => {
		if (data.children === "Individuals") {
			this.setState({
				individuals: true,
				teams: false
			});
		}
		else if (data.children === "Teams") {
			this.setState({
				individuals: false,
				teams: true
			});
		}
	};
};

export default Feed;
