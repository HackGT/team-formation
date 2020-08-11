import React, { Component } from "react";
import { Button, Modal } from "semantic-ui-react";
import "../css/Modal.css";

class TeamRequest extends Component {
  render() {
    const sender = this.props.sender;
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
              {sender.name} Wants You to Join Their Team!
            </p>
            <div class="modal1Margins">
              <p class="requestMessage">{sender.name}'s Request Message:</p>
              <p class="requestMessageBody">{this.props.teamRequestMessage}</p>
              <p class="projectIdea">{sender.name}'s Project Idea:</p>
              <p class="projectIdeaBody">{this.props.teamProjectIdea}</p>

              <div class="flex-container1">
                <div>
                  <Button
                    className="submit"
                    style={{
                      padding: 12,
                    }}
                    onClick={this.onViewTeamClick}
                  >
                    View more about {sender.name}
                  </Button>
                </div>
              </div>
              <div class="flex-container2">
                <div class="buttonMargin">
                  <Button
                    className="submit"
                    onClick={() => {
                      this.props.closeModal();
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
