import React, {Component} from 'react';
import UserCard from './UserCard';
import {Card, Button, Icon} from 'semantic-ui-react';

import {QueryRenderer} from 'react-relay';
import {graphql} from 'babel-plugin-relay/macro';
import './css/Members.css';
import environment from './Environment';
import { Link } from "react-router-dom";

// edit this query to pull on the team members
const getUsersQuery = graphql `
    query MembersQuery {
        user_profile {
            team {
                members {
                    name
                    school
                    grad_year
                    contact
                    skills
                    experience
                }
            }
        }
    }
`;

class Members extends Component {
    render() {
        let memberCards = [];

        // sample users array
        let users = [];
        console.log("Team: "+ this.props.members);
        if(this.props.members) {
            users = this.props.members;
        }
        // users.push(props.users[0]);
        // users.push(props.users[1]);
        // users.push(props.users[2]);
        // users.push(props.users[3]);

        for (let i = 0; i < users.length; i++) {
            let user = users[i];

            console.log("Name: " + user.name);
            console.log("Skills: " + user.skills);
            memberCards.push(<UserCard name={user.name} grad_year={user.grad_year} school={user.school} contact={user.contact} skills={user.skills.filter(function(el) {
                    return Boolean(el);
                })} experience={user.experience}/>)
        }
        for (let j = 4 - users.length; j > 0; j--) {
            memberCards.push(<Card>
                <Card.Content className="add-card">
                    <Link to="/feed/">
                        <Button icon="icon">
                            <Icon name='plus'/>
                        </Button>
                    </Link>
                </Card.Content>
            </Card>)
        }

        let cards = (<Card.Group centered="centered" itemsPerRow={4} className='center-group'>{memberCards}</Card.Group>);
        return (<div className='member-cards-container'>
            {cards}
        </div>);

    };

};

export default Members;
