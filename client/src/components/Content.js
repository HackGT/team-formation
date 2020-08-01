import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import Login from "./Login";
import EditProfile from "./EditProfile";
import Feed from "./Feed";
import HeaderLogin from "./ui_subcomponents/HeaderLogin";
import HeaderFeed from "./ui_subcomponents/HeaderFeed";
import TeamPage from "./TeamPage";
import "./css/Content.css";

class Content extends Component {
  constructor() {
    super();
    this.state = {
      cur_state: "login",
      user_id: "",
      team_id: "",
      visible: 0,
    };
  }

  render() {
    return (
			<Router>
				<div className="Content-container">
					<Login
						onNextClick={this.onNextClick}
						onFeedChange={this.onProfileChange}
					/>
					<Switch>
						<Route path="/edit-profile">
							<HeaderFeed
								onEditClick={this.onEditClick}
								user_id={this.state.user_id}
								visible={this.state.visible}
								onNextClick={this.onNextClick}
								onTeamPageClick={this.onTeamPageClick}
							/>
							<EditProfile
								onNextClick={this.onDoneEditClick}
								user_id={this.state.user_id}
							/>
						</Route>
						<Route path="/feed">
							<HeaderFeed
								onEditClick={this.onEditClick}
								user_id={this.state.user_id}
								visible={this.state.visible}
								onNextClick={this.onNextClick}
								onTeamPageClick={this.onTeamPageClick}
							/>
							<Feed
								user_id={this.state.user_id}
								onTeamPageClick={this.onTeamPageClick}
							/>
						</Route>
						<Route path="/some-team-id">
							<HeaderFeed
								onEditClick={this.onEditClick}
								user_id={this.state.user_id}
								visible={this.state.visible}
								onNextClick={this.onNextClick}
								onTeamPageClick={this.onTeamPageClick}
							/>
							<TeamPage user_id={this.state.user_id} team_id={this.state.team_id} />
						</Route>
					</Switch>
				</div>
			</Router>
    );
	}

  onEditClick = () => {
    this.setState({
      cur_state: "setup-profile",
    });
  };

  onTeamPageClick = (team_id) => {
    this.setState({
      cur_state: "team-page",
      team_id: team_id,
    });
  };

  onNextClick = (id, visible) => {
    this.setState({
      user_id: id,
      visible: visible,
    });
  };

  onDoneEditClick = (next_action, id) => {
    this.setState({
      cur_state: next_action,
      user_id: id,
    });
  };
}

export default Content;
