import React, { Component } from 'react';
import UserCard from './UserCard';
import { QueryRenderer } from 'react-relay';
import { graphql } from 'babel-plugin-relay/macro';
import './css/Feed.css';
import environment from './Environment';

const getUsersQuery = graphql`
    query FeedCardsQuery($name: String) {
        user(name:$name) {
            name
            school
			grad_year
			contact
			skills
			experience
        }
    }
`;

class FeedCards extends Component {
    render() {
        return (
            <QueryRenderer
                environment={environment}
                query={getUsersQuery}
                variables={{
                    name: this.props.name,
                }}
                render={({error,props}) => {
                    if (error) {
                       return <div>{error.message}</div>;
                    } else if (props) {
                        let cards = []
                        for(let i = 0;i<props.user.length;i++) {
                            cards.push(<UserCard name={props.user[i].name} grad_year={props.user[i].grad_year} school={props.user[i].school} contact={props.user[i].contact} skills={props.user[i].skills.filter(function (el) {
                                return Boolean(el);
                            })} experience={props.user[i].experience}/>);
                        }
                        return (<div className="Feed-container">{cards}</div>);
                    }
                }}
            />
        );
    };
};

export default FeedCards;
