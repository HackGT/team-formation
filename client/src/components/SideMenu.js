import React, { Component } from "react";
// import {Fuse} from 'fuse.js'
import { Dropdown, Input, Icon } from "semantic-ui-react";
import "./css/SideMenu.css";
import skills from "../constants/skills";
import schools from "../constants/schools";
import years from "../constants/years";

import SideMenuPicture from "./css/assets/SideMenuPicture.svg";

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
            size="small"
            focus="focus"
          />
          <h3 className="h3">SEEKING SKILLS</h3>
          <Dropdown
            id="dropdown"
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
          icon={
            <Icon
              name="search"
              circular="true"
              link
              onClick={this.onSearchClick}
            />
          }
          size="small"
          focus="focus"
        />
        <h3 className="h3">SKILLS</h3>
        <Dropdown
          id="dropdown"
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
          item="item"
          text="Select Schools"
          search="search"
          selection="selection"
          options={schoolOptions}
          fullTextSearch="true"
          scrolling="scrolling"
          closeOnChange="false"
        />
        <img class="moveImage" src={SideMenuPicture} alt="React Logo" />
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
    // this.props.onSearchClick(e.target.value);
  };

  onSearchClick = (e) => {
    this.props.onSearchClick(this.state.search_string);
  };
}

export default SideMenu;
