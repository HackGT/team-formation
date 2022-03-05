import React, {Component} from 'react';
import '../css/Headers.css';
import {Button, Menu} from 'semantic-ui-react';

// Contains the headers for the user in their profile page
/*
Note: Does not appear to be in use. However the title will not display without it.
Status: UNKNOWN
Suggestion: Unless it's possible to work out how this is being used, do not touch it.
*/
class Headers extends Component {
    render() {
        return (<div className="Header-container">
            <div className="logout-button">
                <Menu>
                    <Menu.Item>
                        <Button href={'/api/user/logout'} className="logout-button">
                            Logout
                        </Button>
                    </Menu.Item>
                </Menu>
            </div>
            <div className="headers">
                <h1>HackGT</h1>
                <h2>Team Formation</h2>
            </div>
        </div>);
    };
};

export default Headers;
