import React, { Component } from "react";
import "../css/Headers.css";
import "../css/Modal.css";
import { Menu, Dropdown, Icon, Popup, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { graphql } from "babel-plugin-relay/macro";
import environment from "../Environment";
import { QueryRenderer } from "react-relay";
import NotificationGroup from "../NotificationGroup";
import { filterExtensionDefinitions } from "@graphql-tools/schema";
import truncateTeamName from "../../constants/functions"

// Mutation that changes the name on the page
const mutation = graphql`
  mutation HeaderFeedMutation {
    toggle_visibility {
      name
    }
  }
`;
// Query to get the user data
const getName = graphql`
  query HeaderFeedNameQuery {
    user_profile {
      name
      team {
        id
        name
      }
    }
  }
`;

// Full set of headers for the user on the Feed component
/*
Note: Does not appear to be in use. However the data will not display without it.
Status: UNKNOWN
Suggestion: Unless it's possible to work out how this is being used, do not touch it.
*/
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
            var teamIcon;
            if (props.user_profile.team == null) {
              teamIcon =
                <Popup
                  hoverable={false}
                  trigger={<Icon name='group' size='large' inverted link={true}/>}
                  content='You are not on a team'
                  position='bottom center'
                />;
            } else {
              let link = "/team/" + props.user_profile.team.id;
              teamIcon =
                <Popup
                  trigger={
                    <Link to={link}>
                      <Icon
                        name='group'
                        link={true}
                        size='large'
                        inverted
                      />
                    </Link>
                  }
                  content='Team Profile'
                  position='bottom center'
                >
                </Popup>
            }
            return (
              <div className="logout-button">
                <Menu secondary borderless="borderless" size={"massive"}>
                  <Menu.Menu position="right">
                    <Menu.Item>
                      <div 
                        className="header-name"
                        style={{
                          display: "flex",
                          fontFamily: "Quicksand-Bold",
                          fontSize: 20,
                          color: "white",
                          paddingRight: 10,
                          justifyContent: "center",
                          alignContent: "center"
                        }}
                      >
                        {(props.user_profile.team) ? `${props.user_profile.name} (${truncateTeamName(props.user_profile.team.name)})` : props.user_profile.name}
                      </div>
                    </Menu.Item>
                    <Menu.Item
                      style={{
                        size: "large",
                        color: "white",
                      }}
                    >
                      <Popup
                        trigger={
                          <Dropdown
                            item="item"
                            icon='bell'
                            style={{
                              size: "large",
                              color: "white",
                              margin: 0,
                              padding: 0,
                              backgroundColor: "transparent",
                            }}
                            direction="left"
                            closeOnChange={false}
                          >
                            <Dropdown.Menu stackable className="notification-pane">
                              <NotificationGroup user={this.props.user_id} />
                            </Dropdown.Menu>
                          </Dropdown>}
                          content='Notifications'
                          position='bottom center'
                      />
                    </Menu.Item>
                    <Menu.Item
                      style={{
                        size: "large",
                        color: "white",
                        backgroundColor: "transparent",
                      }}
                      link={true}
                      href={"/edit-profile"}
                    >
                      <Popup
                        trigger={<Icon name='user' inverted link={true}/>}
                        content='User Profile'
                        position='bottom center'
                      />
                    </Menu.Item>
                    <Menu.Item
                      style={{
                        size: "large",
                        color: "white",
                      }}
                    >
                      {teamIcon}
                    </Menu.Item>
                    <Menu.Item
                      style={{
                        size: "large",
                        color: "white",
                        backgroundColor: "transparent",
                      }}
                      link={true}
                      href={"/api/user/logout"}
                    >
                      <Popup
                        trigger={<Icon name='sign out' inverted link={true}/>}
                        content='Sign Out'
                        position='bottom center'
                      />
                    </Menu.Item>
                  </Menu.Menu>
                </Menu>
                <div className="desktopTitles">
                  <Link to="/feed">
                    <p class="HackGTitle">HackGT8</p>
                    <span class="teamFormation">Team Formation</span>
                  </Link>
                </div>
                <div className="mobileTitles">
                  <Link to="/feed">
                    <div className="innerMobileTitles">
                      <p class="HackGTitle">HackGT8</p>
                      <span class="teamFormation">Team Formation</span>
                    </div>
                  </Link>
                </div>
              </div>
            );
          }
        }}
      />
    );
  }
}

export default Headers;
