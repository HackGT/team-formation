import React, { Component } from 'react';
import '../css/Headers.css';
import { Button, Menu, Label, Dropdown } from 'semantic-ui-react';
import { commitMutation } from 'react-relay';
import {graphql} from 'babel-plugin-relay/macro';
import environment from '../Environment';
import { QueryRenderer } from 'react-relay';

const mutation = graphql`
mutation HeaderFeedMutation($uuid: String) {
  toggle_visibility(uuid: $uuid) {
    name
}
}
`
const getName = graphql`
query HeaderFeedNameQuery($uuid: String) {
    user_profile(uuid:$uuid) {
        name
    }
}
`

class Headers extends Component {

    render() {
        let toggle_text;
        if (this.props.visible) {
            toggle_text = "Make Profile Public"
        } else {
            toggle_text = "Make Profile Private"
        }
		return (
            <QueryRenderer
                environment={environment}
                query={getName}
                variables={{
                    uuid: this.props.user_id,
                }}
                render={({error,props}) => {
                    if (error) {
                       return <div>{error.message}</div>;
                    } else if (props) {
                        console.log(props)
                        return (
                            <div className="Header-container">
                                <div className="logout-button">
                                    <Menu borderless floated={'right'} size={'massive'}>
                                        <Menu.Item name={props.user_profile.name}/>
                                        <Menu.Item icon='sign out' link={true} href={'/api/user/logout'}/>
                                        <Dropdown item icon='bell' direction='left' closeOnChange={false}>
                                              <Dropdown.Menu>
                                                <Dropdown.Item icon='edit' text='Edit Profile' onClick={this.props.onEditClick}/>
                                                <Dropdown.Item icon='edit' text='Edit Profile' onClick={this.props.onEditClick}/>
                                                <Dropdown.Item icon='globe' text={toggle_text} onClick={this.onToggleClick}/>
                                              </Dropdown.Menu>
                                        </Dropdown>
                                        <Dropdown item icon='user' direction='left' closeOnChange={false}>
                                          <Dropdown.Menu>
                                            <Dropdown.Item icon='edit' text='Edit Profile' onClick={this.props.onEditClick}/>
                                            <Dropdown.Item icon='edit' text='Edit Profile' onClick={this.props.onEditClick}/>
                                            <Dropdown.Item icon='globe' text={toggle_text} onClick={this.onToggleClick}/>
                                          </Dropdown.Menu>
                                        </Dropdown>
                                    </Menu>
                                </div>

                                <div className="headers">
                                    <h1>HackGT</h1>
                                    <h2>Team Formation</h2>
                                </div>
                            </div>
                        )
                    }
                }}
            />
		);
    };
    onToggleClick = () => {
        commitMutation(
            environment,
            {
                mutation,
                variables: {
                    uuid: this.props.user_id,
                }
            }
        );
        this.props.onNextClick('feed', this.props.user_id, !this.props.visible);
	};
};

export default Headers;
