/* eslint-disable */
import React, { useState, useEffect } from "react";
import TeamCard from "../team/TeamCard";
import { Button } from "semantic-ui-react";

import "../css/Feed.css";

/**
 * Component that houses the cards of all teams that have been created that
 * are not full or private. Very similar to FeedCards.
 */
export default function FeedTeamCards(props) {
  const [teams, setTeams] = useState([]);

  useEffect(async () => {
    const myHeaders = new Headers();
    const BEARER_TOKEN =
      "eyJhbGciOiJSUzI1NiIsImtpZCI6ImY5MGZiMWFlMDQ4YTU0OGZiNjgxYWQ2MDkyYjBiODY5ZWE0NjdhYzYiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiWXUgUGFuIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FBVFhBSndncHl0Zm9rTlFJMjVJUFo1TkExTXlySzdNZFJhU1RjU2JqZ1RiPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2hleGxhYnMtY2xvdWQiLCJhdWQiOiJoZXhsYWJzLWNsb3VkIiwiYXV0aF90aW1lIjoxNjU1NDM4ODk1LCJ1c2VyX2lkIjoiM1N6M2c4VW5SM096Y25qUXdzYjhZRGZPdUR6MSIsInN1YiI6IjNTejNnOFVuUjNPemNualF3c2I4WURmT3VEejEiLCJpYXQiOjE2NTU0Mzg4OTUsImV4cCI6MTY1NTQ0MjQ5NSwiZW1haWwiOiJ5dS5wYW5AaGV4bGFicy5vcmciLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjEwNjU2MTA3NjgxODYzNTc4MzEyMSJdLCJlbWFpbCI6WyJ5dS5wYW5AaGV4bGFicy5vcmciXX0sInNpZ25faW5fcHJvdmlkZXIiOiJjdXN0b20ifX0.jHLbLEzpIqObi6qTWqz4tDcKAxWR54R6s5Q4nZ0tidkb3KTXTgvWn0qcIgjRoZxTcIRyqDdGXhkbWcXO6OliJ6hmTXZy2rbtNsK7bwg_n-ZiVn914NIl_yjqzslKbwP0XxjzWPOysczDX5RPN59F9hU8iWyzdBxOdq91CIh-eWJoMj4efm-xIfYa2e-cw5QG1EL33JQr9u7NMDvfE5SlrXGn4vaR5ksETyK7BuyyVDqhegYpfeQ0eVh30_bhWM3Q7RgN2fO-jUDUNDxz5qJu_-2g5YCPmMA_fgEXQDUQPw15MgsBFHHD3Oytpw02PrTSC5WcQq6uThPrLsFw-ZvvEA";
    myHeaders.append("Authorization", "Bearer " + BEARER_TOKEN);

    const res = await fetch("http://localhost:8001/teams", {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    });

    setTeams(await res.json());
  }, []);

  let teamCards = teams.map(team => {
    return <TeamCard id={team.id} description={team.description} team={team} name={team.name} />;
  });

  return (
    <div>
      <div className="Cards-container">
        {teamCards.slice(props.sliceIndexStart, props.sliceIndexStart + props.numCardsPerPage)}
      </div>
      <div className="buttons-container">
        {props.sliceIndexStart !== 0 && <Button onClick={props.moveLeft}>Previous</Button>}
        {Math.floor(props.sliceIndexStart / props.numCardsPerPage) !==
          Math.floor((teamCards.length - 1) / props.numCardsPerPage) &&
          teamCards.length !== 0 && <Button onClick={props.moveRight}>Next</Button>}
      </div>
    </div>
  );
}
