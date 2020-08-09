import React, { Component } from "react";
import { Button, Modal } from "semantic-ui-react";
import "../css/Modal.css";
import UserCard from "../UserCard";
import {commitMutation } from 'react-relay';
import {graphql} from 'babel-plugin-relay/macro';
import environment from '../Environment';

const mutation = graphql`
mutation JoinIndividualMutation($user_id: String, $bio: String, $idea: String) {
  make_user_request(user_id: $user_id, bio: $bio, idea: $idea) {
    id
    message
    bio
    idea
    resolved
  }
}
`;

class JoinIndividual extends Component {
  render() {
    return (
      <Modal
        style={{
          padding: 10,
          backgroundColor: "#8FB6B3",
        }}
        closeIcon
        open={this.props.showModal}
        onClose={() => {
          this.props.closeModal();
        }}
      >
        <Modal.Content
          style={{
            backgroundColor: "#8FB6B3",
          }}
        >
          <Modal.Description>
            <div class="background">
              <p class="header">Team Up with {this.props.name}?</p>
              <div class="row">
                <div class="modal4-column">
                  <div class="modal4-column1">
                    <UserCard
                      name={this.props.name}
                      school={this.props.school}
                      grad_year={this.props.grad_year}
                      experience={this.props.experience}
                      skills={this.props.skills}
                      contact={this.props.contact}
                    />
                  </div>
                </div>
                <div class="modal3Column2">
                  <div class="modal4-column2">
                    <div className="rectangle" />
                    <textarea
                      id="introduceYourself"
                      rows="8"
                      cols="68"
                      placeholder="Introduce yourself..."
                      onChange={this.onBioChange}
                    />

                    <div className="rectangle2" />
                    <textarea
                      id="describeProject"
                      rows="8"
                      cols="68"
                      placeholder="Describe your project idea..."
                      onChange={this.onIdeaChange}
                    />

                    <Button
                      style={{
                        marginTop: 20,
                        border: "2px solid #F1D180",
                        color: "#F1D180",
                        background: "#8FB6B3",
                        fontFamily: "Lekton-Bold",
                        fontSize: 15,
                      }}
                      onClick={() => {
                        this.props.closeModal();
                        commitMutation(
                          environment,
                          {
                            mutation,
                            variables: {
                              user_id: this.props.id,
                              bio: this.state.bio,
                              idea: this.state.idea
                            }
                          }
                        )
                      }}
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
    );
  }
  onBioChange = (e) => {
    this.setState({
      bio: e.target.value
    });
  }

  onIdeaChange = (e) => {
    this.setState({
      idea: e.target.value
    });
  }
}

export default JoinIndividual;
