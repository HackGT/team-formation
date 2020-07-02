import React, { Component } from "react";
import { Button, Modal } from "semantic-ui-react";
import "../css/Modal.css";

class TeamRequest extends Component {
  render() {
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
        <Modal.Content>
          <Modal.Description>
            <div class="background">
              <p class="header">
                {this.props.teamName} wants you to join their team!
              </p>
              <div class="modal1Margins">
                <p class="requestMessage">
                  {this.props.teamName}'s request message:
                </p>
                <p class="requestMessageBody">
                  {this.props.teamRequestMessage}
                </p>
                <p class="projectIdea">{this.props.teamName}'s project idea:</p>
                <p class="projectIdeaBody">{this.props.teamProjectIdea}</p>

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
                      onClick={this.onViewTeamClick}
                    >
                      View more about {this.props.teamName}
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
                      onClick={() => {
                        this.props.closeModal();
                      }}
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
                      onClick={() => {
                        this.props.closeModal();
                      }}
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
    );
  }
  onViewTeamClick = () => {
    this.props.onTeamPageClick("some team_id");
    this.props.closeModal();
  };
}

export default TeamRequest;
