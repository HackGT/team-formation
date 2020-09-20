import React, {Component} from 'react';
import UserCard from './UserCard';
import {Grid, Row, Card} from 'semantic-ui-react';

import {QueryRenderer} from 'react-relay';
import {graphql} from 'babel-plugin-relay/macro';
import './css/Feed.css';
import environment from './Environment';
import {Redirect} from 'react-router-dom';

const getUsersQuery = graphql `
    query FeedCardsQuery($skill: String, $grad_year: String, $school: String, $search: String) {
        users(skill:$skill, grad_year:$grad_year, school:$school, search:$search) {
            name
            school
            grad_year
            contact
            skills
            experience
            visible
            uuid
            id
        }
        user_profile {
            team {
              id
            }
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
        return (<QueryRenderer environment={environment} query={getUsersQuery} variables={{
                search: search,
                skill: skill,
                grad_year: grad_year,
                school: school
            }} render={({error, props}) => {
                if (error) {
                    // return <div>{error.message}</div>;
                    return <Redirect to='/login' />;
                } else if (props) {
                    // if(props.user_profile.team.id == null) {
                    //     props.user_profile.team.id = "";
                    // }
                    // console.log("HELLO" + props.user_profile.team.id);
                    let cards = props.users.map(user => {
                        console.log("Stuff: " + user.id);
                        return <UserCard className='card-individual' name={user.name} grad_year={user.grad_year} school={user.school} contact={user.contact} skills={user.skills.filter(function(el) {
                                return Boolean(el);
                            })} experience={user.experience} id={user.id} team={props.user_profile.team}/>
                    })
                    return (
                    <div className='Cards-container'>
                        {cards}
                    </div>);
                }
            }}/>);

    };

};

export default FeedCards;
