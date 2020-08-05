import React, { Component } from "react";
import TeamRequest from "./TeamRequest";
import JoinTeam from "./JoinTeam";
import "../css/Headers.css";
import "../css/Modal.css";
import { Button, Menu, Dropdown } from "semantic-ui-react";
import { commitMutation } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import environment from "../Environment";
import { QueryRenderer } from "react-relay";
import NotificationGroup from "../NotificationGroup";
import IndividualRequest from "./IndividualRequest";
import JoinIndividual from "./JoinIndividual";

const mutation = graphql`
  mutation HeaderFeedMutation($uuid: String) {
    toggle_visibility(uuid: $uuid) {
      name
    }
  }
`;
const getName = graphql`
  query HeaderFeedNameQuery($uuid: String) {
    user_profile(uuid: $uuid) {
      name
    }
  }
`;

class Headers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal1: false,
      showModal2: false,
      showModal3: false,
      showModal4: false,
    };
  }

  closeModal1 = () => {
    this.setState({ showModal1: false });
  };

  closeModal2 = () => {
    this.setState({ showModal2: false });
  };

  closeModal3 = () => {
    this.setState({ showModal3: false });
  };

  closeModal4 = () => {
    this.setState({ showModal4: false });
  };

  render() {
    const teamInfo = {
      teamName: "Team 23",
      teamRequestMessage:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      teamProjectIdea:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    };
    const user2Info = {
      user2CardName: "Aakash G.",
      user2CardInfo:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      user2School: "Georgia Tech",
      user2GradYear: "2021",
      user2Skills: ["React", "GraphQL", "CSS"],
      user2Contact: "1234567890",
      user2Name: "Aakash",
    };
    let toggle_text;
    if (this.props.visible) {
      toggle_text = "Make Profile Public";
    } else {
      toggle_text = "Make Profile Private";
    }
    return (
      <QueryRenderer
        environment={environment}
        query={getName}
        variables={{
          uuid: this.props.user_id,
        }}
        render={({ error, props }) => {
          if (error) {
            return <div>{error.message}</div>;
          } else if (props) {
            return (
              <div className="Header-container">
                <div className="logout-button">
                  <Menu borderless="borderless" size={"massive"}>
                    <Menu.Item>
                      <b>HackGT Team Formation</b>
                    </Menu.Item>
                    <Menu.Menu
                      borderless="borderless"
                      position="right"
                      size={"massive"}
                    >
                      <Menu.Item name={props.user_profile.name} />
                      <Menu.Item
                        icon="sign out"
                        link={true}
                        href={"/api/user/logout"}
                      />
                      <Dropdown
                        item="item"
                        icon="bell"
                        direction="left"
                        closeOnChange={false}
                      >
                        <Dropdown.Menu className="notification-pane compact" style={{maxWidth: 300}}>
                          <NotificationGroup
                            user={this.props.user_id}
                            onTeamPageClick={this.props.onTeamPageClick}
                          />
                        </Dropdown.Menu>
                      </Dropdown>
                      <Dropdown
                        item="item"
                        icon="user"
                        direction="left"
                        closeOnChange={false}
                      >
                        <Dropdown.Menu>
                          <Dropdown.Item
                            icon="edit"
                            text="Edit Profile"
                            onClick={this.props.onEditClick}
                          />
                          <Dropdown.Item
                            icon="globe"
                            text={toggle_text}
                            onClick={this.onToggleClick}
                          />
                        </Dropdown.Menu>
                      </Dropdown>
                    </Menu.Menu>
                  </Menu>
                </div>
              </div>
            );
          }
        }}
      />
    );
  }
  onToggleClick = () => {
    commitMutation(environment, {
      mutation,
      variables: {
        uuid: this.props.user_id,
      },
    });
    this.props.onNextClick("feed", this.props.user_id, !this.props.visible);
  };
}

export default Headers;
