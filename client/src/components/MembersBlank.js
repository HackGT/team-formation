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
      return (
          <div className='member-cards-container'>
              <QueryRenderer
                  environment={environment}
                  query={getUsersQuery}
                  variables={{
                      skill: this.props.skill,
                  }}
                  render={({error,props}) => {
                      if (error) {
                         return <div>{error.message}</div>;
                      } else if (props) {
                          let memberCards = [];

                          // sample users array
                          let users = [];
                          users.push(props.users[0]);
                          users.push(props.users[1]);
                          
                          for (let i = 0; i < 2; i++) {
                            let user = users[i];
                            memberCards.push(
                              <UserCard name={user.name} grad_year={user.grad_year} school={user.school} contact={user.contact} skills={user.skills.filter(function (el) {
                                return Boolean(el);
                              })} experience={user.experience} />
                            )
                          }
                          // for (let j = 4 - users.length; j > 0; j--) {
                          //   memberCards.push(
                          //     <Card> 
                          //       <Card.Content className="add-card">
                          //         {/* <Button icon>
                          //           <Icon name='plus' />
                          //         </Button> */}
                          //       </Card.Content>
                          //     </Card>
                          //   )
                          // }

                          return (<Card.Group centered itemsPerRow={4} className='center-group'>{memberCards}</Card.Group>);
                      }
                  }}
              />
          </div>

      );

  };

};

export default Members;