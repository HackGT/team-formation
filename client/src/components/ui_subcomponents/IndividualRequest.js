import React, { Component } from "react";
import { Button, Modal } from "semantic-ui-react";
import "../css/Modal.css";
import UserCard from "../UserCard";

class IndividualRequest extends Component {
  render() {
    return (
      <Modal
        style={{
          padding: 10,
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
              <p class="header">
                {this.props.user1CardName} wants to team up with you!
              </p>
              <div class="row">
                <div class="modal3Column">
                  <div class="modal3Column1">
                    <UserCard
                      name={this.props.user1CardName}
                      school={this.props.user1School}
                      grad_year={this.props.user1GradYear}
                      experience={this.props.user1CardInfo}
                      skills={this.props.user1Skills}
                      contact={this.props.user1Contact}
                    />
                  </div>
                </div>
                <div class="modal3Column2">
                  <div class="modal3Column3">
                    <p>{this.props.user1FirstName}'s Request Message:</p>
                    <p class="user1RequestMessage">
                      {this.props.user1RequestMessage}
                    </p>
                    <p class="user1FirstName">
                      {this.props.user1FirstName}'s Project Idea:
                    </p>
                    <p class="user1ProjectIdea">
                      {this.props.user1ProjectIdea}
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
    );
  }
}

export default IndividualRequest;
