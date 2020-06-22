import React, { Component } from 'react';
import '../css/Headers.css';
import { Button, Menu, Label, Dropdown } from 'semantic-ui-react';
import { commitMutation } from 'react-relay';
import {graphql} from 'babel-plugin-relay/macro';
import environment from '../Environment';
import { QueryRenderer } from 'react-relay';
import NotificationCard from '../NotificationCard';

const mutation = graphql`
mutation HeaderFeedMutation($uuid: String) {
  toggle_visibility(uuid: $uuid) {
    name
}
}
`
const getName = graphql`
query HeaderFeedNameQuery($uuid: String) {
    user_profile(uuid:$uuid) {
        name
    }
}
`

class Headers extends Component {
  state = {
    showModal1: false,
    showModal2: false,
    showModal3: false,
    showModal4: false,
  };

    render() {
        let toggle_text;
        if (this.props.visible) {
            toggle_text = "Make Profile Public"
        } else {
            toggle_text = "Make Profile Private"
        }
		return (
            <QueryRenderer
                environment={environment}
                query={getName}
                variables={{
                    uuid: this.props.user_id,
                }}
                render={({error,props}) => {
                    if (error) {
                       return <div>{error.message}</div>;
                    } else if (props) {
                        return (
                            <div className="Header-container">
                                <div className="logout-button">
                                    <Menu borderless size={'massive'}>
                                        <Menu.Item>
                                            <b>HackGT Team Formation</b>
                                        </Menu.Item>


                                    <Menu.Menu borderless position='right' size={'massive'}>
                                        <Menu.Item name={props.user_profile.name}/>
                                        <Menu.Item icon='sign out' link={true} href={'/api/user/logout'}/>
                                        <Dropdown item icon='bell' direction='left' closeOnChange={false} >
                                              <Dropdown.Menu className="notification-pane">
                                                <NotificationCard message='test message'/>
                                                <NotificationCard message='test message2'/>
                                                <NotificationCard message='test message3'/>
                                                <NotificationCard message='test message4'/>
                                                <NotificationCard message='test message4'/>
                                                <NotificationCard message='test message4'/>
                                                <NotificationCard message='test message4'/>
                                                <NotificationCard message='test message4'/>
                                                <NotificationCard message='test message4'/>
                                                <NotificationCard message='test message4'/>
                                                <NotificationCard message='test message4'/>
                                              </Dropdown.Menu>
                                        </Dropdown>
                                        <Dropdown item icon='user' direction='left' closeOnChange={false}>
                                          <Dropdown.Menu>
                                            <Dropdown.Item icon='edit' text='Edit Profile' onClick={this.props.onEditClick}/>
                                            <Dropdown.Item icon='globe' text={toggle_text} onClick={this.onToggleClick}/>
                                          </Dropdown.Menu>
                                        </Dropdown>
                                    </Menu.Menu>
                                    </Menu>
                                </div>


                            </div>
                        )
                    }
                }}
            />
		);
    };
    onToggleClick = () => {
        commitMutation(
            environment,
            {
                mutation,
                variables: {
                    uuid: this.props.user_id,
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
                            <UserCard
                              name={user1Info.user1CardName}
                              school={user1Info.user1School}
                              grad_year={user1Info.user1GradYear}
                              experience={user1Info.user1CardInfo}
                              skills={user1Info.user1Skills}
                              contact={user1Info.user1Contact}
                            />
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
                            <UserCard
                              name={user2Info.user2CardName}
                              school={user2Info.user2School}
                              grad_year={user2Info.user2GradYear}
                              experience={user2Info.user2CardInfo}
                              skills={user2Info.user2Skills}
                              contact={user2Info.user2Contact}
                            />
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
