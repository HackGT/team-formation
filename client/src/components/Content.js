import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
	useParams,
	Redirect
} from "react-router-dom";
import Login from "./Login";
import EditProfile from "./EditProfile";
import Feed from "./Feed";
import PrivateRoute from "./PrivateRoute";
import HeaderLogin from "./ui_subcomponents/HeaderLogin";
import HeaderFeed from "./ui_subcomponents/HeaderFeed";
import TeamPage from "./TeamPage";
import "./css/Content.css";

const ProtectedRoute = ({ component: Comp, loggedIn, path, ...rest}) => {
  console.log("log",loggedIn)
  console.log(path)
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        return loggedIn ? (
          <Comp {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                prevLocation: path,
                error: "You need to login first!",
              },
            }}
          />
        );
      }}
    />
  );
}

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
	// this.handleLogin();
	};

    async componentDidMount() {
        await this.handleLogin();
    }

		handleLogin = () => {
			const { state = {} } = this.props.location;
			const { prevLocation } = state;

			this.onFetchLogin().then(() => {
				var login_json = this.state.data;
				console.log(login_json)
				if (login_json.uuid) {
					console.log("has a uuid")
					this.setState(
						{
							loggedIn: true
						}
					)
						// if (!login_json.school) {
						// 		// this.props.onNextClick(login_json.uuid, login_json.visible);
						// 		this.setState({ redirect: "edit-profile" });
						// } else {
						// 		// this.props.onNextClick(login_json.uuid, login_json.visible);
						// 		this.setState({ redirect: "feed" })
						// }
				} else {
					// console.log("go to login");
					// this.setState({ redirect: "login" });
					console.log("doesn't have uuid")
					this.setState(
						{
							loggedIn: false
						}
					)
				}
			});
		};

		// this.onFetchLogin().then(() => {
		// 	var login_json = this.state.data;
		// 	console.log(login_json)
		// 	if (login_json.uuid) {
		// 		console.log("has a uuid")
		// 		this.setState({ authed: true })
		// 			// if (!login_json.school) {
		// 			// 		// this.props.onNextClick(login_json.uuid, login_json.visible);
		// 			// 		this.setState({ redirect: "edit-profile" });
		// 			// } else {
		// 			// 		// this.props.onNextClick(login_json.uuid, login_json.visible);
		// 			// 		this.setState({ redirect: "feed" })
		// 			// }
		// 	} else {
		// 		// console.log("go to login");
		// 		// this.setState({ redirect: "login" });
		// 		console.log("doesn't have uuid")
		// 		this.setState({ authed: false })
		// 	}
		// });

  render() {

	const { state = {} } = this.props.location;
    const { error } = state;

		// const { redirect } = this.state;

		// if (redirect == "feed") {
		// 	// console.log("redirect true")
		// 	this.setState({ redirect: "" })
		// 	return <Redirect to="/feed/" />;
		// } else if (redirect == "edit-profile") {
		// 	this.setState({ redirect: "" })
		// 	return <Redirect to="/edit-profile/" />;
		// } else if (redirect == "login") {
		// 	console.log("redirect to login")
		// 	this.setState({ redirect: "" })
		// 	return <Redirect to="/login/" />;

		// }
    console.log(this.state.loggedIn)
    return (
				<div className="Content-container">
					<Switch>
						<Route exact path="/login">
							<Login
								onNextClick={this.onNextClick}
								onFeedChange={this.onProfileChange}
							/>
						</Route>
						<ProtectedRoute loggedIn={this.state.loggedIn} exact path={["/","/feed"]} component={Feed}/>
						<ProtectedRoute loggedIn={this.state.loggedIn} exact path="/edit-profile" component={EditProfile}/>
					</Switch>
						{/* <Route path="/edit-profile">
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
						<Route path={["/feed"]} >
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
						</Route> */}
				</div>
    );
	}

	onFetchLogin = () => {
	    return fetch('/api/user/check', {
	        method: "GET",
	        credentials: "include"
	    })
	    .then(response => {
			return response.json();
	    })
	        .then(response => {
                console.log(response)

	        return new Promise((resolve, reject) => {
	            this.setState({data: response, user_id: response.uuid}, function() {
	                resolve();
	            });
	        });
	    });
	};

	render() {
		let cur_display;
		let cur_header;
		if (this.state.cur_state === 'login') {
			cur_header = <HeaderLogin/>;
			cur_display = <Login
				onNextClick={this.onNextClick}
                onFeedChange={this.onProfileChange}/>;
		} else if (this.state.cur_state === 'setup-profile') {
			cur_header = <HeaderFeed onEditClick={this.onEditClick} user_id={this.state.user_id} visible={this.state.visible} onNextClick={this.onNextClick} />;
			cur_display = <EditProfile
				onNextClick={this.onDoneEditClick}
				user_id={this.state.user_id}
                />;
		} else if (this.state.cur_state === 'feed') {
				cur_header = <HeaderFeed onEditClick={this.onEditClick} user_id={this.state.user_id} visible={this.state.visible} onNextClick={this.onNextClick} />;
				cur_display = <Feed user_id={this.state.user_id} onTeamPageClick={this.onTeamPageClick} />;
		} else if (this.state.cur_state == 'team-page') {
				cur_header = <HeaderFeed onEditClick={this.onEditClick} user_id={this.state.user_id} visible={this.state.visible} onNextClick={this.onNextClick} />;
				cur_display = <TeamPage user_id={this.state.user_id} team_id={this.state.team_id} />;
		}
		return (
			<div className="Content-container">
				<div> {cur_header} </div>
				<div>{cur_display}</div>
			</div>
		);
	};

    onEditClick = () => {
		this.setState({
			cur_state: 'setup-profile'
        });
    }
    onDoneEditClick = (next_action, id) => {
		this.setState({
			cur_state: next_action,
            user_id: id
		});
	};

  onNextClick = (id, visible) => {
    this.setState({
      user_id: id,
      visible: visible,
    });
  };

	onTeamPageClick = (team_id) => {
		this.setState({
			cur_state: 'team-page',
			team_id: team_id
		});
	}

	onNextClick = (next_action, id, visible) => {
		this.setState({
			cur_state: next_action,
            user_id: id,
            visible: visible
		});
    };


}

export default Content;
