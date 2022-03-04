import React, { Component } from "react";
import { Button, Modal } from "semantic-ui-react";
import "../css/ConfirmationModal.css";

class ConfirmationModal extends Component {
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
            <p class="modalHeader">{this.props.message}</p>
            <Button 
            className="done"
            onClick={() => {
                this.props.closeModal();
                // this.props.secondModal();
            }}
            >Ok</Button>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default ConfirmationModal;
