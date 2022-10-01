/* eslint-disable */
import React, { Component } from "react";
import { Modal } from "semantic-ui-react";
import { QueryRenderer, commitMutation } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import environment from "../../Environment";
import { Link } from "react-router-dom";
import "../css/Modal.css";
import ConfirmationModal from "./ConfirmationModal";
import truncateTeamName from "../../constants/functions";
import { Box, Flex, Text, Button } from "@chakra-ui/react";

const acceptRequestMutation = graphql`
  mutation TeamRequestMutation($notification_id: String) {
    accept_user_request(notification_id: $notification_id) {
      id
      name
    }
  }
`;

/**
 * Component that comprises the "Join Team" functionality
 * - Displays information to a team-less user about a team
 *   or other user.
 * - Receiving user can accept or deny the request
 */
class TeamRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secondOpen: false,
    };
  }
  render() {
    const sender = this.props.sender;
    const senderName = truncateTeamName(sender.name);
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
            <Text
              sx={{
                align: "center",
                color: "white",
                fontSize: "3xl",
                fontFamily: "Roboto-Regular",
              }}
            >
              {truncateTeamName(senderName)} Wants You to Join Their Team!
            </Text>
            <Box mr="80px" ml="80px">
              <Text
                mt="60px"
                color="white"
                fontFamily="Quicksand-Bold"
                fontSize="15px"
              >
                {senderName + "s"} Request Message:
              </Text>
              <Text
                border="transparent"
                borderRadius="15px"
                p="20px"
                boxShadow="-20px 20px 0px -8px rgba(0, 0, 0, 0.2)"
                color="orange"
                fontFamily="Roboto-regular"
                bg="white"
              >
                {this.props.teamRequestMessage}
              </Text>
              <Text
                mt="30px"
                color="orange"
                fontFamily="Roboto-Regular"
                fontSize="15px"
              >
                {senderName + "'s'"}
              </Text>
              <Text
                border="transparent"
                borderRadius="15px"
                p="20px"
                boxShadow="-20px 20px 0px -8px rgba(0, 0, 0, 0.2)"
                color="orange"
                fontFamily="Roboto-Regular"
                bg="white"
              >
                {this.props.teamProjectIdea}
              </Text>

              <Flex justifyContent="center" mt="35px">
                <Box>
                  <Button
                    onClick={() => {
                      this.props.closeModal();
                    }}
                    as={Link}
                    to={"/team/" + sender.id}
                    borderRadius="12px"
                    color="white"
                    bg="red"
                    fontFamily="Roboto-Regular"
                    fontWeight="700px"
                    p="12px"
                  >
                    View more about {senderName}
                  </Button>
                </Box>
              </Flex>
              <Flex justifyContent="center" mt="20px">
                <Box m="10px">
                  <ConfirmationModal
                    message="You have joined the team!"
                    onClose={() => this.setState({ secondOpen: false })}
                    onOpen={() => this.setState({ secondOpen: true })}
                    open={this.state.secondOpen}
                  ></ConfirmationModal>
                  <Button
                    onClick={() => {
                      console.log(this.props.receiver);
                      commitMutation(environment, {
                        mutation: acceptRequestMutation,
                        variables: {
                          notification_id: this.props.notification_id,
                        },
                      });
                      this.props.closeModal();
                      window.location.href = `/team/${sender.id}`;
                    }}
                    borderRadius="12px"
                    color="white"
                    bg="red"
                    fontFamily="Roboto-Regular"
                    fontWeight="700px"
                  >
                    Accept
                  </Button>
                </Box>
                <Box m="10px">
                  <Button
                    onClick={() => {
                      this.props.closeModal();
                    }}
                    borderRadius="12px"
                    color="white"
                    bg="red"
                    fontFamily="Roboto-Regular"
                    fontWeight="700px"
                  >
                    Deny
                  </Button>
                </Box>
              </Flex>
            </Box>
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
