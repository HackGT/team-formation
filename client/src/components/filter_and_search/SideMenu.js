import React, { Component } from "react";
import { Dropdown, Input, Icon } from "semantic-ui-react";
import "./css/SideMenu.css";
import skills from "../../constants/skills";
import schools from "../../constants/schools";
import years from "../../constants/years";
import tracks from "../../constants/tracks";
import locations from "../../constants/locations";

class SideMenu extends Component {
  constructor() {
    super();
    this.state = {
      search_string: "",
    };
  }

  render() {
    const skillOptions = [];
    for (const skill in skills) {
      const name = skills[skill].value;
      skillOptions.push({
        key: name,
        text: name,
        value: name,
        onClick: (e, { value }) =>
          this.props.allFilterClickListener(value, "skills"),
      });
    }

    const yearOptions = [];
    for (const year in years) {
      const name = years[year].value;
      yearOptions.push({
        key: name,
        text: name,
        value: name,
        onClick: (e, { value }) =>
          this.props.allFilterClickListener(value, "years"),
      });
    }

    const schoolOptions = [];
    for (const school in schools) {
      const name = schools[school].value;
      schoolOptions.push({
        key: name,
        text: name,
        value: name,
        onClick: (e, { value }) =>
          this.props.allFilterClickListener(value, "schools"),
      });
    }

    const trackOptions = [];
    for (const track in tracks) {
      const curr = tracks[track].value;
      trackOptions.push({
        key: curr,
        text: curr,
        value: curr,
        onClick: (e, { value }) => 
          this.props.allFilterClickListener(value, "tracks"),
      })
    }

    const locationOptions = [];
    for (const location in locations) {
      const curr = locations[location].value;
      locationOptions.push({
        key: curr,
        text: curr,
        value: curr,
        onClick: (e, { value }) => 
          this.props.allFilterClickListener(value, "locations"),
      })
    }

    if (this.props.onTeamPage) {
      return (
        <div className="SideMenu-container">
          <Input
            placeholder="Search by Anything"
            onChange={this.onSearchChange}
            onKeyPress={this.handleKeyPress}
            icon={
              <Icon
                name="search"
                circular="true"
                link
                onClick={this.onSearchClick}
              />
            }
            focus="focus"
          />
          <h3 className="h3">SEEKING SKILLS</h3>
          <Dropdown
            className="filter-box"
            item="item"
            text="Select Skills"
            search="search"
            selection="selection"
            options={skillOptions}
            fullTextSearch="true"
            scrolling="scrolling"
            closeOnChange="false"
          />
        </div>
      );
    }
    return (
      <div className="SideMenu-container">
        <Input
          placeholder="Search by Anything"
          onChange={this.onSearchChange}
          onKeyPress={this.handleKeyPress}
          className="filter-box"
          icon={
            <Icon
              name="search"
              circular="true"
              link
              onClick={this.onSearchClick}
            />
          }
          focus="focus"
        />
        <h3 className="h3">SKILLS</h3>
        <Dropdown
          className="filter-box"
          item="item"
          text="Select Skills"
          search="search"
          selection="selection"
          options={skillOptions}
          fullTextSearch="true"
          scrolling="scrolling"
          closeOnChange="false"
        />
        <h3 className="h3">YEARS</h3>
        <Dropdown
          className="filter-box"
          item="item"
          text="Select Years"
          search="search"
          selection="selection"
          options={yearOptions}
          fullTextSearch="true"
          scrolling="scrolling"
          closeOnChange="false"
        />
        <h3 className="h3">SCHOOLS</h3>
        <Dropdown
          className="filter-box"
          item="item"
          text="Select Schools"
          search="search"
          selection="selection"
          options={schoolOptions}
          fullTextSearch="true"
          scrolling="scrolling"
          closeOnChange="false"
        />
        <h3 className="h3">TRACKS</h3>
        <Dropdown
          className="filter-box"
          item="item"
          text="Select Tracks"
          search="search"
          selection
          options={trackOptions}
          fullTextSearch
          scrolling
          closeOnChange={false}
        />
        <h3 className="h3">LOCATION</h3>
        <Dropdown
          className="filter-box"
          item="item"
          text="Select Location"
          search="search"
          selection
          fullTextSearch
          scrolling
          options={locationOptions}
          closeOnChange={false}
        />
      </div>
    );
  }
  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      this.props.onSearchClick(this.state.search_string);
    }
  };

  onSearchChange = (e) => {
    this.setState({ search_string: e.target.value });
  };

  onSearchClick = (e) => {
    this.props.onSearchClick(this.state.search_string);
  };
}

export default SideMenu;
