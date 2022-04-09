/* eslint-disable */
import React, { Component } from "react";
import { Button, Modal } from "semantic-ui-react";
import { QueryRenderer, commitMutation } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import environment from "../auth/Environment";
import { setState } from "semantic-ui-react";
import "../css/Modal.css";
import UserCard from "../profile/UserCard";
import ConfirmationModalRemove from "./ConfirmationModalRemove";

// Get the user that you are trying to contact's information
const getUserQuery = graphql`
  query IndividualRequestQuery($user_id: String) {
    user(user_id: $user_id) {
      uuid
      name
      school
      grad_year
      contact
      skills
      experience
      visible
      location
    }
  }
`;

// Mutation to update a notification message for a team-up
const acceptRequestMutation = graphql`
  mutation IndividualRequestMutation($notification_id: String) {
    accept_user_request(notification_id: $notification_id) {
      id
      name
    }
  }
`;

// Mutation to update a notification for joining a team
const acceptTeamRequestMutation = graphql`
  mutation IndividualRequest2Mutation($notification_id: String) {
    accept_team_request(notification_id: $notification_id) {
      id
      name
    }
  }
`;

/**
 * Component that handles the sending of single user requests
 * to other users or teams.
 * 
 * Individual-made requests are one type of team-up requests,
 * the other being from the established teams.
 */
class IndividualRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secondOpen:false,
    };

    this.toggleSecondOpen = this.toggleSecondOpen.bind(this)
  }

  // Open the second modal following the first
  toggleSecondOpen() {
    console.log("in toggle");
    this.setState({secondOpen: true});
  }

  render() {
    const sender = this.props.sender;
    console.log(sender)
    console.log(sender.id)
    return (
      <QueryRenderer
        environment={environment}
        query={getUserQuery}
        variables={{
          user_id: this.props.sender.id,
        }}
        render={({ error, props }) => {
          if (error) {
            return <div>{error.message}</div>;
          } else if (props) {
            return (
              <Modal
                closeIcon="closeIcon"
                open={this.props.showModal}
                onClose={() => {
                  this.props.closeModal();
                }}
              >
                <Modal.Content>
                  <Modal.Description>
                    <p class="modalHeader">
                      {props.user.name} Wants to Team Up With You!
                    </p>
                    <div class="row">
                      <div class="modal3Column1">
                        <UserCard
                          name={props.user.name}
                          school={props.user.school}
                          grad_year={props.user.grad_year}
                          experience={props.user.experience}
                          skills={props.user.skills}
                          contact={props.user.contact}
                          location={props.user.location}
                        />
                      </div>
                      <div class="modal3Column2">
                        <p class="user1FirstName">
                          {props.user.name + "'s"} Request Message:
                        </p>
                        <p class="user1RequestMessage">
                          {this.props.requestMessage}
                        </p>
                        <p
                          class="user1FirstName"
                          style={{
                            marginTop: 30,
                          }}
                        >
                          {props.user.name + "'s'"} Project Idea:
                        </p>
                        <p class="user1ProjectIdea">
                          {this.props.userProjectIdea}
                        </p>
                      </div>
                    </div>
                    {/* Hidden second modal within the first */}
                    <div class="flex-container-modal3">
                      <div class="modal3Button">
                      <ConfirmationModalRemove
                      message="You have added them to the team!"
                      closeModal={() => this.setState({ secondOpen:false})}
                      secondModal={() => this.props.closeModal()}
                      onOpen={() => this.setState({ secondOpen:true})}
                      showModal={this.state.secondOpen}

                      />
                        <Button
                          className="submit"
                          onClick={() => {
                            console.log(this.props.receiver)
                            const requestMutation =
                            (this.props.receiver == 'TEAM') ? acceptTeamRequestMutation : acceptRequestMutation;
                            commitMutation(environment, {
                              mutation: requestMutation,
                              variables: {
                                notification_id: this.props.notification_id,
                              },
                            });
                            {/* HIIIIII */}
                            console.log("HIIIIII" + this.state.secondOpen)
                            this.toggleSecondOpen();
                            console.log("HELLO" + this.state.secondOpen)
                          }}
                        >
                          Accept
                        </Button>
                      </div>
                      <div class="modal3Button">
                        <Button
                          className="submit"
                          onClick={() => {
                            this.props.closeModal();
                          }}
                        >
                          Deny
                        </Button>
                      </div>
                    </div>
                  </Modal.Description>
                </Modal.Content>
              </Modal>
            );
          }
        }}
      />
    );
  }
}

export default IndividualRequest;
