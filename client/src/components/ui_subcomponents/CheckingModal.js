import React, { Component } from "react";
import { Modal } from "semantic-ui-react";
import { QueryRenderer, commitMutation } from "react-relay";
import "../css/ConfirmationModal.css";
import onTeam from "../OnTeam";
import UserCard from "../UserCard";
import { graphql } from "babel-plugin-relay/macro";
import environment from "../Environment";
import IndividualRequest from "./IndividualRequest";
import { Button, Box, Flex, Text } from '@chakra-ui/react';

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
            <Flex sx={{flexDirection: "column", textAlign: "center"}}>
              <Box>
                <Text sx={{textAlign: "center", color: "white", fontSize: "30px", fontFamily: "Roboto-Regular"}}>
                  {this.props.message}
                </Text>
              </Box>
              <Flex sx={{justifyContent: "center", mt: "20px"}}>
                <Box>
                  <Button
                    sx={{bg: "rgba(255, 255, 255, 0.22)", color: "white", m: "10px", p: "10px", fontFamily: "Quicksand-Bold", borderRadius: "12px"}}
                    onClick={() => {
                        this.props.closeModal();
                        // this.props.secondModal();
                    }}
                  >Cancel
                  </Button>
                </Box>
                <Box>
                <Button 
                  sx={{bg: "rgba(255, 255, 255, 0.22)", color: "white", m: "10px", p: "10px", fontFamily: "Quicksand-Bold", borderRadius: "12px"}}
                  onClick={() => {
                      this.props.closeModal();
                      this.props.leaveTeam();
                  }}
                >Leave
                </Button>
                </Box>
              </Flex>
            </Flex>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default CheckingModal;
