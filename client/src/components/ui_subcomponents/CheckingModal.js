import React, { Component } from "react";
import { Button, Modal } from "semantic-ui-react";
import { QueryRenderer, commitMutation } from "react-relay";
import "../css/ConfirmationModal.css";
import onTeam from "../OnTeam";
import UserCard from "../UserCard";
import { graphql } from "babel-plugin-relay/macro";
import environment from "../Environment";
import IndividualRequest from "./IndividualRequest";

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
// const leaveTeamMutation = graphql`
//   mutation CheckingModalMutation {
//     leave_team {
//       name
//     }
//   }
// `;

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
            <Button basic
            className="cancel"
            onClick={() => {
                this.props.closeModal();
                // this.props.secondModal();
            }}
            >Cancel</Button>
            <Button 
            className="here"
            onClick={() => {
                this.props.closeModal();
                this.props.leaveTeam();
            }}
            >Leave</Button>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default CheckingModal;
