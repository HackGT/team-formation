import React, { Component } from "react";
import "../css/Headers.css";
import "../css/Modal.css";
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
    const teamInfo = {
      teamName: "Team 23",
      teamRequestMessage:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      teamProjectIdea:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    };
    const user1Info = {
      user1CardName: "Meha A.",
      user1FirstName: "Meha",
      user1CardInfo:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      user1RequestMessage:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      user1ProjectIdea:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    };
    const user2Info = {
      user2Name: "Aakash",
      user2CardInfo:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      user2CardName: "Aakash G.",
    };
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
                        {teamInfo.teamName} wants you to join their team!
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
                          {teamInfo.teamName}'s request message:
                        </p>
                        <p
                          style={{
                            border: "1px solid #000",
                            borderRadius: 7,
                            padding: 20,
                          }}
                        >
                          {teamInfo.teamRequestMessage}
                        </p>
                        <p
                          style={{
                            marginTop: 30,
                          }}
                        >
                          {teamInfo.teamName}'s project idea:
                        </p>
                        <p
                          style={{
                            border: "1px solid #000",
                            borderRadius: 7,
                            padding: 20,
                          }}
                        >
                          {teamInfo.teamProjectIdea}
                        </p>

                        <div
                          class="flex-container1"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: 35,
                          }}
                        >
                          <div>
                            <button
                              class="ui black basic button"
                              style={{
                                borderRadius: 20,
                                fontSize: 15,
                                padding: 12,
                              }}
                            >
                              View more about {teamInfo.teamName}
                            </button>
                          </div>
                        </div>
                        <div
                          class="flex-container2"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: 20,
                          }}
                        >
                          <div
                            style={{
                              margin: 10,
                            }}
                          >
                            <button
                              class="ui black basic button"
                              style={{
                                borderRadius: 20,
                              }}
                            >
                              Accept
                            </button>
                          </div>
                          <div
                            style={{
                              margin: 10,
                            }}
                          >
                            <button
                              class="ui black basic button"
                              style={{
                                borderRadius: 20,
                              }}
                            >
                              Deny
                            </button>
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
                        Request Join {teamInfo.teamName}?
                      </p>
                      <textarea
                        rows="7"
                        cols="63"
                        placeholder="Write a message..."
                        style={{
                          marginTop: 35,
                          backgroundColor: "#c4c4c4",
                          borderRadius: 7,
                          border: "1px solid #000",
                          paddingTop: 15,
                          paddingLeft: 20,
                          marginRight: 220,
                          marginLeft: 220,
                        }}
                      />
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
            <Menu.Item>
              <Modal
                trigger={<Button>Modal 3</Button>}
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
                        {user1Info.user1CardName} wants to team up with you!
                      </p>
                      <div
                        class="row"
                        style={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <div
                          class="column"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            width: 350,
                          }}
                        >
                          <div
                            class="column1"
                            style={{
                              border: "1px solid #000",
                              borderRadius: 7,
                              margin: 25,
                            }}
                          >
                            <p
                              style={{
                                textAlign: "center",
                                marginTop: 40,
                                fontSize: 30,
                              }}
                            >
                              {user1Info.user1CardName}
                            </p>
                            <p
                              style={{
                                textAlign: "left",
                                marginTop: 50,
                                fontSize: 17,
                                marginLeft: 30,
                                marginRight: 30,
                                paddingBottom: 40,
                              }}
                            >
                              {user1Info.user1CardInfo}
                            </p>
                          </div>
                        </div>
                        <div
                          class="column"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            flex: 1,
                          }}
                        >
                          <div
                            class="column2"
                            style={{
                              margin: 25,
                            }}
                          >
                            <p>{user1Info.user1FirstName}'s Request Message:</p>
                            <p
                              style={{
                                border: "1px solid #000",
                                borderRadius: 7,
                                padding: 20,
                              }}
                            >
                              {user1Info.user1RequestMessage}
                            </p>
                            <p
                              style={{
                                marginTop: 30,
                              }}
                            >
                              {user1Info.user1FirstName}'s Project Idea:
                            </p>
                            <p
                              style={{
                                border: "1px solid #000",
                                borderRadius: 7,
                                padding: 20,
                              }}
                            >
                              {user1Info.user1ProjectIdea}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        class="flex-container"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          style={{
                            margin: 10,
                          }}
                        >
                          <button
                            class="ui black basic button"
                            style={{
                              borderRadius: 20,
                            }}
                          >
                            Accept
                          </button>
                        </div>
                        <div
                          style={{
                            margin: 10,
                          }}
                        >
                          <button
                            class="ui black basic button"
                            style={{
                              borderRadius: 20,
                            }}
                          >
                            Deny
                          </button>
                        </div>
                      </div>
                    </div>
                  </Modal.Description>
                </Modal.Content>
              </Modal>
            </Menu.Item>
            <Menu.Item>
              <Modal
                trigger={<Button>Modal 4</Button>}
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
                        Team Up with {user2Info.user2Name}?
                      </p>
                      <div
                        class="row"
                        style={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <div
                          class="column"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            width: 350,
                          }}
                        >
                          <div
                            class="column1"
                            style={{
                              border: "1px solid #000",
                              borderRadius: 7,
                              margin: 25,
                            }}
                          >
                            <p
                              style={{
                                textAlign: "center",
                                marginTop: 40,
                                fontSize: 30,
                              }}
                            >
                              {user2Info.user2CardName}
                            </p>
                            <p
                              style={{
                                textAlign: "left",
                                marginTop: 50,
                                fontSize: 17,
                                marginLeft: 30,
                                marginRight: 30,
                                paddingBottom: 50,
                              }}
                            >
                              {user2Info.user2CardInfo}
                            </p>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <button
                                class="ui black basic button"
                                style={{
                                  float: "center",
                                  padding: 15,
                                  width: 230,
                                  borderRadius: 7,
                                  marginBottom: 30,
                                }}
                              >
                                Team Up!
                              </button>
                            </div>
                          </div>
                        </div>
                        <div
                          class="column"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            flex: 1,
                          }}
                        >
                          <div
                            class="column2"
                            style={{
                              margin: 25,
                            }}
                          >
                            <textarea
                              rows="8"
                              cols="68"
                              placeholder="Introduce yourself..."
                              style={{
                                backgroundColor: "#c4c4c4",
                                borderRadius: 7,
                                border: "1px solid #000",
                                paddingLeft: 15,
                                paddingTop: 15,
                              }}
                            />

                            <textarea
                              rows="8"
                              cols="68"
                              placeholder="Describe your project idea..."
                              style={{
                                marginTop: 50,
                                backgroundColor: "#c4c4c4",
                                borderRadius: 7,
                                border: "1px solid #000",
                                paddingLeft: 15,
                                paddingTop: 15,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          float: "right",
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
