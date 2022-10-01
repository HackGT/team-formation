/* eslint-disable */
import React, { Component } from "react";
import { Button, Modal } from "semantic-ui-react";
import "../css/Modal.css";
import TeamCard from "./TeamCard";
import { commitMutation } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import environment from "../../Environment";
import ConfirmationModal from "../ui_subcomponents/ConfirmationModal";

// Updates user to have sent a request to a team to join
const mutation = graphql`
  mutation JoinTeamMutation($team_id: String, $bio: String, $idea: String) {
    make_team_request(team_id: $team_id, bio: $bio, idea: $idea) {
      id
      idea
      bio
    }
  }
`;

/**
 * Component that comprises the "Ask to Join" team functionality
 * - Creates modal for user to input information
 * - Sends message to team members (visible on the team page)
 */
class JoinTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: "",
    };

    this.toggleSecondOpen = this.toggleSecondOpen.bind(this);
  }

  // Opens second modal
  toggleSecondOpen() {
    console.log("in toggle");
    this.props.showSecond();
  }

  render() {
    console.log("TEAM", this.props.team);

    return (
      <Modal
        closeIcon
        open={this.props.showModal}
        onClose={() => {
          this.props.closeModal();
        }}
      >
        <Modal.Content>
          <Modal.Description>
            <p class="modalHeader">Request to join {this.props.name}?</p>
            <textarea
              id="writeAMessage"
              placeholder="Write a message..."
              onChange={this.onBioChange}
            />
            <div className="error">{this.state.errorMessage}</div>
            <div class="flex-container-modal3">
              <div>
                {/* <ConfirmationModal
                    message="Your request to join the team has been sent!"
                    closeModal={() => this.setState({ secondOpen:false})}
                    secondModal={() => this.props.closeModal()}
                    onOpen={() => this.setState({ secondOpen:true})}
                    showModal={this.state.secondOpen}
                  /> */}
                <Button
                  className="submit"
                  style={{
                    marginTop: 30,
                  }}
                  onClick={() => {
                    // this.props.closeModal();
                    commitMutation(environment, {
                      mutation,
                      variables: {
                        team_id: this.props.id,
                        bio: this.state.bio,
                      },
                      onCompleted: (response, errors) => {
                        if (!errors) {
                          this.props.closeModal();
                          this.props.showSecond();
                        } else if (
                          errors[0].message == "You are already on a team!"
                        ) {
                          this.setState({
                            errorMessage: "You are already on a team",
                          });
                        } else if (errors[0].message == "Team not found") {
                          this.setState({
                            errorMessage: "The team does not exist anymore.",
                          });
                        }
                      },
                    });
                  }}
                >
                  Submit
                </Button>
              </div>
            </div>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
  onBioChange = (e) => {
    this.setState({
      bio: e.target.value,
    });
  };
}

export default JoinTeam;
