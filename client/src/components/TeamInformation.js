import React, { Component } from "react";
import {
  Card,
  Form,
  TextArea,
  Button,
  Label,
  Icon,
  Message,
} from "semantic-ui-react";
import "./css/TeamInformation.css";
import skills from "../constants/skills";
import { commitMutation } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import environment from "./Environment";

const mutation = graphql`
  mutation TeamInformationMutation(
    $picture: String
    $interests: [String]
    $description: String
    $project_idea: String
  ) {
    update_team(
      picture: $picture
      interests: $interests
      description: $description
      project_idea: $project_idea
    ) {
      picture
      interests
      description
      project_idea
    }
  }
`;

class TeamInformation extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    teamBio: this.props.teamBio,
    newTeamBio: this.props.teamBio,
    projectIdea: this.props.projectIdea,
    newProjectIdea: this.props.projectIdea,
    active: false,
    interests: this.props.interests,
    newInterests: this.props.interests,
    search: "",
    interest_options: skills,
    save_message_hidden: true,
    save_success: false,
    edit: false,
  };

  render() {
    var colors = ["#A0CCC9", "#EBABCA"];
    var count = 0;
    var interestLabels = this.state.interests.map((interest) => (
      <Label
        size="mini"
        className="labelStyle"
        style={{
          backgroundColor: colors[count++ % 2],
        }}
      >
        {interest}
      </Label>
    ));
    console.log(this.state.interests)
    if (this.props.editable) {
      if (!this.state.edit) {
        console.log(this.state.teamBio);
        return (
          <div className="team-card-container">
            <Card fluid="fluid">
              <Card.Content className="card-content">
                <div className="header">
                  <Card.Header className="card-header">
                    Team Information
                  </Card.Header>
                  <Button icon labelPosition="right" onClick={this.onEditClick}>
                    Edit
                    <Icon name="edit" />
                  </Button>
                </div>
                <Form className="form">
                  <Form.Field
                    control={TextArea}
                    label="Team Bio"
                    value={this.state.teamBio}
                    style={{
                      minHeight: 150,
                      resize: "none",
                    }}
                    disabled="disabled"
                  />
                  <Form.Field
                    control={TextArea}
                    label="Project Idea"
                    value={this.state.projectIdea}
                    style={{
                      minHeight: 150,
                      resize: "none",
                    }}
                    disabled="disabled"
                  />
                </Form>
                <Card.Description className="interests">Interests</Card.Description>
                <Card.Description>{interestLabels}</Card.Description>
              </Card.Content>
            </Card>
          </div>
        );
      } else {
        return (
          <div className="team-card-container">
            <Card fluid="fluid">
              <Card.Content className="card-content">
                <Card.Header className="card-header">
                  Team Information
                </Card.Header>
                <Form className="form" success>
                  <Form.Field
                    defaultValue={this.state.teamBio}
                    onChange={this.onTeamBioChange}
                    control={TextArea}
                    className="input"
                    label="Team Bio"
                    placeholder="Tell us about your team"
                  />
                  <Form.Field
                    defaultValue={this.state.projectIdea}
                    onChange={this.onProjectIdeaChange}
                    className="input"
                    control={TextArea}
                    label="Project Idea"
                    placeholder="Describe any ideas you have for a potential project"
                  />
                  <Form.Dropdown
                    defaultValue={this.state.interests}
                    label="Interests"
                    options={this.state.interest_options}
                    placeholder="Select Interests"
                    search="search"
                    selection="selection"
                    fluid="fluid"
                    multiple="multiple"
                    allowAdditions="allowAdditions"
                    onAddItem={this.handleAddition}
                    onChange={this.handleChange}
                  />
                  {/* <Message hidden={this.state.save_message_hidden} success={this.state.save_success} header={this.state.save_success ? "Changes Saved" : "Unsaved Changes"}/> */}
                </Form>
                <Button icon labelPosition="right" onClick={this.onSaveClick}>
                  Save
                  <Icon name="save" />
                </Button>
                <Button icon labelPosition="right" onClick={this.onCancelClick}>
                  Cancel
                  <Icon name="cancel" />
                </Button>
              </Card.Content>
            </Card>
          </div>
        );
      }
    } else {
      return (
        <div className="team-card-container">
          <Card fluid="fluid">
            <Card.Content className="card-content">
              <Card.Header className="card-header">
                Team Information
              </Card.Header>
              <Form className="form">
                <Form.Field
                  className="input"
                  control={TextArea}
                  label="Team Bio"
                  defaultValue={this.props.teamBio}
                  style={{
                    minHeight: 150,
                    resize: "none",
                  }}
                  disabled="disabled"
                />
                <Form.Field
                  className="input"
                  control={TextArea}
                  label="Project Idea"
                  defaultValue={this.props.projectIdea}
                  style={{
                    minHeight: 150,
                    resize: "none",
                  }}
                  disabled="disabled"
                />
              </Form>
              <Card.Description>Interests</Card.Description>
              <Card.Description>{interestLabels}</Card.Description>
            </Card.Content>
          </Card>
        </div>
      );
    }
  }

  onTeamBioChange = (e) => {
    this.onChange();
    this.setState({ newTeamBio: e.target.value });
  };

  onProjectIdeaChange = (e) => {
    this.onChange();
    this.setState({ newProjectIdea: e.target.value });
  };

  onChange = () => {
    console.log("new edits");
    this.setState({
      save_message_hidden: false,
      save_success: false,
    });
  };

  onEditClick = () => {
    console.log("team information edits enabled..");
    this.setState({ edit: true });
  };

  onSaveClick = () => {
    console.log("team information edits saved..");
    this.setState({
      edit: false,
      interests: this.state.newInterests,
      teamBio: this.state.newTeamBio,
      projectIdea: this.state.newProjectIdea,
    });
    commitMutation(environment, {
      mutation,
      variables: {
        interests: this.state.newInterests,
        description: this.state.newTeamBio,
        project_idea: this.state.newProjectIdea,
      },
    });
  };

  onCancelClick = () => {
    console.log("team information edits canceled..");
    console.log(this.state.teamBio);
    this.setState({ edit: false });
  };

  handleAddition = (e, { value }) => {
    console.log(value);
    this.setState((prevState) => ({
      interest_options: [
        {
          text: value,
          value,
        },
        ...prevState.interest_options,
      ],
    }));
  };

  handleChange = (e, { value }) => {
    this.onChange();
    this.setState({ newInterests: value });
  };

}

export default TeamInformation;
