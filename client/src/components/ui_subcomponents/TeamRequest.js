import React, { Component } from "react";
import { Button, Modal } from "semantic-ui-react";
import "../css/Modal.css";

class TeamRequest extends Component {
  render() {
    return (
      <Modal
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
                {this.props.teamName} Wants You to Join Their Team!
              </p>
              <div class="modal1Margins">
                <p class="requestMessage">
                  {this.props.teamName}'s Request Message:
                </p>
                <p class="requestMessageBody">
                  {this.props.teamRequestMessage}
                </p>
                <p class="projectIdea">{this.props.teamName}'s Project Idea:</p>
                <p class="projectIdeaBody">{this.props.teamProjectIdea}</p>

                <div class="flex-container1">
                  <div>
                    <Button
                      style={{
                        border: "2px solid #F1D180",
                        color: "#F1D180",
                        background: "#8FB6B3",
                        fontFamily: "Lekton-Bold",
                        fontSize: 15,
                      }}
                      onClick={() => {
                        this.props.closeModal();
                      }}
                    >
                      View more about {this.props.teamName}
                    </Button>
                  </div>
                </div>
                <div class="flex-container2">
                  <div class="buttonMargin">
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
                      Accept
                    </Button>
                  </div>
                  <div class="buttonMargin">
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
            </div>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default TeamRequest;
