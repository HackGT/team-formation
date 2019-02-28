import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';
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

  onNextClick() {
	  this.setState({content: 'password-input'})
  }

  /* onSubHeaderChange = (text) =>  {
	  const newSubHeader = text;
	  this.setState({ subHeader: newSubHeader });
  } */
}

export default App;
