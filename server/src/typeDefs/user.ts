const { gql } = require("apollo-server-express");

export default gql`
    extend type Query {
        users(search: String, skill: String, name: String, email: String, grad_year: String, school: String, visible: Int): [User!]! @auth
        user(user_id: String): User! @auth
        user_profile: User! @auth
    }

    extend type Mutation {
        update_user(name: String email: String, grad_year: String, school: String, contact: String, skills: [String], experience: String, contact_method: String, visible: Int): User! @auth
    }

    type User {
        id: ID!
        uuid: String
        name: String!
        email: String!
        school: String
        grad_year: String
        beginner: Boolean
        skills: [String!]
        experience: String
        contact: String
        contact_method: String
        visible: Int
        team: Team
        slackid: String
    }   
`