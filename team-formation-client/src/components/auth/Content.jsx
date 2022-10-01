import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import EditProfile from "../profile/EditProfile";
import Feed from "../feed/Feed";
import HeaderFeed from "../ui_subcomponents/HeaderFeed";
import TeamPage from "../team/TeamPage";
import "../css/Content.css";

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cur_state: "login",
      user_id: "",
      team_id: "",
      visible: 0,
      data: {},
      loggedIn: true,
    };
  }

  async componentDidMount() {
    this.handleLogin();
  }

  handleLogin = () => {
    const { state = {} } = this.props.location;
    const { prevLocation } = state;
    this.onFetchLogin().then(() => {
      var login_json = this.state.data;
      console.log(login_json);

      if (login_json.email) {
        console.log("has a email");
        this.setState({ loggedIn: true });
      } else {
        console.log("doesn't have uuid");
        this.setState({ loggedIn: false });
      }
    });
  };

  render() {
    const { state = {} } = this.props.location;
    const { error } = state;
    console.log(this.state.loggedIn);
    return (
      <div className="Content-container">
        <Routes>
          <Route exact path="/login">
            <Login />
          </Route>
          <ProtectedRoute
            loggedIn={this.state.loggedIn}
            exact="exact"
            path={["/", "/feed"]}
            visible={this.state.data.visible}
            header={HeaderFeed}
            component={Feed}
          />
          <ProtectedRoute
            loggedIn={this.state.loggedIn}
            exact="exact"
            path="/edit-profile"
            visible={this.state.data.visible}
            header={HeaderFeed}
            component={EditProfile}
          />
          <ProtectedRoute
            loggedIn={this.state.loggedIn}
            exact="exact"
            path="/team/:teamId"
            visible={this.state.data.visible}
            header={HeaderFeed}
            component={TeamPage}
          />
        </Routes>
      </div>
    );
  }

  onFetchLogin = () => {
    return fetch("/api/user/check", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);

        return new Promise((resolve, reject) => {
          this.setState(
            {
              data: response,
              user_id: response.uuid,
            },
            function () {
              resolve();
            }
          );
        });
      });
  };

  onEditClick = () => {
    this.setState({ cur_state: "setup-profile" });
  };
  onDoneEditClick = (next_action, id) => {
    this.setState({ cur_state: next_action, user_id: id });
  };

  onTeamPageClick = (team_id) => {
    this.setState({ cur_state: "team-page", team_id: team_id });
  };
}

export default Content;
