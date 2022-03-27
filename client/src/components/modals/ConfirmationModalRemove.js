import React, { Component } from "react";
import { Button, Modal } from "semantic-ui-react";
import "../css/ConfirmationModal.css";

// Confirmation of the removal of teammates
/*
Note: This is an exact duplicate of ConfirmationModal.js
Condition: REDUNDANT
Suggestion: Refactor any mention of this to use the other component
as there is no need for two of the same.
*/
class ConfirmationModalRemove extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: true,
        };
        this.toggleClose = this.toggleClose.bind(this)
    }

    // closes the modal
    toggleClose() {
        console.log("In closed")
        this.setState({showModal: false});
    }
  render() {
    //   this.props.secondModal();
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
            <p class="modalHeader">{this.props.message}</p>
            <Button 
            className="done"
            onClick={() => {
                this.props.closeModal();
                this.props.secondModal();
            }}
            >Ok</Button>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default ConfirmationModalRemove;
