import React, { Component } from "react";
import { Button, Modal } from "semantic-ui-react";
import { QueryRenderer, commitMutation } from "react-relay";
import "../css/ConfirmationModal.css";
import UserCard from "../UserCard";
import { graphql } from "babel-plugin-relay/macro";
import environment from "../Environment";
import IndividualRequest from "./IndividualRequest"

// const mutation = graphql`
//   mutation JoinIndividualMutation(
//     $user_id: String
//     $bio: String
//     $idea: String
//   ) {
//     make_user_request(user_id: $user_id, bio: $bio, idea: $idea) {
//       id
//       message
//       bio
//       idea
//       resolved
//     }
//   }
// `;

class ConfirmationModalRemove extends Component {
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
