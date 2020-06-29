import React, { Component } from "react";
import { Button, Modal } from "semantic-ui-react";
import "../css/Modal.css";

class JoinTeam extends Component {
  render() {
    return (
      <Modal
        style={{
          paddingTop: 10,
          backgroundColor: "#c4c4c4",
        }}
        closeIcon
        open={this.props.showModal}
        onClose={() => {
          this.props.closeModal();
        }}
      >
        <Modal.Content
          style={{
            backgroundColor: "#c4c4c4",
          }}
        >
          <Modal.Description>
            <div class="background">
              <p class="header">Request Join {this.props.teamName}?</p>
              <textarea
                id="writeAMessage"
                rows="7"
                cols="63"
                placeholder="Write a message..."
              />
              <div class="flex-container-modal3">
                <div>
                  <Button
                    basic="basic"
                    color="black"
                    style={{
                      marginTop: 20,
                      borderRadius: 20,
                    }}
                    onClick={() => {
                      this.props.closeModal();
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
}

export default JoinTeam;
