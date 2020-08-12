import React, { Component } from 'react';
import UserCard from './UserCard';
import { Card, Button, Icon } from 'semantic-ui-react';

import { QueryRenderer } from 'react-relay';
import { graphql } from 'babel-plugin-relay/macro';
import './css/MembersBlank.css';
import environment from './Environment';


// edit this query to pull on the team members
const getUsersQuery = graphql`
    query MembersBlankQuery($skill: String) {
        users(skill:$skill) {
            name
            school
            grad_year
            contact
            skills
            experience
            visible
            uuid
        }
    }
`;

class Members extends Component {
  render() {
      
          let memberCards = [];

          // sample users array
          let users = [];

          if(this.props.members) {
            users = this.props.members;
        }
          
          // users.push(props.users[0]);
          // users.push(props.users[1]);
          // users.push(props.users[2]);
          // users.push(props.users[3]);
          
          for (let i = 0; i < users.length; i++) {
            let user = users[i];
            memberCards.push(
              <UserCard name={user.name} grad_year={user.grad_year} school={user.school} contact={user.contact} skills={user.skills.filter(function (el) {
                return Boolean(el);
              })} experience={user.experience} />
            )
          }
          for (let j = 4 - users.length; j > 0; j--) {
            memberCards.push(
              <Card> 
                <Card.Content className="add-card">
                  {/* <Button icon>
                    <Icon name='plus' />
                  </Button> */}
                </Card.Content>
              </Card>
            )
          }

          let cards = (<Card.Group centered itemsPerRow={2} className='center-group'>{memberCards}</Card.Group>);
          return (<div className='member-cards-container'>
            {cards}
          </div>

      );

  };

};

export default Members;