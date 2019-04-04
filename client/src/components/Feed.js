import React, { Component } from 'react';
import FeedCards from './FeedCards';
import SideMenu from './SideMenu';

class Feed extends Component {

    constructor(props){
        super(props)
        this.state = {
            name: ""
		};
    };
    
	render() {
		return (
			<div className="Feed-container">
				<div className="menu">
					<SideMenu onSearchClick={this.onSearchClick} className="search"/>
				</div>
			    <FeedCards name={this.state.name} />
			</div>

        );
	};

	onSearch = (search_string) => {
		this.setState({name:search_string});
	};

    onSearchClick = (search_string) => {
        this.setState({name:search_string});
    };
};

export default Feed;
