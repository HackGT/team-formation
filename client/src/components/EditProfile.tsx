import React, { Component, useState } from "react";
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import { Button, Message, Form, Checkbox } from "semantic-ui-react";
import "./css/EditProfile.css";
import allSkills from "../constants/skills";
import years from "../constants/years";
import schools from "../constants/schools";
import Filter from "bad-words";

interface Props {
  name: string;
  track: string;
  location: string;
  skills: string[];
  contact: string;
  visible: Number;
  experience: string;
  grad_year: string;
  school: string;
}

/**
 * Component that comprises the form whenever a user who is logged in
 * clicks on the profile icon in the upper right-hand corner of the page.
 */
const EditProfile: React.FC<Props> = props => {
  const profanityFilter = new Filter();
  let curError;

  // profanity states
  const [nameProfane, setNameProfane] = useState(false);
  const [schoolProfane, setSchoolProfane] = useState(false);
  const [experienceProfane, setExperienceProfane] = useState(false);
  const [contactProfane, setContactProfane] = useState(false);

  // profile states
  const [name, setName] = useState(props.name);
  const updateName = (newName: string) => {
    if (profanityFilter.isProfane(newName)) {
      setNameProfane(true);
      return;
    } else {
      setNameProfane(false);
      setName(newName);
    }
  };

  const [school, setSchool] = useState(props.school);
  const updateSchool = (newSchool: string | undefined) => {
    if (profanityFilter.isProfane(newSchool)) {
      setSchoolProfane(true);
      return;
    } else {
      if (newSchool) {
        setSchoolProfane(false);
        setSchool(newSchool);
      }
    }
  };

  const [gradYear, setGradYear] = useState(props.grad_year);
  const [track, setTrack] = useState(props.track);
  const [skills, setSkills] = useState<Array<string>>(props.skills);

  // for hackGT 9, considering doing email
  const [contact, setContact] = useState(props.contact);
  const updateContact = (newContact: string | undefined) => {
    if (profanityFilter.isProfane(newContact)) {
      setContactProfane(true);
      return;
    } else {
      if (newContact) {
        setContactProfane(false);
        setContact(newContact);
      }
    }
  };

  const [experience, setExperience] = useState(props.experience);
  const updateExp = (newExp: string | undefined) => {
    if (profanityFilter.isProfane(newExp)) {
      setSchoolProfane(true);
      return;
    } else {
      if (newExp) {
        setExperienceProfane(false);
        setExperience(newExp);
      }
    }
  };

  const [visible, setVisible] = useState(props.visible);
  const [location, setLocation] = useState(props.location);

  const [next, setNext] = useState(false);
  const updateProfile = async () => {
    setNext(true);
    //  make a PUT (or POST depending on API implementation) request to update the current user with the form data, which should be stored in the states above.
    // before doing so, though, check to make sure there is nothing profane (reference old code for this)
    // if there is, set curError to the appropriate message (reference old code for this)
  };

  return (
    <div>
      <Form className="form-container">
        <Form.Group>
          <Form.Input
            className="input-container-large"
            label="Full Name"
            placeholder="Full Name"
            defaultValue={props.name}
            onChange={e => updateName(e.target.value)}
            error={nameProfane}
            required="required"
          />
        </Form.Group>
        <Form.Group className="school-and-year">
          <Form.Select
            className="input-container-small"
            label="School"
            placeholder="School"
            defaultValue={props.school}
            onChange={(e, { value }) => updateSchool(value?.toString())}
            error={schoolProfane}
            options={schools}
            required="required"
          />
          <Form.Select
            className="input-container-small"
            required="required"
            label="Year in School"
            defaultValue={props.grad_year}
            onChange={() => setGradYear}
            options={years}
            placeholder="Year in School"
          />
        </Form.Group>
        <Form.Group>
          <Form.Input
            className="input-container-large"
            label="Track"
            defaultValue={props.track}
            onChange={() => setTrack}
          >
            <input defaultValue={props.track} disabled />
          </Form.Input>
        </Form.Group>
        <Form.Group>
          <Form.Input
            className="input-container-large"
            label="Location"
            defaultValue={props.track}
            onChange={() => setLocation}
          >
            <input defaultValue={props.location} disabled />
          </Form.Input>
        </Form.Group>
        <Form.Group>
          <Form.Select
            className="input-container-large"
            label="Skills"
            placeholder="Skills"
            defaultValue={props.skills}
            onChange={() => setSkills}
            fluid
            multiple
            selection="selection"
            search
            options={allSkills}
          />
        </Form.Group>
        <Form.Group>
          <Form.TextArea
            className="input-container-large"
            label="Bio"
            placeholder="Introduce yourself!"
            defaultValue={props.experience}
            onChange={(e, { value }) => updateExp(value?.toString())}
            error={experienceProfane}
          />
        </Form.Group>
        <Form.Group>
          <Form.Input
            className="input-container-large"
            label="Discord Username"
            placeholder="<username>#<4-digit number>"
            defaultValue={props.contact}
            onChange={e => updateContact(e.target.value)}
            error={contactProfane}
            required="required"
          />
        </Form.Group>
        <Form.Group>
          <div className="editCheckbox">
            <Checkbox
              label="Make my profile public"
              onChange={() => setVisible}
              checked={props.visible === 1}
            />
          </div>
        </Form.Group>
        <div className="button-container">
          <Form.Group>
            <Link to="/feed">
              <Button className="save-button">Cancel</Button>
            </Link>
          </Form.Group>
          <Form.Group>
            <Button onClick={() => updateProfile} className="save-button">
              Save
            </Button>
          </Form.Group>
        </div>
        <Form.Group>
          {/* Display the relevant error message */}
          {curError ? curError : ""}
        </Form.Group>
      </Form>
    </div>
  );
};

export default EditProfile;
