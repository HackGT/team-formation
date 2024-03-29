/* eslint-disable */
import React, { Component } from "react";
import FeedTeamCards from "./FeedTeamCards";
import FeedCards from "./FeedCards";
import SideMenu from "../search-filter/SideMenu";
import { Button } from "semantic-ui-react";
import InputTagCollection from "../search-filter/InputTagCollection";
import "../css/Feed.css";

class Feed extends Component {
  state = {
    searchTerm: "",
    skills: [],
    years: [],
    schools: [],
    tracks: [],
    locations: [],
    teams: false,
    showSecondModal: false,
    sliceIndexStart: 0,
    numCardsPerPage: 12,
  };

  render() {
    // Ternary - If teams is true, show the teams made on the app. If not, show the users without a team
    var cards = this.state.teams ? (
      <FeedTeamCards
        search={this.state.searchTerm}
        onTeamPageClick={this.props.onTeamPageClick}
        skill={this.state.skills}
        user_id={this.props.user_id}
        sliceIndexStart={this.state.sliceIndexStart}
        numCardsPerPage={this.state.numCardsPerPage}
        moveLeft={this.moveLeft}
        moveRight={this.moveRight}
      />
    ) : (
      <FeedCards
        search={this.state.searchTerm}
        skill={this.state.skills}
        grad_year={this.state.years}
        school={this.state.schools}
        track={this.state.tracks}
        locations={this.state.locations}
        user_id={this.props.user_id}
        sliceIndexStart={this.state.sliceIndexStart}
        numCardsPerPage={this.state.numCardsPerPage}
        moveLeft={this.moveLeft}
        moveRight={this.moveRight}
      />
    );
    return (
      <div className="feed-container">
        <div className="left-side">
          <div className="side-menu">
            <SideMenu
              className="Side-menu"
              allFilterClickListener={this.allFilterClickListener}
              onSearchClick={this.onSearchClick}
              onTeamPage={this.state.teams}
            />
          </div>
        </div>


        <div className="right-side">
          <div className="side-menu-top">
            <SideMenu
              className="Side-menu"
              allFilterClickListener={this.allFilterClickListener}
              onSearchClick={this.onSearchClick}
              onTeamPage={this.state.teams}
            />
          </div>
          <div>
            <Button.Group className="switch-feed">
              <Button
                className="individuals"
                onClick={this.feedTypeListener}
                basic={this.state.teams}
              >
                Individuals
              </Button>
              <Button
                onClick={this.feedTypeListener}
                basic={!this.state.teams}
                className="teams"
              >
                Teams
              </Button>
            </Button.Group>
          </div>
          {this.state.skills.length ||
            this.state.years.length ||
            this.state.schools.length ||
            this.state.tracks.length ||
            this.state.locations.length ? (
              <div className="user-input">
                <div className="filters-applied">
                  <text>Filters Applied</text>
                </div>
                <div className="filter-tags">
                  <InputTagCollection
                    skills={this.state.skills}
                    years={this.state.years}
                    schools={this.state.schools}
                    tracks={this.state.tracks}
                    locations={this.state.locations}
                    allFilterClickListener={this.allFilterClickListener}
                  />
                </div>
              </div>
            ) : null}
          <div className="feed-cards">{cards}</div>
        </div>
      </div>
    );
  }
  // Set filters when clicked
  allFilterClickListener = (name, filterProp) => {
    let index = this.state[filterProp].indexOf(name);
    if (index > -1) {
      this.state[filterProp].splice(index, 1);
      this.setState({
        [filterProp]: this.state[filterProp],
        sliceIndexStart: 0,
      });
    } else {
      this.setState({
        [filterProp]: [...this.state[filterProp], name],
        sliceIndexStart: 0,
      });
    }
  };

  // Search term state mutator
  searchListener = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  // Search term listener
  onSearchClick = (search_string) => {
    this.setState({ searchTerm: search_string, sliceIndexStart: 0 });
  };

  // Listener to swap feeds
  feedTypeListener = (e, data) => {
    if (data.children === "Individuals") {
      this.setState({
        teams: false,
        searchTerm: "",
        skills: [],
        tracks: [],
        years: [],
        schools: [],
      });
    } else if (data.children === "Teams") {
      this.setState({
        teams: true,
        searchTerm: "",
        skills: [],
        years: [],
        schools: [],
      });
    }
  };

  // Pagination - Handles the page numbers and data shown
  moveLeft = (e) => {
    this.setState({
        sliceIndexStart: this.state.sliceIndexStart - this.state.numCardsPerPage,
    })
}
  moveRight = (e) => {
    this.setState({
        sliceIndexStart: this.state.sliceIndexStart + this.state.numCardsPerPage,
    })
  }
}

export default Feed;
