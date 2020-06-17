import React, { Component } from 'react';
import FeedCards from './FeedCards';
import SideMenu from './SideMenu';
import InputTagCollection from './InputTagCollection'
import './css/Feed.css';

class Feed extends Component {
	state = {
		searchTerm: "",
		passingTags: {
			search: {
			  inputTerm: ""
			},
			skills: {
				react: false,
				angular: false,
				graphql: false,
				nodejs: false,
				html: false
			},
			year: {
				first: false,
				second: false,
				third: false,
				fourth: false,
				fifth: false
			}
		}
	}
	
    render() {
		return (
			<div>
				<div className="user-input">
					<InputTagCollection
						tags={this.state.passingTags}
						cancelSearchTag={this.cancelSearchTag}
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
						<FeedCards  skill={this.state.searchTerm} user_id={this.props.user_id} />
					</div>
				</div>
			</div>
        );
	};

	cancelSearchTag = () => {
		this.setState({
		  passingTags: {
			...this.state.passingTags,
			search: { inputTerm: "" }
		  }
		});
	  };

	allFilterClickListener = (name, filterProp) => {
		this.setState(prevState => ({
		  passingTags: {
			...prevState.passingTags,
			[filterProp]: {
			  ...prevState.passingTags[filterProp],
			  [name]: !prevState.passingTags[filterProp][name]
			}
		  }
		}));
	};

	searchListener = e => {
		this.setState({ searchTerm: e.target.value });
	};

	searchSubmitListener = e => {
		e.preventDefault();
		this.setState({
			passingTags: {
			...this.state.passingTags,
			search: { inputTerm: this.state.searchTerm }
			}
		});
	};

    onSearchClick = (search_string) => {
        this.setState({searchTerm:search_string});
    };
};

export default Feed;
