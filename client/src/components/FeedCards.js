import React, { Component } from 'react';
import UserCard from './UserCard';
import { Grid, Row, Card } from 'semantic-ui-react';

import { QueryRenderer } from 'react-relay';
import { graphql } from 'babel-plugin-relay/macro';
import './css/Feed.css';
import environment from './Environment';

const getUsersQuery = graphql`
    query FeedCardsQuery($skill: String, $grad_year: String, $school: String, $search: String) {
        user(skill:$skill, grad_year:$grad_year, school:$school, search:$search) {
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
        let search = this.props.search;
        let skill = this.props.skill.join(',');
        console.log(`skills: ${this.props.skill}`);
        let grad_year = this.props.grad_year.join(',');
        let school = this.props.school.join(',');
        return (
            <div className='Cards-container'>
                <QueryRenderer
                    environment={environment}
                    query={getUsersQuery}
                    variables={{
                        search: search,
                        skill: skill,
                        grad_year: grad_year,
                        school: school
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
