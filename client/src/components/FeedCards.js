import React, { Component } from 'react';
import UserCard from './UserCard';
import { Grid, Row, Card } from 'semantic-ui-react';

import { QueryRenderer } from 'react-relay';
import { graphql } from 'babel-plugin-relay/macro';
import './css/Feed.css';
import environment from './Environment';

const getUsersQuery = graphql`
    query FeedCardsQuery($skill: String) {
        user(skill:$skill) {
            name
            school
            grad_year
            contact
            skills
            experience
            visible
            uuid
        }
    }
`;

class FeedCards extends Component {
    render() {
        let skill = this.props.skill.join(',');
        return (
            <div className='Cards-container'>
                <QueryRenderer
                    environment={environment}
                    query={getUsersQuery}
                    variables={{
                        skill: skill,
                    }}
                    render={({error,props}) => {
                        if (error) {
                           return <div>{error.message}</div>;
                        } else if (props) {
                            let cards = props.user.map(user => {
                                return <UserCard name={user.name} grad_year={user.grad_year} school={user.school} contact={user.contact} skills={user.skills.filter(function (el) {
                                    return Boolean(el);
                                })} experience={user.experience} />
                            })
                            return (<Card.Group centered itemsPerRow={4} className='center-group'>{cards}</Card.Group>);
                        }
                    }}
                />
            </div>

        );

    };

};

export default FeedCards;
