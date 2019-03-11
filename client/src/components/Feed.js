import React, { Component } from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import UserCard from './UserCard'
import { Icon } from 'semantic-ui-react';
import { graphql,  QueryRenderer } from 'react-relay';
import PropTypes from 'prop-types';
import './css/Feed.css';
import environment from './Environment'
const {
  Environment,
  Network,
  RecordSource,
  Store,
} = require('relay-runtime');
const getUsersQuery = graphql`
    query FeedQuery($email: String!) {
        user(email:$email) {
            email
            name
            school

        }
    }
`
class Feed extends Component {
	render() {
        console.log("hello")
		return (
            <QueryRenderer
                environment={environment}
                query={getUsersQuery}
                render={({error,props}) => {
                    console.log("error" + " " + error + " " + props);
                    return "hello"
                    // let cards = []
                    // for(let i = 0;i<1;i++) {
                    //     cards.push(<UserCard name={this.props.user.name} email={this.props.user.email}/>);
                    // }
                    // return (<div className="Feed-container">{cards}</div>);
                }}
            />
        );
	}
}

export default Feed
