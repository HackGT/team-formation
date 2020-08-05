import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
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
        }}
        render={({ error, props }) => {
          if (error) {
            return <div>{error.message}</div>;
          } else if (props) {
            return (
                <div className="Header-container">
                    <Menu borderless="borderless" size={"massive"}>
                      <Link to="/feed">
                          <Menu.Item>
                            <b>HackGT Team Formation</b>
                          </Menu.Item>
                      </Link>
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
                          <Link to="/edit-profile">
                              <Dropdown.Item
                                icon="edit"
                                text="Edit Profile"
                              />
                          </Link>
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
      },
    });
    // this.props.onNextClick("feed", this.props.user_id, !this.props.visible);
  };
}

export default Headers;
