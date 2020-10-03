import React, { Component } from "react";
import { Button, Modal, Popup } from "semantic-ui-react";
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
            <p class="modalHeader">Team Up With {this.props.name}?</p>
            <div class="row">
              <div class="modal4-column">
                <div class="modal4-column1">
                  <UserCard
                    name={this.props.name}
                    school={this.props.school}
                    grad_year={this.props.grad_year}
                    experience={this.props.experience}
                    skills={this.props.skills}
                    contact={this.props.contact}
                  />
                </div>
              </div>
              <div class="modal3Column2">
                <div class="modal4-column2">
                  <textarea
                    id="introduceYourself"
                    rows="8"
                    cols="68"
                    placeholder="Introduce yourself..."
                    onChange={this.onBioChange}
                  />

                  <div className="rectangle2" />
                  <textarea
                    id="describeProject"
                    rows="8"
                    cols="68"
                    placeholder="Describe your project idea..."
                    onChange={this.onIdeaChange}
                  />
                  {this.state.errorMessage}
                  <div className="popup" />
                  <Button
                    className="submit"
                    style={{
                      marginTop: 25,
                    }}
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
                </div>
              </div>
            </div>
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
