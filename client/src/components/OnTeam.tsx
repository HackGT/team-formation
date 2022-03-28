import React, { useState } from "react";
import {Form, Button} from "semantic-ui-react";
import TeamInformation from "./TeamInformation";
import JoinTeam from "./ui_subcomponents/JoinTeam";
import CheckingModal from "./ui_subcomponents/CheckingModal";
import TeamNotifications from "./TeamNotifications";
import TeamRequestsSent from "./TeamRequestsSent";
import Members from "./Members";
import "./css/TeamPage.css";
import { Team } from "../types";

interface Props {
  team: Team
}

const OnTeam: React.FC<Props> = (props) => {
  const [name, setName] = useState(props.team.name);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [saveMessageHidden, setSaveMessageHidden] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showCheckModal, setShowCheckModal] = useState(false);

  // mainly used to remove a user from a team
  const updateUserTeamStatus = async (status: boolean) => {
    if (!status) {
      // remove the current user from the team
      // to do so, make a POST request to the route "/teams/leave"
      // reference https://github.com/HackGT/api/issues/25 for further details on the route
      // for now implement the general functionality, the main route for this will be an environment variable
    }
  }

  // for CSS reasons
  const calculateWidth = () => {
    if (props.team.name) {
      return (props.team.name.length < 82) ? `${props.team.name.length + 10}ch` : `90ch`;
    } else {
      return `10ch`
    }
  }

  // with the use of requests, async and await come into play
  const onBlur = async () => {
    setSaveMessageHidden(false);
    setSaveSuccess(true);
    
    // update team method
    // here make a POST request to TBD (there is not a route for this yet)
  }

  const updateTeamName = (e: string) => {
    setName(e);
    let input = document.getElementById('field');
    if (input) {
      input.style.width = calculateWidth();
    }
    // update the team name via api
    // that is, make a POST request to TBD
  }

  return (
      <div id="on-team" className="team-page">
        <h1 id="header">
          <Form.Input
            id="field"
            defaultValue={props.team.name}
            onBlur={onBlur}
            onChange={e => updateTeamName(e.target.value)}
            className="input"
            icon="pencil"
            style={{
              width: calculateWidth()
            }}
          />
        </h1>
        <Button
          className="leaveTeam"
          onClick={() => {
            setShowCheckModal(true);
          }}
        >
          Leave Team
        </Button>
        <CheckingModal
            message="Are you sure you want to leave the team?"
            closeModal={() => setShowCheckModal(false)}
            showModal={showCheckModal}
            InTeam={updateUserTeamStatus}
            >
          </CheckingModal>
        <JoinTeam
          {...props}
          showModal={showJoinModal}
          closeModal={() => setShowJoinModal(false)}
        />
        <div className="first-row">
          <div className="first-col">
            {/* <TeamNotifications />
            <TeamRequestsSent /> */}
          </div>
          <div className="second-col">
            <TeamInformation
              editable={true}
              teamBio={props.team.description}
              projectIdea={props.team.project_idea}
              interests={props.team.interests}
            />
          </div>
        </div>
        <Members members={props.team.members} />
      </div>

  );
}

export default OnTeam;
