/* eslint-disable */
import React, { Component } from "react";
import { Button, Modal, Popup } from "semantic-ui-react";
import "../css/Modal.css";
import UserCard from "../profile/UserCard";
import { commitMutation } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import environment from "../auth/Environment";
import { runInThisContext } from "vm";

// Update user's data to include the message sent from this component
const mutation = graphql`
  mutation JoinIndividualMutation(
    $user_id: String
    $bio: String
    $idea: String
  ) {
    make_user_request(user_id: $user_id, bio: $bio, idea: $idea) {
      id
      message
      bio
      idea
      resolved
    }
  }
`;

/**
 * Component that comprises the "Team Up" functionality
 * - Creates modal for user to send info about ideas, bio
 * - Sends data in the form of a notification and message to
 *   the target user.
 */
class JoinIndividual extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openPopup:false,
      errorMessage:"",
    };
  }
  render() {
    return (
      <Modal
        id="modal"
        closeIcon="closeIcon"
        open={this.props.showModal}
        onClose={() => {
          this.props.closeModal();
        }}
      >
        <Modal.Content>
          <Modal.Description>
            <p class="modalHeader">Team Up With {this.props.name}?</p>
            <div class="row">
              <div class="modal4-column">
                <div class="modal4-column1">
                  <UserCard
                    name={this.props.name}
                    school={this.props.school}
                    grad_year={this.props.grad_year}
                    track={this.props.track}
                    experience={this.props.experience}
                    skills={this.props.skills}
                    contact={this.props.contact}
                    location={this.props.location}
                  />
                </div>
              </div>
              <div class="modal3Column2">
                <div class="modal4-column2">
                  <textarea
                    id="introduceYourself"
                    rows="8"
                    cols="68"
                    placeholder="Email subject"
                    onChange={this.onSubjectChange}
                  />

                  <div className="rectangle2" />
                  <textarea
                    id="describeProject"
                    rows="8"
                    cols="68"
                    placeholder="Email message"
                    onChange={this.onMessageChange}
                  />
                  {this.state.errorMessage}
                  <div className="popup" />
                  <Button
                    className="submit"
                    style={{
                      marginTop: 25,
                    }}
                    onClick={async () => {
                      this.setState({ openPopup:true})
                      
                      const myHeaders = new Headers();
                      // TODO: Integrate this with auth api
                      const BEARER_TOKEN="token"
                      myHeaders.append("Authorization", "Bearer " + BEARER_TOKEN);
                      myHeaders.append("Content-Type", "application/json");

                      var raw = JSON.stringify({
                        "message": this.state.message,
                        "emails": [this.props.contact],
                        "subject": this.state.subject,
                      });

                      const res = await fetch("https://notifications.api.hexlabs.org/email/send", {
                        method: 'POST',
                        headers: myHeaders,
                        body: raw,
                        redirect: 'follow'
                      });
                      const val = await res.json();
                      const error = val[0].error;

                      if(!error) {
                        this.props.closeModal();
                      } else {
                        this.setState({ errorMessage:"There is an error here, try again later." });
                      }
                    }}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }

  // State updaters
  onSubjectChange = (e) => {
    this.setState({ subject: e.target.value });
  };

  onMessageChange = (e) => {
    this.setState({ message: e.target.value });
  };
}

export default JoinIndividual;
