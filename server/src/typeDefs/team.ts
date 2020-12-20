const { gql } = require("apollo-server-express");

export default gql`
    extend type Query {
        teams(search: String, name: String, picture: String, team_id: String, interests: String, description: String, public: Boolean): [Team!]! @auth
        team(team_id: String): Team! @auth
    }

    extend type Mutation {
        update_team(name: String, picture: String, interests: [String], description: String, public: Boolean, project_idea: String): Team @auth
        leave_team: User @auth
    }

    type Team {
        id: ID!
        name: String!
        picture: String
        members: [User!]
        interests: [String!]
        description: String
        project_idea: String
        notifications: [Notification!]!
        public: Boolean
    }
`