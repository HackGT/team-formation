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
import { Input } from "semantic-ui-react";

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
          uuid: this.props.user_id,
        }}
        render={({ error, props }) => {
          if (error) {
            return <div>{error.message}</div>;
          } else if (props) {
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
                        }}
                      />
                    </div>
                    <Menu.Item
                      icon="sign out"
                      style={{
                        color: "white",
                      }}
                      link={true}
                      href={"/api/user/logout"}
                    />
                    <Dropdown
                      item="item"
                      style={{
                        color: "white",
                      }}
                      icon="bell"
                      direction="left"
                      closeOnChange={false}
                    >
                      <Dropdown.Menu className="notification-pane">
                        <NotificationGroup user={this.props.user_id} />
                      </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown
                      item="item"
                      icon="user"
                      style={{
                        color: "white",
                      }}
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
