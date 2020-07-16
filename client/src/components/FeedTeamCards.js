import React, { Component } from 'react';
import TeamCard from './TeamCard';
import { Grid, Row, Card } from 'semantic-ui-react';

import { QueryRenderer } from 'react-relay';
import { graphql } from 'babel-plugin-relay/macro';
import './css/Feed.css';
import environment from './Environment';

const getTeamsQuery = graphql`
    query FeedTeamCardsQuery {
        get_teams {
            name
            interests
            description
            public
            members {
                name
            }
        }
    }
`;

class FeedTeamCards extends Component {
    render() {
    //     var data = [{name: "Team 23", about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "}, {name: "Team 28", about: "Coding in React. Attended 12 different hackathons in the past 3 years."}, {name: "The Awesome Team", about: "Just started CS around 3 hours ago!"}, 
    // {name: "The IE Majors", about: "Just hear to talk to some companies."}, {name: "Team 21", about: "Working on a project relating to augmented reality, and a system to identify dangerous situations."}]
    //     let cards = data.map(team => {
    //         return <TeamCard name={team.name} about={team.about}/>
    //     })
    //     return (
    //         <div className='Cards-container'>
    //             <Card.Group centered itemsPerRow={4} className='center-group'>{cards}</Card.Group>
    //         </div>

    //     );
        return (
            <div className='Cards-container'>
                <QueryRenderer
                    environment={environment}
                    query={getTeamsQuery}
                    variables={{
                    }}
                    render={({error,props}) => {
                        if (error) {
                        return <div>{error.message}</div>;
                        } else if (props) {
                            let cards = props.get_teams.map(user => {
                                if(user.public == true) {
                                    return <TeamCard name={user.name} interests={user.interests} description={user.description} />
                                }
                            })
                            return (<Card.Group centered itemsPerRow={4} className='center-group'>{cards}</Card.Group>);
                        }
                    }}
                />
            </div>

        );
    };

};

export default FeedTeamCards;