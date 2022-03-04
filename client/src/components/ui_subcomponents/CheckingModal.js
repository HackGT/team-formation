import React, { Component } from "react";
import { Button, Modal } from "semantic-ui-react";
import "../css/ConfirmationModal.css";

class CheckingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: true,
        };
        this.toggleClose = this.toggleClose.bind(this)
    }

    toggleClose() {
        console.log("In closed")
        this.setState({showModal: false});
    }
  render() {
    return (
      <Modal
        className="confirmModal"
        closeIcon="closeIcon"
        open={this.props.showModal}
        onClose={() => {
          this.props.closeModal();
        }}
      >
        <Modal.Content>
          <Modal.Description>
            <div className="checkingModal-column">
              <div classNmae="checkingModal-row1">
                <p class="modalHeader">{this.props.message}</p>
              </div>
              <div className="flex-container2">
                <div class="checkingModalCancel">
                  <Button
                  className="cancel"
                  onClick={() => {
                      this.props.closeModal();
                  }}
                  >Cancel</Button>
                </div>
                <div class="checkingModalHere">
                  <Button 
                  className="here"
                  onClick={() => {
                      this.props.closeModal();
                      this.props.leaveTeam();
                  }}
                  >Leave</Button>
                </div>
              </div>
            </div>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default CheckingModal;
