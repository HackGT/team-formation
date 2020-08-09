import React, { Component } from "react";
import { Button, Modal } from "semantic-ui-react";
import "../css/Modal.css";

class TeamRequest extends Component {
  render() {
    return (
      <Modal
        style={{
          padding: 10,
          background:
            "linear-gradient(180deg, #656CAE 0%, rgba(255, 255, 255, 0) 100%), #8BB2C2",
        }}
        closeIcon
        open={this.props.showModal}
        onClose={() => {
          this.props.closeModal();
        }}
      >
        <Modal.Content
          style={{
            background:
              "linear-gradient(180deg, #656CAE 0%, rgba(255, 255, 255, 0) 100%), #8BB2C2",
          }}
        >
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
                      style={{
                        borderRadius: 12,
                        color: "white",
                        background: "rgba(255, 255, 255, 0.22)",
                        fontFamily: "Quicksand-Bold",
                        padding: 12,
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
                        borderRadius: 12,
                        color: "white",
                        background: "rgba(255, 255, 255, 0.22)",
                        fontFamily: "Quicksand-Bold",
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
                        borderRadius: 12,
                        color: "white",
                        background: "rgba(255, 255, 255, 0.22)",
                        fontFamily: "Quicksand-Bold",
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
