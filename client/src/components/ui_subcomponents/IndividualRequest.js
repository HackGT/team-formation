import React, { Component } from "react";
import { Button, Modal } from "semantic-ui-react";
import { QueryRenderer, commitMutation } from 'react-relay';
import { graphql } from 'babel-plugin-relay/macro';
import environment from '../Environment';
import "../css/Modal.css";
import UserCard from "../UserCard";

const getUserQuery = graphql`
    query IndividualRequestQuery($user_id: String) {
        query_user(user_id:$user_id) {
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
    mutation IndividualRequestMutation($user_id: String) {
        join_users_in_team(user2: $user_id) {
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
                          }}
                          closeIcon
                          open={this.props.showModal}
                          onClose={() => {
                            this.props.closeModal();
                          }}
                        >
                          <Modal.Content
                          >
                            <Modal.Description>
                              <div class="background">
                                <p class="header">
                                  {sender.name} wants to team up with you!
                                </p>
                                <div class="row">
                                  <div class="modal3Column">
                                    <div class="modal3Column1">
                                      <UserCard
                                        name={props.query_user.name}
                                        school={props.query_user.school}
                                        grad_year={props.query_user.grad_year}
                                        experience={props.query_user.experience}
                                        skills={props.query_user.skills}
                                        contact={props.query_user.contact}
                                      />
                                    </div>
                                  </div>
                                  <div class="modal3Column2">
                                    <div class="modal3Column3">
                                      <p>{sender.name}'s Request Message:</p>
                                      <p class="user1RequestMessage">
                                        {this.props.requestMessage}
                                      </p>
                                      <p class="user1FirstName">
                                        {sender.name}'s Project Idea:
                                      </p>
                                      <p class="user1ProjectIdea">
                                        {this.props.userProjectIdea}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div class="flex-container-modal3">
                                  <div class="modal3Button">
                                    <Button
                                      basic="basic"
                                      color="black"
                                      style={{
                                        borderRadius: 20,
                                      }}
                                      onClick={() => {
                                        commitMutation(
                                            environment,
                                            {
                                                mutation: acceptRequestMutation,
                                                variables: {
                                                    user_id: this.props.sender_id
                                                }
                                            }
                                        )
                                        console.log("done!")
                                        this.props.closeModal();
                                      }}
                                    >
                                      Accept
                                    </Button>
                                  </div>
                                  <div class="modal3Button">
                                    <Button
                                      basic="basic"
                                      color="black"
                                      style={{
                                        borderRadius: 20,
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
