import React, {Component} from 'react';
import UserCard from './UserCard';
import {Grid, Row, Card} from 'semantic-ui-react';

import {QueryRenderer} from 'react-relay';
import {graphql} from 'babel-plugin-relay/macro';
import './css/Feed.css';
import environment from './Environment';
import {Redirect} from 'react-router-dom';

const getUsersQuery = graphql `
    query FeedCardsQuery($skill: String, $grad_year: String, $school: String, $search: String, $track: String) {
        users(skill:$skill, grad_year:$grad_year, school:$school, search:$search, track:$track) {
            name
            email
            school
            grad_year
            contact
            skills
            track
            experience
            visible
            uuid
            id
            slackid
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
        let track = this.props.track.join(',');
        return (<QueryRenderer environment={environment} query={getUsersQuery} variables={{
                search: search,
                skill: skill,
                grad_year: grad_year,
                school: school,
                track: track
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
                        return <UserCard className='card-individual' name={user.name} grad_year={user.grad_year} school={user.school} contact={user.email} skills={user.skills.filter(function(el) {
                                return Boolean(el);
                            })}
                        experience={user.experience}
                        id={user.id}
                        team={props.user_profile.team}
                        slackid={user.slackid}
                        />
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
