import React, {Component} from 'react';
import UserCard from '../user/card/UserCard';
import {Button} from 'semantic-ui-react';

import {QueryRenderer} from 'react-relay';
import {graphql} from 'babel-plugin-relay/macro';
import './css/Feed.css';
import environment from '../Environment';
import {Redirect} from 'react-router-dom';

const getUsersQuery = graphql `
    query FeedCardsQuery($skill: String, $grad_year: String, $school: String, $search: String, $track: String, $location: String) {
        users(skill:$skill, grad_year:$grad_year, school:$school, search:$search, track:$track, location:$location) {
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
            location
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
        let location = this.props.locations.join(',');
        console.log(`location: ${location}`);
        return (<QueryRenderer environment={environment} query={getUsersQuery} variables={{
                search: search,
                skill: skill,
                grad_year: grad_year,
                school: school,
                track: track,
                location: location
            }} render={({error, props}) => {
                if (error) {
                    return <Redirect to='/login' />;
                } else if (props) {
                    console.log(props.user);
                    let cards = props.users.map(user => {
                        return <UserCard className='card-individual' name={user.name} grad_year={user.grad_year} school={user.school} contact={user.contact} skills={user.skills.filter(function(el) {
                                return Boolean(el);
                            })}
                        experience={user.experience}
                        id={user.id}
                        team={props.user_profile.team}
                        track={user.track}
                        slackid={user.slackid}
                        location={user.location}
                        />
                    })
                    return (
                        <div>
                    <div className='Cards-container'>
                        {cards.slice(this.props.sliceIndexStart, this.props.sliceIndexStart + this.props.numCardsPerPage)}
                    </div>
                    <div className='buttons-container'>
                    {this.props.sliceIndexStart !== 0 && <Button onClick={this.props.moveLeft}>
                        Previous
                    </Button>}
                    {Math.floor(this.props.sliceIndexStart / this.props.numCardsPerPage)
                    !== Math.floor((cards.length - 1)/ this.props.numCardsPerPage) && cards.length !== 0 && <Button onClick={this.props.moveRight}>
                        Next
                    </Button>}
                    </div>
                    </div>);
                }
            }}/>);

    };
};

export default FeedCards;
