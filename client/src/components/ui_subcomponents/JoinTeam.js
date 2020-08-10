import React, {Component} from "react";
import {Button, Modal} from "semantic-ui-react";
import "../css/Modal.css";
import TeamCard from "../TeamCard";
import {commitMutation} from 'react-relay';
import {graphql} from 'babel-plugin-relay/macro';
import environment from '../Environment';

const mutation = graphql `
mutation JoinTeamMutation($team_id: String, $bio: String, $idea: String) {
  make_team_request(team_id: $team_id, bio: $bio, idea: $idea) {
    id
    idea
    bio
  }
}`
class JoinTeam extends Component {
  render() {
    return (
      <Modal
        style={{
          paddingTop: 10,
          background:
            "linear-gradient(180deg, #656CAE 0%, rgba(255, 255, 255, 0) 100%), #8BB2C2",
        }}
        closeIcon
        open={this.props.showModal}
        onClose={() => {
          this.props.closeModal();
        }}
      >
        <Modal.Content
          style={{
            background:
              "linear-gradient(180deg, #656CAE 0%, rgba(255, 255, 255, 0) 100%), #8BB2C2",
          }}
        >
          <Modal.Description>
            <div class="background">
              <p class="header">Request Join {this.props.teamName}?</p>
              <textarea
                style={{
                  resize: "none",
                  color: "#8895c1",
                  fontFamily: "Quicksand-Bold",
                }}
                id="writeAMessage"
                rows="7"
                cols="63"
                placeholder="Write a message..."
                onChange={this.onBioChange}
              />
              <div class="flex-container-modal3">
                <div>
                  <Button
                    style={{
                      marginTop: 30,
                      borderRadius: 12,
                      color: "white",
                      background: "rgba(255, 255, 255, 0.22)",
                      fontFamily: "Quicksand-Bold",
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
