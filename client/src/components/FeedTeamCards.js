import React, {Component} from 'react';
import TeamCard from './TeamCard';
import {Grid, Row, Card} from 'semantic-ui-react';

import {QueryRenderer} from 'react-relay';
import {graphql} from 'babel-plugin-relay/macro';
import './css/Feed.css';
import environment from './Environment';

const getTeamsQuery = graphql `
    query FeedTeamCardsQuery($interests: String, $search: String) {
        teams(interests:$interests, search:$search) {
            name
            interests
            description
            public
            members {
                name
            }
            id
        }
    }
`;

class FeedTeamCards extends Component {
    render() {
        let search = this.props.search;
        let interests = this.props.skill.join(',');
        console.log(`interests: ${interests}`)
        return (<QueryRenderer environment={environment} query={getTeamsQuery} variables={{
                search: search,
                interests: interests
            }} render={({error, props}) => {
                if (error) {
                    return <div>{error.message}</div>;
                } else if (props) {
                    let cards = props.teams.map(team => {
                        if (team.public == true) {
                            console.log('rendering..');
                            return <TeamCard id={team.id} name={team.name} interests={team.interests.filter(function(el) {
                                    return Boolean(el);
                                })} description={team.description}/>
                        }
                    })
                    return (<div className='Cards-container'>

                        {cards}
                    </div>);
                }
            }}/>);
    };

};

export default FeedTeamCards;
