import React, { Component } from 'react';
import FeedCards from './FeedCards';
import SideMenu from './SideMenu';
import InputTagCollection from './InputTagCollection'
import './css/Feed.css';
import TeamInformation from './TeamInformation'

class Feed extends Component {
	state = {
		searchTerm: "",
		skills: [],
		years: [],
		schools: []
	}
	
    render() {
		return (
			<div>
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
				<div className='team-info'>
					<TeamInformation TeamInformation editable={true}/>
				</div>
				<div className='team-info'>
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
};

export default Feed;
