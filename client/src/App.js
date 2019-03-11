import React, { Component } from 'react';
import {
  QueryRenderer,
  graphql
} from 'react-relay';
import Headers from './components/Headers';
import Content from './components/Content'
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
		<Content content={this.state.content} inputs={this.state.inputs}/>
	  </div>
    );
  }
}

export default App;
