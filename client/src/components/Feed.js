import React, { Component } from "react";
import FeedTeamCards from "./FeedTeamCards";
import FeedCards from "./FeedCards";
import SideMenu from "./SideMenu";
import { Button, Grid } from "semantic-ui-react";
import { setState } from "semantic-ui-react";
import Members from "./Members";
import InputTagCollection from "./InputTagCollection";
import "./css/Feed.css";
import TeamInformation from "./TeamInformation";

class Feed extends Component {
	state = {
		searchTerm: "",
		skills: [],
		years: [],
		schools: [],
		teams: false
	}

    render() {
		var cards = this.state.teams ? <FeedTeamCards search={this.state.searchTerm} onTeamPageClick={this.props.onTeamPageClick} skill={this.state.skills} user_id={this.props.user_id} /> :
			<FeedCards search={this.state.searchTerm} skill={this.state.skills} grad_year={this.state.years} school={this.state.schools} user_id={this.props.user_id} />
		return (
			<div>
                <p class="HackGTitle">HACKGT7: REIMAGINE REALITY</p>
				<div className="switch-feed">
                     <span class="teamFormation">HackGT Team Formation</span>
					<Button.Group
                        style={{
                          background: "rgba(255, 251, 251, 0.7)",
                          borderRadius: 15,
                          padding: 3,
                        }}
                    >
						<Button onClick={this.feedTypeListener} basic={this.state.teams}
                        style={{
                          backgroundColor: "#A8C5D6",
                          color: "white",
                          borderRadius: 15,
                          fontFamily: "Quicksand-Bold",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                            >Individuals</Button>
						<Button onClick={this.feedTypeListener} basic={!this.state.teams}
                        style={{
                          backgroundColor: "#A8C5D6",
                          color: "white",
                          borderRadius: 15,
                          fontFamily: "Quicksand-Bold",
                        }}
                            >Teams</Button>
					</Button.Group>
				</div>
				<div className="Feed-container">
					<div className="menu">
						<SideMenu className="Side-menu"
							allFilterClickListener={this.allFilterClickListener}
							onSearchClick={this.onSearchClick}
							onTeamPage={this.state.teams}
						/>
					</div>
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
							{cards}
						</div>
				</div>
			</div>
        );
	};

  allFilterClickListener = (name, filterProp) => {
    let index = this.state[filterProp].indexOf(name);
    if (index > -1) {
      this.state[filterProp].splice(index, 1);
      this.setState({
        [filterProp]: this.state[filterProp],
      });
    } else {
      this.setState({
        [filterProp]: [...this.state[filterProp], name],
      });
    }
  };

  searchListener = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

    onSearchClick = (search_string) => {
        this.setState({searchTerm:search_string});
	};

	feedTypeListener = (e, data) => {
		if (data.children === "Individuals") {
			this.setState({
				teams: false,
				searchTerm: "",
				skills: [],
				years: [],
				schools: []
			});
		}
		else if (data.children === "Teams") {
			this.setState({
				teams: true,
				searchTerm: "",
				skills: [],
				years: [],
				schools: []
			});
		}
	};
};

export default Feed;
