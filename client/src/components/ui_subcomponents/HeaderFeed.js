import React, { Component } from "react";
import UserCard from "../UserCard"
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
  state = {
    showModal1: false,
    showModal2: false,
    showModal3: false,
    showModal4: false,
  };

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
              <Button
                className="edit-button"
                onClick={this.props.onEditClick}
              >
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
              <Button
                onClick={this.onToggleClick}
                className="toggle-button"
              >
                {" "}
                {toggle_text}{" "}
              </Button>
            </Menu.Item>
            <Menu.Item>
              <Modal
                trigger={
                  <Button
                    onClick={() => this.setState({ showModal1: true })}
                  >
                    Modal 1
                  </Button>
                }
                style={{
                  padding: 10,
                  backgroundColor: "#c4c4c4",
                }}
                closeIcon
                open={this.state.showModal1}
                onClose={() => {
                  this.setState({ showModal1: false });
                }}
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
                            <Button
                              basic
                              color="black"
                              style={{
                                borderRadius: 20,
                                fontSize: 15,
                                padding: 12,
                              }}
                              onClick={() =>
                                this.setState({ showModal1: false })
                              }
                            >
                              View more about {teamInfo.teamName}
                            </Button>
                          </div>
                        </div>
                        <div class="flex-container2">
                          <div class="buttonMargin">
                            <Button
                              basic
                              color="black"
                              style={{
                                borderRadius: 20,
                              }}
                              onClick={() =>
                                this.setState({ showModal1: false })
                              }
                            >
                              Accept
                            </Button>
                          </div>
                          <div class="buttonMargin">
                            <Button
                              basic
                              color="black"
                              style={{
                                borderRadius: 20,
                              }}
                              onClick={() =>
                                this.setState({ showModal1: false })
                              }
                            >
                              Deny
                            </Button>
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
                trigger={
                  <Button
                    onClick={() => this.setState({ showModal2: true })}
                  >
                    Modal 2
                  </Button>
                }
                style={{
                  paddingTop: 10,
                  backgroundColor: "#c4c4c4",
                }}
                closeIcon
                open={this.state.showModal2}
                onClose={() => {
                  this.setState({ showModal2: false });
                }}
              >
                <Modal.Content
                  style={{
                    backgroundColor: "#c4c4c4",
                  }}
                >
                  <Modal.Description>
                    <div class="background">
                      <p class="header">
                        Request Join {teamInfo.teamName}?
                      </p>
                      <textarea
                        id="writeAMessage"
                        rows="7"
                        cols="63"
                        placeholder="Write a message..."
                      />
                      <div class="flex-container-modal3">
                        <div>
                          <Button
                            basic
                            color="black"
                            style={{
                              marginTop: 20,
                              borderRadius: 20,
                            }}
                            onClick={() =>
                              this.setState({ showModal2: false })
                            }
                          >
                            Submit
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Modal.Description>
                </Modal.Content>
              </Modal>
            </Menu.Item>
            <Menu.Item>
              <Modal
                trigger={
                  <Button
                    onClick={() => this.setState({ showModal3: true })}
                  >
                    Modal 3
                  </Button>
                }
                style={{
                  padding: 10,
                  backgroundColor: "#c4c4c4",
                }}
                closeIcon
                open={this.state.showModal3}
                onClose={() => {
                  this.setState({ showModal3: false });
                }}
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
                            <UserCard
                              name="Rashmi"
                              school="Georgia Tech"
                              grad_year="2021"
                              experience= "asdfsdGS"
                            />
                            {/* <p class="cardInfo">
                              {user1Info.user1CardInfo}
                            </p> */}
                          </div>
                        </div>
                        <div class="modal3Column2">
                          <div class="modal3Column3">
                            <p>
                              {user1Info.user1FirstName}'s Request Message:
                            </p>
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
                          <Button
                            basic
                            color="black"
                            style={{
                              borderRadius: 20,
                            }}
                            onClick={() =>
                              this.setState({ showModal3: false })
                            }
                          >
                            Accept
                          </Button>
                        </div>
                        <div class="modal3Button">
                          <Button
                            basic
                            color="black"
                            style={{
                              borderRadius: 20,
                            }}
                            onClick={() =>
                              this.setState({ showModal3: false })
                            }
                          >
                            Deny
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Modal.Description>
                </Modal.Content>
              </Modal>
            </Menu.Item>
            <Menu.Item>
              <Modal
                trigger={
                  <Button
                    onClick={() => this.setState({ showModal4: true })}
                  >
                    Modal 4
                  </Button>
                }
                style={{
                  padding: 10,
                  backgroundColor: "#c4c4c4",
                }}
                closeIcon
                open={this.state.showModal4}
                onClose={() => {
                  this.setState({ showModal4: false });
                }}
              >
                <Modal.Content
                  style={{
                    backgroundColor: "#c4c4c4",
                  }}
                >
                  <Modal.Description>
                    <div class="background">
                      <p class="header">
                        Team Up with {user2Info.user2Name}?
                      </p>
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

                            <Button
                              basic
                              color="black"
                              style={{
                                borderRadius: 20,
                                marginTop: 20,
                              }}
                              onClick={() =>
                                this.setState({ showModal4: false })
                              }
                            >
                              Submit
                            </Button>
                          </div>
                        </div>
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
