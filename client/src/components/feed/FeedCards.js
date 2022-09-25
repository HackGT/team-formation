/* eslint-disable */
import React, { useState, useEffect} from 'react';
import UserCard from '../profile/UserCard';
import {Button} from 'semantic-ui-react';
import '../css/Feed.css';

/**
 * Component that houses the user cards of those who
 * do not have teams already and have selected to make
 * themselves visible.
 */
 export default function FeedCards(props) {
    const [users, setUsers] = useState([]);  
    
    useEffect(async () => {
      const myHeaders = new Headers();
      // TODO: Integrate this with auth api
      const BEARER_TOKEN="token"
      myHeaders.append("Authorization", "Bearer " + BEARER_TOKEN);
      // TODO pass in hexathon id
      const params = new URLSearchParams({
          hexathon: 'hexathonid',
      })

      const res = await fetch("http://localhost:8004/applications?" + params, {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      });

      const val = await res.json();
      setUsers(val.applications);
    }, []);
  
    let cards = users.map(user => {
        return (
          <UserCard className='card-individual' 
            name={user.name}
            grad_year="1st"
            school="Georgia Tech"
            contact={user.email} 
            skills={["Python", "Java", "Android", "App Development"]}
            experience="Very good teamate"
            id={user.userId}
            team={null}
            track="Horizon"
            slackid={null}
            location="In-person"
        />);
    });
  
    return (
        <div>
          <div className='Cards-container'>
              {cards.slice(props.sliceIndexStart, props.sliceIndexStart + props.numCardsPerPage)}
          </div>
          <div className='buttons-container'>
          {props.sliceIndexStart !== 0 && <Button onClick={props.moveLeft}>
              Previous
          </Button>}
          {Math.floor(props.sliceIndexStart / props.numCardsPerPage)
          !== Math.floor((cards.length - 1)/ props.numCardsPerPage) && cards.length !== 0 && <Button onClick={props.moveRight}>
              Next
          </Button>}
          </div>
        </div>
    );
  }
