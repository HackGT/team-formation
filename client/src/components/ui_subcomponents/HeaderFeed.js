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
                    <div class="background">
                      <p class="header">
                        {teamInfo.teamName} wants you to join their team!
                      </p>
                      <div class="modal1Margins">
                        <p class="requestMessage">
                          {teamInfo.teamName}'s request message:
                        </p>
                        <p class="requestMessageBody">
                          {teamInfo.teamRequestMessage}
                        </p>
                        <p class="projectIdea">
                          {teamInfo.teamName}'s project idea:
                        </p>
                        <p class="projectIdeaBody">
                          {teamInfo.teamProjectIdea}
                        </p>

                        <div class="flex-container1">
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
                        <div class="flex-container2">
                          <div class="buttonMargin">
                            <button
                              class="ui black basic button"
                              style={{
                                borderRadius: 20,
                              }}
                            >
                              Accept
                            </button>
                          </div>
                          <div class="buttonMargin">
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
                    <div class="background">
                      <p class="header">Request Join {teamInfo.teamName}?</p>
                      <textarea
                        id="writeAMessage"
                        rows="7"
                        cols="63"
                        placeholder="Write a message..."
                      />
                      <div class="send">
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
                    <div class="background">
                      <p class="header">
                        {user1Info.user1CardName} wants to team up with you!
                      </p>
                      <div class="row">
                        <div class="modal3Column">
                          <div class="modal3Column1">
                            <p
                              class="cardName"
                              style={{
                                marginTop: 40,
                              }}
                            >
                              {user1Info.user1CardName}
                            </p>
                            <p class="cardInfo">{user1Info.user1CardInfo}</p>
                          </div>
                        </div>
                        <div class="modal3Column2">
                          <div class="modal3Column3">
                            <p>{user1Info.user1FirstName}'s Request Message:</p>
                            <p class="user1RequestMessage">
                              {user1Info.user1RequestMessage}
                            </p>
                            <p class="user1FirstName">
                              {user1Info.user1FirstName}'s Project Idea:
                            </p>
                            <p class="user1ProjectIdea">
                              {user1Info.user1ProjectIdea}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div class="flex-container-modal3">
                        <div class="modal3Button">
                          <button
                            class="ui black basic button"
                            style={{
                              borderRadius: 20,
                            }}
                          >
                            Accept
                          </button>
                        </div>
                        <div class="modal3Button">
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
                    <div class="background">
                      <p class="header">Team Up with {user2Info.user2Name}?</p>
                      <div class="row">
                        <div class="modal4-column">
                          <div class="modal4-column1">
                            <p
                              class="user2CardName"
                              style={{
                                marginTop: 40,
                              }}
                            >
                              {user2Info.user2CardName}
                            </p>
                            <p class="user2CardInfo">
                              {user2Info.user2CardInfo}
                            </p>
                            <div class="flex-container-modal3">
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
                        <div class="modal3Column2">
                          <div class="modal4-column2">
                            <textarea
                              id="introduceYourself"
                              rows="8"
                              cols="68"
                              placeholder="Introduce yourself..."
                            />

                            <textarea
                              id="describeProject"
                              rows="8"
                              cols="68"
                              placeholder="Describe your project idea..."
                            />
                          </div>
                        </div>
                      </div>
                      <div class="modal4send">
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
