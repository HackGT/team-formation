import React, { Component } from "react";
import { Button, Modal } from "semantic-ui-react";
import { QueryRenderer, commitMutation } from 'react-relay';
import { graphql } from 'babel-plugin-relay/macro';
import environment from '../Environment';
import "../css/Modal.css";
import UserCard from "../UserCard";

const getUserQuery = graphql`
    query IndividualRequestQuery($user_id: String) {
        user(user_id:$user_id) {
            name
            school
            grad_year
            contact
            skills
            experience
            visible
            uuid
        }
    }
`;

const acceptRequestMutation = graphql`
    mutation IndividualRequestMutation($notification_id: String) {
        accept_user_request(notification_id: $notification_id) {
            id
            name
        }
    }
`;

class IndividualRequest extends Component {
  render() {
    const sender = this.props.sender
    console.log("INDIVIDUAL HERE")
    console.log(this.props.showModal)
    return (
        <QueryRenderer
            environment={environment}
            query={getUserQuery}
            variables={{
                user_id: this.props.sender.id,
            }}
            render={({error,props}) => {
                if (error) {
                   return <div>{error.message}</div>;
                } else if (props) {
                    return (
                        <Modal
                          style={{
                            padding: 10,
                            backgroundColor: "#8fb6b3",
                          }}
                          closeIcon
                          open={this.props.showModal}
                          onClose={() => {
                            this.props.closeModal();
                          }}
                        >
                          <Modal.Content
                            style={{
                              backgroundColor: "#8fb6b3",
                            }}
                          >
                            <Modal.Description>
                              <div class="background">
                                <p class="modalHeader">
                                  {props.user.name} Wants to Team Up With You!
                                </p>
                                <div class="row">
                                  <div class="modal3Column">
                                    <div class="modal3Column1">
                                      <UserCard
                                        name={props.user.name}
                                        school={props.user.school}
                                        grad_year={props.user.grad_year}
                                        experience={props.user.experience}
                                        skills={props.user.skills}
                                        contact={props.user.contact}
                                      />
                                    </div>
                                  </div>
                                  <div class="modal3Column2">
                                    <div class="modal3Column3">
                                      <p class="user1RequestMessageName">
                                        {props.user.name}'s Request Message:
                                      </p>
                                      <p class="user1RequestMessage">
                                        {this.props.userRequestMessage}
                                      </p>
                                      <p class="user1FirstName">
                                        {props.user.name}'s Project Idea:
                                      </p>
                                      <p class="user1ProjectIdea">{this.props.userProjectIdea}</p>
                                    </div>
                                  </div>
                                </div>
                                <div class="flex-container-modal3">
                                  <div class="modal3Button">
                                    <Button
                                      style={{
                                        border: "2px solid #F1D180",
                                        color: "#F1D180",
                                        background: "#8FB6B3",
                                        fontFamily: "Lekton-Bold",
                                      }}
                                      onClick={() => {
                                        commitMutation(
                                            environment,
                                            {
                                                mutation: acceptRequestMutation,
                                                variables: {
                                                    notification_id: this.props.notification_id
                                                }
                                            }
                                        )
                                        this.props.closeModal();
                                      }}
                                    >
                                      Accept
                                    </Button>
                                  </div>
                                  <div class="modal3Button">
                                    <Button
                                      style={{
                                        border: "2px solid #F1D180",
                                        color: "#F1D180",
                                        background: "#8FB6B3",
                                        fontFamily: "Lekton-Bold",
                                      }}
                                      onClick={() => {
                                        this.props.closeModal();
                                      }}
                                    >
                                      Deny
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </Modal.Description>
                          </Modal.Content>
                        </Modal>
                    )
                }
            }}
        />
    );
  }
}

export default IndividualRequest;
