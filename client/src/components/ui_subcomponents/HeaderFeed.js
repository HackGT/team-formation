import React, { Component } from "react";
import "../css/Headers.css";
import { Button, Menu } from "semantic-ui-react";
import { Header, Image, Modal } from "semantic-ui-react";
import { commitMutation } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import environment from "../Environment";

const mutation = graphql`
  mutation HeaderFeedMutation($uuid: String) {
    toggle_visibility(uuid: $uuid) {
      name
      grad_year
      school
      skills
      experience
      contact
      visible
    }
  }
`;

class Headers extends Component {
  render() {
    let toggle_text;
    if (this.props.visible) {
      toggle_text = "Make Profile Invisible to Other Users";
    } else {
      toggle_text = "Make Profile Visible to Other Users";
    }
    return (
      <div className="Header-container">
        <div className="logout-button">
          <Menu>
            <Menu.Item>
              <Button className="edit-button" onClick={this.props.onEditClick}>
                {" "}
                Edit Profile{" "}
              </Button>
            </Menu.Item>
            <Menu.Item>
              <Button href={"/api/user/logout"} className="logout-button">
                {" "}
                Logout{" "}
              </Button>
            </Menu.Item>
            <Menu.Item>
              <Button onClick={this.onToggleClick} className="toggle-button">
                {" "}
                {toggle_text}{" "}
              </Button>
            </Menu.Item>
            <Menu.Item>
              <Modal
                trigger={<Button>Modal 1</Button>}
                style={{
                  padding: 10,
                  backgroundColor: "#c4c4c4",
                }}
                closeIcon
              >
                <Modal.Content
                  style={{
                    backgroundColor: "#c4c4c4",
                  }}
                >
                  <Modal.Description>
                    <div
                      style={{
                        backgroundColor: "#c4c4c4",
                      }}
                    >
                      <p
                        style={{
                          textAlign: "center",
                          fontSize: 40,
                        }}
                      >
                        Team 23 wants you to join their team!
                      </p>
                      <div
                        style={{
                          marginRight: 80,
                          marginLeft: 80,
                        }}
                      >
                        <p
                          style={{
                            marginTop: 60,
                          }}
                        >
                          Team 23's request message:
                        </p>
                        <p
                          style={{
                            border: "1px solid #000",
                            borderRadius: 7,
                            padding: 20,
                          }}
                        >
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat.
                        </p>
                        <p
                          style={{
                            marginTop: 30,
                          }}
                        >
                          Team 23's project idea:
                        </p>
                        <p
                          style={{
                            border: "1px solid #000",
                            borderRadius: 7,
                            padding: 20,
                          }}
                        >
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat.
                        </p>

                        <div
                          class="flex-container1"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: 35,
                          }}
                        >
                          <div
                            style={{
                              border: "1px solid #000",
                              borderRadius: 20,
                              padding: 10,
                            }}
                          >
                            View more about Team 23
                          </div>
                        </div>
                        <div
                          class="flex-container"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: 20,
                          }}
                        >
                          <div
                            style={{
                              border: "1px solid #000",
                              borderRadius: 20,
                              padding: 10,
                              margin: 10,
                            }}
                          >
                            Accept
                          </div>
                          <div
                            style={{
                              border: "1px solid #000",
                              borderRadius: 20,
                              padding: 10,
                              margin: 10,
                            }}
                          >
                            Deny
                          </div>
                        </div>
                      </div>
                    </div>
                  </Modal.Description>
                </Modal.Content>
              </Modal>
            </Menu.Item>
            <Menu.Item>
              <Modal
                trigger={<Button>Modal 2</Button>}
                style={{
                  paddingTop: 10,
                  backgroundColor: "#c4c4c4",
                }}
                closeIcon
              >
                <Modal.Content
                  style={{
                    backgroundColor: "#c4c4c4",
                  }}
                >
                  <Modal.Description>
                    <div
                      style={{
                        backgroundColor: "#c4c4c4",
                      }}
                    >
                      <p
                        style={{
                          textAlign: "center",
                          fontSize: 40,
                        }}
                      >
                        Request Join Team 23?
                      </p>
                      <p
                        style={{
                          marginTop: 60,
                          border: "1px solid #000",
                          borderRadius: 7,
                          paddingTop: 15,
                          paddingLeft: 20,
                          paddingBottom: 100,
                          marginRight: 220,
                          marginLeft: 220,
                        }}
                      >
                        Write a message...
                      </p>
                      <div
                        style={{
                          float: "right",
                          marginTop: 40,
                          paddingBottom: 20,
                        }}
                      >
                        <svg
                          width="21"
                          height="18"
                          viewBox="0 0 21 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0.00999999 18L21 9L0.00999999 0L0 7L15 9L0 11L0.00999999 18Z"
                            fill="#646464"
                          />
                        </svg>
                      </div>
                    </div>
                  </Modal.Description>
                </Modal.Content>
              </Modal>
            </Menu.Item>
          </Menu>
        </div>

        <div className="headers">
          <h1>HackGT</h1>
          <h2>Team Formation</h2>
        </div>
      </div>
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
