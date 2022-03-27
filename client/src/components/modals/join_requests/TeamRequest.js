import React, { Component } from "react";
import { Button, Modal } from "semantic-ui-react";
import { commitMutation } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import environment from "../../Environment";
import { Link } from "react-router-dom";
import "../css/Modal.css";
import ConfirmationModal from "../ConfirmationModal";
import truncateTeamName from "../../../constants/functions"

// Mutation to update a user's team status from none to existing
const acceptRequestMutation = graphql`
  mutation TeamRequestMutation($notification_id: String) {
    accept_user_request(notification_id: $notification_id) {
      id
      name
    }
  }
`;

/**
 * Component that comprises the "Join Team" functionality
 * - Displays information to a team-less user about a team
 *   or other user.
 * - Receiving user can accept or deny the request
 */
class TeamRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secondOpen:false,
    };
  }
  render() {

    const sender = this.props.sender
    const senderName = truncateTeamName(sender.name)
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
            <p class="modalHeader">
              {truncateTeamName(senderName)} Wants You to Join Their Team!
            </p>
            <div class="modal1Margins">
              <p class="requestMessage">{senderName + 's'} Request Message:</p>
              <p class="requestMessageBody">{this.props.teamRequestMessage}</p>
              <p class="projectIdea">{senderName + "'s'"} Project Idea:</p>
              <p class="projectIdeaBody">{this.props.teamProjectIdea}</p>

              <div class="flex-container1">
                <div>
                  <Button
                     onClick = {() => {
                        this.props.closeModal();
                     }}
                     as={Link} to={'/team/' + sender.id}
                    className="submit"
                    style={{
                      padding: 12,
                    }}
                  >
                    View more about {senderName}
                  </Button>
                </div>
              </div>
              <div class="flex-container2">
                <div class="buttonMargin">
                  <ConfirmationModal
                  message="You have joined the team!"
                  onClose={() => this.setState({ secondOpen:false})}
                  onOpen={() => this.setState({ secondOpen:true})}
                  open={this.state.secondOpen}
                  ></ConfirmationModal>
                  <Button
                    className="submit"
                    onClick={() => {
                        console.log(this.props.receiver)
                        commitMutation(environment, {
                          mutation: acceptRequestMutation,
                          variables: {
                            notification_id: this.props.notification_id,
                          },
                        });
                      this.props.closeModal();
                      window.location.href = `/team/${sender.id}`
                    }}
                  >
                    Accept
                  </Button>
                </div>
                <div class="buttonMargin">
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
            </div>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
  onViewTeamClick = () => {
    this.props.onTeamPageClick("some team_id");
    this.props.closeModal();
  };
}

export default TeamRequest;
