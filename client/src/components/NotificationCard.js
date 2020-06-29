import React, { Component } from 'react';
import { Button, Card, Popup, Container, Label, Icon } from 'semantic-ui-react';
import './css/NotificationCard.css';

class NotificationCard extends Component {
    render() {
        return (
				<Card className="notification">
					<Card.Content className="content">
                        {this.props.message}
                        <div className='notification-buttonGroup'>
                            <Button inverted color='green' icon='check'>
                            </Button>
                            <Button inverted color='red' icon='close'>
                            </Button>

                        </div>
					</Card.Content>
				</Card>
		);
	};
};

export default NotificationCard;
