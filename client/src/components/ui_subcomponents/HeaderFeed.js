import React, { Component } from 'react';
import '../css/Headers.css';
import { Button, Menu } from 'semantic-ui-react';
import { Header, Image, Modal } from "semantic-ui-react";
import { commitMutation } from 'react-relay';
import {graphql} from 'babel-plugin-relay/macro';
import environment from '../Environment';

const mutation = graphql`
mutation HeaderFeedMutation($uuid: String) {
  toggle_visibility(uuid: $uuid) {
    name
    grad_year
    school
    skills
    experience
    contact
    visible
}
}
`

class Headers extends Component {

    state = {
        open: false,
    }

    render() {
        let toggle_text;
        if (this.props.visible) {
            toggle_text = "Make Profile Invisible to Other Users"
        } else {
            toggle_text = "Make Profile Visible to Other Users"
        }
		return (
			<div className="Header-container">
				<div className="logout-button">
					<Menu>
						<Menu.Item>
							<Button className="edit-button" onClick={this.props.onEditClick}> Edit Profile </Button>
						</Menu.Item>
						<Menu.Item>
							<Button href={'/api/user/logout'} className="logout-button"> Logout </Button>
                        </Menu.Item>
                        <Menu.Item>
                            <Button onClick={this.onToggleClick} className="toggle-button"> {toggle_text} </Button>
                        </Menu.Item>
                        <Menu.Item>
							<Button className="modal-button-1" onClick={() => this.setState({open: true})} > Modal 1 </Button>
                        </Menu.Item>
                        <Menu.Item>
							<Button className="modal-button-2"> Modal 2 </Button>
                        </Menu.Item>
                        <Menu.Item>
							<Button className="modal-button-3"> Modal 3 </Button>
                        </Menu.Item>
                        <Menu.Item>
							<Button className="modal-button-4"> Modal 4 </Button>
                        </Menu.Item>
					</Menu>
				</div>

				<div className="headers">
					<h1>HackGT</h1>
					<h2>Team Formation</h2>
                </div>
                <Modal isOpen={this.state.open}>
                <Modal.Header>Select a Photo</Modal.Header>
                <Modal.Content image>
                    <Image wrapped size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' />
                    <Modal.Description>
                    <Header>Default Profile Image</Header>
                    <p>
                        We've found the following gravatar image associated with your e-mail
                        address.
                    </p>
                    <p>Is it okay to use this photo?</p>
                    </Modal.Description>
                </Modal.Content>
                </Modal>
			</div>
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