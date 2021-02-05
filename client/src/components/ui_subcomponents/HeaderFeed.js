import React, { Component } from "react";
import "../css/Headers.css";
import "../css/Modal.css";
import { Menu, Dropdown, Icon, Popup, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { graphql } from "babel-plugin-relay/macro";
import environment from "../Environment";
import { QueryRenderer } from "react-relay";
import NotificationGroup from "../NotificationGroup";


const mutation = graphql`
  mutation HeaderFeedMutation {
    toggle_visibility {
      name
    }
  }
`;
const getName = graphql`
  query HeaderFeedNameQuery {
    user_profile {
      name
      team {
        id
      }
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
                    <div className="header-name">
                      <Menu.Item
                        name={props.user_profile.name}
                        style={{
                          fontFamily: "Quicksand-Bold",
                          fontSize: 20,
                          color: "white",
                          paddingRight: 10
                        }}
                      />
                    </div>
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
                    <p class="HackGTitle">HACKGT7: REIMAGINE REALITY</p>
                    <span class="teamFormation">Team Formation</span>
                  </Link>
                </div>
                <div className="mobileTitles">
                  <Link to="/feed">
                    <div className="innerMobileTitles">
                      <p class="HackGTitle">HACKGT7: REIMAGINE REALITY</p>
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
