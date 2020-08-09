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
              <p class="header">{this.props.name} wants to team up with you!</p>
              <div class="row">
                <div class="modal3Column">
                  <div class="modal3Column1">
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
                  <div class="modal3Column3">
                    <p class="user1FirstName">
                      {this.props.name}'s Request Message:
                    </p>
                    <p class="user1RequestMessage">
                      {this.props.userRequestMessage}
                    </p>
                    <p
                      class="user1FirstName"
                      style={{
                        marginTop: 30,
                      }}
                    >
                      {this.props.name}'s Project Idea:
                    </p>
                    <p class="user1ProjectIdea">{this.props.userProjectIdea}</p>
                  </div>
                </div>
              </div>
              <div class="flex-container-modal3">
                <div class="modal3Button">
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
                <div class="modal3Button">
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
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default IndividualRequest;
