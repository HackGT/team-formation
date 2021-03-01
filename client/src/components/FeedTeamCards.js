import React, {Component} from 'react';
import TeamCard from './TeamCard';
import {Grid, Row, Card, Button} from 'semantic-ui-react';

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
        user_profile {
            team {
                id
            }
        }  
    }
`;

class FeedTeamCards extends Component {
    state = {
        sliceIndexStart: 0,
        numCardsPerPage: 4,
    }
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
                                })} description={team.description} team={props.user_profile.team}/>
                        }
                    })
                    return (<div>
                    <div className='Cards-container'>
                        {cards.slice(this.state.sliceIndexStart, this.state.sliceIndexStart + this.state.numCardsPerPage)}
                    </div>
                    <div className='buttons-container'>
                    {this.state.sliceIndexStart !== 0 && <Button onClick={this.moveLeft}>
                        Previous
                    </Button>}
                    {Math.floor(this.state.sliceIndexStart / this.state.numCardsPerPage)
                    !== Math.floor(cards.length / this.state.numCardsPerPage) && <Button onClick={this.moveRight}>
                        Next
                    </Button>}
                    </div>
                    </div>);
                }
            }}/>);
    };
    moveLeft = (e) => {
        this.setState({
            sliceIndexStart: this.state.sliceIndexStart - this.state.numCardsPerPage,
        })
    }
    moveRight = (e) => {
        this.setState({
            sliceIndexStart: this.state.sliceIndexStart + this.state.numCardsPerPage,
        })
    }

};

export default FeedTeamCards;
