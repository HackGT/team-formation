import React, { Component } from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import UserCard from './UserCard'
import { Icon, Divider } from 'semantic-ui-react';
import {QueryRenderer } from 'react-relay';
import {graphql} from 'babel-plugin-relay/macro';
import PropTypes from 'prop-types';
import './css/Feed.css';
import environment from './Environment'
import SearchField from 'react-search-field';

const {
  Environment,
  Network,
  RecordSource,
  Store,
} = require('relay-runtime');

const getUsersQuery = graphql`
    query FeedCardsQuery($first_name: String, $last_name: String) {
        user(first_name:$first_name, last_name:$last_name) {
            email
            name
            school
			grad_year
        }
    }
`

class FeedCards extends Component {
    render() {
        return (
            <QueryRenderer
                environment={environment}
                query={getUsersQuery}
                variables={{
                    first_name: this.props.first_name,
                    last_name: this.props.last_name
                }}
                render={({error,props}) => {
                    if (error) {
                       return <div>{error.message}</div>;
                    } else if (props) {
                        let cards = []
                        for(let i = 0;i<props.user.length;i++) {
                            cards.push(<UserCard name={props.user[i].name} grad_year={props.user[i].grad_year} school={props.user[i].school}/>);
                        }
                        return (<div className="Feed-container">{cards}</div>);
                    } else {
                        return <div>Loading</div>;
                    }
                }}
            />
        );
    }
}

export default FeedCards
