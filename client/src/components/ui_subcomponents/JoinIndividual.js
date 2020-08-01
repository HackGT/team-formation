import React, { Component } from "react";
import { Button, Modal } from "semantic-ui-react";
import "../css/Modal.css";
import UserCard from "../UserCard";

class JoinIndividual extends Component {
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
              <p class="header">Team Up with {this.props.user2Name}?</p>
              <div class="row">
                <div class="modal4-column">
                  <div class="modal4-column1">
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
                  <div class="modal4-column2">
                    <textarea
                      id="introduceYourself"
                      rows="8"
                      cols="68"
                      placeholder="Introduce yourself..."
                    />

                    <textarea
                      id="describeProject"
                      rows="8"
                      cols="68"
                      placeholder="Describe your project idea..."
                    />
                
                    <Button
                      basic="basic"
                      color="black"
                      style={{
                        borderRadius: 20,
                        marginTop: 20,
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
            </div>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default JoinIndividual;
