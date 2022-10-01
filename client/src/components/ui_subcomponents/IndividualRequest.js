/* eslint-disable */
import React, { Component } from "react";
import { Modal } from "semantic-ui-react";
import { QueryRenderer, commitMutation } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import environment from "../../Environment";
import { setState } from "semantic-ui-react";
import "../css/Modal.css";
import UserCard from "../profile/UserCard";
import ConfirmationModalRemove from "./ConfirmationModalRemove";
import { Text, Box, Flex, Button } from "@chakra-ui/react";

// Get the user that you are trying to contact's information
const getUserQuery = graphql`
  query IndividualRequestQuery($user_id: String) {
    user(user_id: $user_id) {
      uuid
      name
      school
      grad_year
      contact
      skills
      experience
      visible
      location
    }
  }
`;

// Mutation to update a notification message for a team-up
const acceptRequestMutation = graphql`
  mutation IndividualRequestMutation($notification_id: String) {
    accept_user_request(notification_id: $notification_id) {
      id
      name
    }
  }
`;

// Mutation to update a notification for joining a team
const acceptTeamRequestMutation = graphql`
  mutation IndividualRequest2Mutation($notification_id: String) {
    accept_team_request(notification_id: $notification_id) {
      id
      name
    }
  }
`;

/**
 * Component that handles the sending of single user requests
 * to other users or teams.
 *
 * Individual-made requests are one type of team-up requests,
 * the other being from the established teams.
 */
class IndividualRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secondOpen: false,
    };

    this.toggleSecondOpen = this.toggleSecondOpen.bind(this);
  }

  // Open the second modal following the first
  toggleSecondOpen() {
    console.log("in toggle");
    this.setState({ secondOpen: true });
  }

  render() {
    const sender = this.props.sender;
    console.log(sender);
    console.log(sender.id);
    return (
      <QueryRenderer
        environment={environment}
        query={getUserQuery}
        variables={{
          user_id: this.props.sender.id,
        }}
        render={({ error, props }) => {
          if (error) {
            return <div>{error.message}</div>;
          } else if (props) {
            return (
              <Modal
                closeIcon="closeIcon"
                open={this.props.showModal}
                onClose={() => {
                  this.props.closeModal();
                }}
              >
                <Modal.Content>
                  <Modal.Description>
                    <Text
                      sx={{
                        textAlign: "center",
                        color: "white",
                        fontSize: "30px",
                        fontFamily: "Roboto-Regular",
                      }}
                    >
                      {props.user.name} Wants to Team Up With You!
                    </Text>
                    <Flex
                      sx={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        margin: "20px",
                      }}
                    >
                      <Box sx={{ mr: "25px", ml: "25px", mb: "25px" }}>
                        <UserCard
                          name={props.user.name}
                          school={props.user.school}
                          grad_year={props.user.grad_year}
                          experience={props.user.experience}
                          skills={props.user.skills}
                          contact={props.user.contact}
                          location={props.user.location}
                        />
                      </Box>
                      <Box
                        sx={{
                          display: "inline-block",
                          flexDirection: "column",
                          textAlign: "center",
                          flex: "1",
                          minWidth: "270px",
                          maxWidth: "418px",
                        }}
                      >
                        <Text
                          sx={{
                            color: "var(--orange)",
                            fontFamily: "Roboto-Regular",
                            fontSize: "15px",
                          }}
                        >
                          {props.user.name + "'s"} Request Message:
                        </Text>
                        <Text
                          sx={{
                            border: "transparent",
                            borderRadius: "15px",
                            p: "20px",
                            boxShadow: "-20px 20px 0px -8px rgba(0, 0, 0, 0.2)",
                            color: "var(--orange)",
                            fontFamily: "Roboto-Regular",
                            bg: "white",
                          }}
                        >
                          {this.props.requestMessage}
                        </Text>
                        <Text
                          sx={{
                            color: "var(--orange)",
                            fontFamily: "Roboto-Regular",
                            fontSize: "15px",
                            mt: "30px",
                          }}
                        >
                          {props.user.name + "'s'"} Project Idea:
                        </Text>
                        <Text
                          sx={{
                            border: "transparent",
                            borderRadius: "15px",
                            p: "20px",
                            boxShadow: "-20px 20px 0px -8px rgba(0, 0, 0, 0.2)",
                            color: "var(--orange)",
                            fontFamily: "Roboto-Regular",
                            bg: "white",
                          }}
                        >
                          {this.props.userProjectIdea}
                        </Text>
                      </Box>
                    </Flex>
                    <Flex sx={{ justifyContent: "center" }}>
                      <Box sx={{ m: "10px" }}>
                        <ConfirmationModalRemove
                          message="You have added them to the team!"
                          closeModal={() =>
                            this.setState({ secondOpen: false })
                          }
                          secondModal={() => this.props.closeModal()}
                          onOpen={() => this.setState({ secondOpen: true })}
                          showModal={this.state.secondOpen}
                        />
                        <Button
                          sx={{
                            borderRadius: "12px",
                            p: "10px",
                            color: "white",
                            bg: "var(--red)",
                            fontFamily: "Roboto-Regular",
                            fontWeight: "bold",
                          }}
                          onClick={() => {
                            console.log(this.props.receiver);
                            const requestMutation =
                              this.props.receiver == "TEAM"
                                ? acceptTeamRequestMutation
                                : acceptRequestMutation;
                            commitMutation(environment, {
                              mutation: requestMutation,
                              variables: {
                                notification_id: this.props.notification_id,
                              },
                            });
                            {
                              /* HIIIIII */
                            }
                            console.log("HIIIIII" + this.state.secondOpen);
                            this.toggleSecondOpen();
                            console.log("HELLO" + this.state.secondOpen);
                          }}
                        >
                          Accept
                        </Button>
                      </Box>
                      <Box sx={{ m: "10px" }}>
                        <Button
                          sx={{
                            borderRadius: "12px",
                            p: "10px",
                            color: "white",
                            bg: "var(--red)",
                            fontFamily: "Roboto-Regular",
                            fontWeight: "bold",
                          }}
                          onClick={() => {
                            this.props.closeModal();
                          }}
                        >
                          Deny
                        </Button>
                      </Box>
                    </Flex>
                  </Modal.Description>
                </Modal.Content>
              </Modal>
            );
          }
        }}
      />
    );
  }
}

export default IndividualRequest;
