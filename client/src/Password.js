import React, { Component } from 'react';
import PasswordInput from './components/PasswordInput';
// import logo from './logo.svg';
import './App.css';

class App extends Component {

  render() {
    return (
	  <div className="Password-container">
		<PasswordInput />
	  </div>
    );
  }
}

export default Password;
