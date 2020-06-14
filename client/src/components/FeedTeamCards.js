import React, { Component } from 'react';
import TeamCard from './TeamCard';
import { Grid, Row, Card } from 'semantic-ui-react';

import { QueryRenderer } from 'react-relay';
import { graphql } from 'babel-plugin-relay/macro';
import './css/Feed.css';
import environment from './Environment';

var data = [{data: {name: "Team 23", skills: "React", experience: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "}}]

class FeedTeamCards extends Component {
    render() {
        return (
            <div className='Cards-container'>
                var cards = data.map(team => {
                    return <TeamCard name={team.name} skills={team.skills} experience={team.experience}/>
                })

                return (<Card.Group centered itemsPerRow={4} className='center-group'>{cards}</Card.Group>);
            </div>

        );

    };

};

export default FeedTeamCards;