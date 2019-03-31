import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import '../css/Logout.css';

class Logout extends Component {
	render() {
		return(
            <div className="Logout-container">
			    <Button  href={process.env.REACT_APP_SERVER_URL + '/api/user/logout'} className="logout-button"> Logout </Button>
            </div>
		);
    }
}

export default Logout