import React, { Component } from 'react';
import FeedTeamCards from './FeedTeamCards';
import SideMenu from './SideMenu';
import './css/Feed.css';

class Feed extends Component {

    constructor(props){
        super(props)
        this.state = {
            skill: ""
		};
    };

    render() {
		return (
			<div className="Feed-container">
				<div className="menu">
					{/* <SideMenu onSearchClick={this.onSearchClick} className="search"/> */}
				</div>
			    <FeedTeamCards skill={this.state.skill} user_id={this.props.user_id} />
			</div>

        );
	};

	onSearch = (search_string) => {
		this.setState({skill:search_string});
	};

    onSearchClick = (search_string) => {
        this.setState({skill:search_string});
    };
};

export default Feed;
