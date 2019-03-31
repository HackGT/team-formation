import React, { Component } from 'react';
import {
  QueryRenderer,
} from 'react-relay';
import Headers from './components/Headers';
import Content from './components/Content'
import Feed from './components/Feed'
import EditProfile from './components/EditProfile'
import Login from './components/Login'
// import logo from './logo.svg';
import './App.css';

class App extends Component {

	state = {
		subHeader: 'Team Formation',
		content: 'login'
	};

  render() {
    return (

	  <div className="App-container">
      <a href={process.env.REACT_APP_SERVER_URL + '/api/user/logout'}> Log Out </a>
		  <Headers subHeader={this.state.subHeader}/>
		  <Content/>
	  </div>
    );
  }
}

export default App;
