import React, { Component } from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import UserCard from './UserCard'
import { Icon, Divider } from 'semantic-ui-react';
import {QueryRenderer } from 'react-relay';
import {graphql} from 'babel-plugin-relay/macro';
import PropTypes from 'prop-types';
import './css/Feed.css';
import environment from './Environment'
const {
  Environment,
  Network,
  RecordSource,
  Store,
} = require('relay-runtime');

// const getUsersQuery = graphql`
//     query FeedQuery($name: String, $email: String, $grad_year: String, $school: String) {
//         user(email:$email, name:$name, grad_year:$grad_year, school:$school) {
//             email
//             name
//             school
//
//         }
//     }
// `
const getUsersQuery = graphql`
    query FeedQuery($school: String) {
        user(school:$school) {
            email
            name
            school
			grad_year
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
                variables={{
                    school: "abc123",
                }}
                render={({error,props}) => {
                    if (error) {
                       return <div>{error.message}</div>;
                    } else if (props) {
                        console.log("ard" + error + " " + props.user[1].grad_year)
                        let cards = []
                        for(let i = 0;i<props.user.length;i++) {
                            cards.push(<UserCard name={props.user[i].name} grad_year={props.user[i].grad_year} school={props.user[i].school}/>);
                        }
                        return (<div className="Feed-container">{cards}</div>);
                    }
                    return <div>Loading</div>;
                }}
            />
        );
	}
}

export default Feed
