import React, { Component } from "react";
import { Modal } from "semantic-ui-react";
import { QueryRenderer, commitMutation } from "react-relay";
import "../css/ConfirmationModal.css";
import UserCard from "../UserCard";
import { graphql } from "babel-plugin-relay/macro";
import environment from "../Environment";
import IndividualRequest from "./IndividualRequest";
import { Button, Text } from '@chakra-ui/react';

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
            <Text sx={{textAlign: "center", color: "white", fontSize: "30px", fontFamily: "Roboto-Regular", p: "10px"}}>
              {this.props.message}
            </Text>
            <Button 
            sx={{ml: "173px"}}
            onClick={() => {
                this.props.closeModal();
                // this.props.secondModal();
            }}
            >Ok
            </Button>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default ConfirmationModal;
