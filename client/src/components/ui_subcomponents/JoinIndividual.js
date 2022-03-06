import React, { Component } from "react";
import { Modal, Popup } from "semantic-ui-react";
import { Button, Text, Flex, Box, Textarea } from '@chakra-ui/react';
import "../css/Modal.css";
import UserCard from "../UserCard";
import { commitMutation } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import environment from "../Environment";

const mutation = graphql`
  mutation JoinIndividualMutation(
    $user_id: String
    $bio: String
    $idea: String
  ) {
    make_user_request(user_id: $user_id, bio: $bio, idea: $idea) {
      id
      message
      bio
      idea
      resolved
    }
  }
`;

class JoinIndividual extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openPopup:false,
      errorMessage:"",
    };
  }
  render() {
    // var openPopup = false;
    if(this.props.teamid) {
      // var popup = 
      // <Popup 
      // content="User is already on a team."
      // trigger={<}
      // on="click"
      // hideOnScroll
      // ></Popup>;
    } else {
      // var popup = 
      // <Popup 
      // content="User is already on a team."
      // trigger={id="submitButton"}
      // on="click"
      // hideOnScroll
      // ></Popup>;
    }
    // console.log("Content: "+popup.content)
    // console.log("STATE: "+this.state.openPopup);
    return (
      <Modal
        id="modal"
        closeIcon="closeIcon"
        open={this.props.showModal}
        onClose={() => {
          this.props.closeModal();
        }}
      >
        <Modal.Content>
          <Modal.Description>
            <Text sx={{textAlign: "center", color: "white", fontSize: "30px", fontFamily: "Roboto-Regular"}}>
              Team Up With {this.props.name}?
            </Text>
            <Flex sx={{flexDirection: "row", flexWrap: "wrap", justifyContent: "center", m: "20px"}}>
              <Flex sx={{flexDirection: "column"}}>
                <Box sx={{m: "25px", mt: "0px"}}>
                  <UserCard
                     name={this.props.name}
                    school={this.props.school}
                    grad_year={this.props.grad_year}
                    track={this.props.track}
                    experience={this.props.experience}
                    skills={this.props.skills}
                    contact={this.props.contact}
                    location={this.props.location}
                  />
                </Box>
              </Flex>
              <Box sx={{display: "inline-block", flexDirection: "column", textAlign: "center", flex: "1", minWidth: "270px", maxWidth: "418px"}}>
                <Box sx={{ml: "25px", mr: "25px", textAlign: "center"}}>
                  <Textarea sx={{borderRadius: "15px", pl: "15px", pt: "15px", borderColor: "transparent", boxShadow: "-20px 20px 0px -8px rgba(0, 0, 0, 0.2)", color: "var(--orange)", fontFamily: "Roboto-Regular", resize: "none", w: "100%"}}
                    rows="8"
                    cols="68"
                    placeholder="Introduce yourself..."
                    onChange={this.onBioChange}
                  />

                  <Textarea
                    sx={{mt: "5%", pl: "15px", pt: "15px", borderColor: "transparent", boxShadow: "-20px 20px 0px -8px rgba(0, 0, 0, 0.2)", borderRadius: "15px", color: "var(--orange)", fontFamily: "Roboto-Regular", resize: "none", w: "100%"}}
                    rows="8"
                    cols="68"
                    placeholder="Describe your project idea..."
                    onChange={this.onIdeaChange}
                  />
                  {this.state.errorMessage}
                  <Button
                    sx={{borderRadius: "12px", color: "white", bg: "var(--red)", fontFamily: "Roboto-Regular", fontWeight: "bold", mt: "25px", p: "10px"}}
                    onClick={() => {
                      this.setState({ openPopup:true})
                      commitMutation(environment, {
                        mutation,
                        variables: {
                          user_id: this.props.id,
                          bio: this.state.bio,
                          idea: this.state.idea,
                        },
                        onCompleted: (response, errors) => {
                          console.log("RESPONSE: ",response);
                          console.log("ERRORS: ",errors);
                          if(!errors) {
                            this.props.closeModal();
                          } else if(errors[0].message=="Requested user already on team") {
                              // text="The user is already on a team"
                              console.log("User is on a team");
                              this.setState({ errorMessage:"The user is already on a team" });
                          } else if(errors[0].message=="You are already on a team!") {
                            // text="You are already on a team."
                            this.setState({ errorMessage:"You are already on a team." });
                          } else {
                            this.setState({ errorMessage:"There is an error here, try again later." });
                          }
                        }
                      });
                    }}
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
            </Flex>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
  onBioChange = (e) => {
    this.setState({ bio: e.target.value });
  };

  onIdeaChange = (e) => {
    this.setState({ idea: e.target.value });
  };
}

export default JoinIndividual;
