import React, { Component } from 'react';
import {
  QueryRenderer,
} from 'react-relay';
import Headers from './components/Headers';
import Content from './components/Content'
import Feed from './components/Feed'
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
	  	<Headers subHeader={this.state.subHeader}/>
        <Content/>

	  </div>
    );
  }
}

export default App;
