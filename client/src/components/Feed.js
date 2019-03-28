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
import FeedCards from './FeedCards'

const {
  Environment,
  Network,
  RecordSource,
  Store,
} = require('relay-runtime');

const getUsersQuery = graphql`
    query FeedQuery($name: String, $email: String, $grad_year: String, $school: String) {
        user(email:$email, name:$name, grad_year:$grad_year, school:$school) {
            email
            name
            school

        }
    }
`

class Feed extends Component {
    constructor(props){
        super(props)
        this.state = {name: ""}
        // this.onSearchClick.bind(this);

    };
	render() {
        console.log("hello")
		return (
            <div>
            <br/>
            <div class="card-container">

                <SearchField
                    placeholder='Search item' onSearchClick={this.onSearchClick}
                />
            </div>
                <FeedCards name={this.state.name} />
            </div>

        );
	}
    onSearchClick = (search_string) => {
        console.log("STATE CHANGE" + " " + search_string)
        this.setState({name:search_string});

    }

}

export default Feed
