import React, { Component } from 'react';
import UserCard from './UserCard';
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
        return (
            <QueryRenderer
                environment={environment}
                query={getUsersQuery}
                variables={{
                    skill: this.props.skill,
                }}
                render={({error,props}) => {
                    if (error) {
                       return <div>{error.message}</div>;
                    } else if (props) {
                        console.log(props)
                        let cards = props.user.map(user => {
                            return <UserCard name={user.name} grad_year={user.grad_year} school={user.school} contact={user.contact} skills={user.skills.filter(function (el) {
                                return Boolean(el);
                            })} experience={user.experience} />
                        })
                        return (<div className="Feed-container">{cards}</div>);
                    }
                }}
            />
        );
    };
};

export default FeedCards;
