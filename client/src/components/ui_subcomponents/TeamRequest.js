import React, { Component } from "react";
import { Button, Modal } from "semantic-ui-react";
import "../css/Modal.css";
import ConfirmationModal from "./ConfirmationModal";

class TeamRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secondOpen:false,
    };
  }
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
                  {/* <Modal
                    id="joined-team"
                    class="hidden"
                    onClose={() => {
                      this.props.closeModal();
                    }}
                  >
                    <Modal.Content>
                      <Modal.Description>
                        <p class="modalHeader">
                            You have joined the team!
                        </p>
                        <Button
                          className="submit"
                          onClick={() => {
                            this.props.closeModal();
                          }}
                        >
                          Ok
                        </Button>
                      </Modal.Description>
                    </Modal.Content>
                  </Modal> */}
                  <ConfirmationModal 
                  message="You have joined the team!"
                  onClose={() => this.setState({ secondOpen:false})}
                  onOpen={() => this.setState({ secondOpen:true})}
                  open={this.state.secondOpen}
                  ></ConfirmationModal>
                  <Button
                    className="submit"
                    onClick={() => {
                      // this.props.closeModal();
                      // console.log("HIIIIII" + this.state.secondOpen)
                      this.setState({ secondOpen:true})
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

  // onSubmit = () => {
  //   var obj = ("joined-team");
  //   obj.classList.remove("hidden");
  // };
}

export default TeamRequest;
