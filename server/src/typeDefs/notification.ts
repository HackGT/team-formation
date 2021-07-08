const { gql } = require("apollo-server-express");

export default gql`
    extend type Query {
        notifications(receiver_id: String): [Notification!]! @auth
        team_notifications(sent: Boolean): [Notification]! @auth
    }

    extend type Mutation {
        accept_team_request(notification_id: String): Team @auth
        accept_user_request(notification_id: String): Team @auth
        make_team_request(team_id: String, user_id: String, bio: String, idea: String): Notification @auth
        make_user_request(user_id: String, bio: String, idea: String): Notification @auth
    }

    union Source = User | Team

    type Notification {
        id: ID
        message: String
        bio: String
        idea: String
        sender: Source
        senderType: String
        receiver: Source
        resolved: Boolean
    }
`