import React, { Component } from "react";
import { Button, Modal } from "semantic-ui-react";
import "../css/Modal.css";
import TeamCard from "../TeamCard";
import { commitMutation } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import environment from "../Environment";

const mutation = graphql`
  mutation JoinTeamMutation($team_id: String, $bio: String, $idea: String) {
    make_team_request(team_id: $team_id, bio: $bio, idea: $idea) {
      id
      idea
      bio
    }
  }
`;
class JoinTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage:"",
    };
  }
  render() {
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
            <p class="modalHeader">Request Join {this.props.teamName}?</p>
            <textarea
              id="writeAMessage"
              rows="7"
              cols="63"
              placeholder="Write a message..."
              onChange={this.onBioChange}
            />
            {this.state.errorMessage}
            <div class="flex-container-modal3">
              <div>
                <Button
                  className="submit"
                  style={{
                    marginTop: 30,
                  }}
                  onClick={() => {
                    this.props.closeModal();
                    commitMutation(environment, {
                      mutation,
                      variables: {
                        team_id: this.props.id,
                        bio: this.state.bio,
                      },
                      onCompleted: (response, errors) => {
                        if(!errors) {
                          this.props.closeModal();
                        } else if(errors[0].message=="You are already on a team!") {
                            this.setState({ errorMessage:"You are already on a team" });
                        } else if(errors[0].message=="Team not found") {
                          this.setState({ errorMessage:"The team does not exist anymore." });
                        }
                      }
                    });
                  }}
                >
                  Submit
                </Button>
              </div>
            </div>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
  onBioChange = (e) => {
    this.setState({
      bio: e.target.value,
    });
  };
}

export default JoinTeam;
