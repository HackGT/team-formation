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

  render() {
    return (

	  <div className="App-container">
		  <Content/>
	  </div>
    );
  }
}

export default App;
