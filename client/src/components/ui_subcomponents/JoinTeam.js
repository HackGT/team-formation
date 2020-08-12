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
