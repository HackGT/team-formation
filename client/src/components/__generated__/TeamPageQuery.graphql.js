/**
 * @flow
 * @relayHash c4e92d46a7a95e52fa99d1160ba2136c
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type TeamPageQueryVariables = {|
  team_id?: ?string
|};
export type TeamPageQueryResponse = {|
  +team: {|
    +id: ?string,
    +name: ?string,
    +picture: ?string,
    +members: ?$ReadOnlyArray<?{|
      +name: ?string,
      +email: ?string,
      +school: ?string,
      +grad_year: ?string,
      +contact: ?string,
      +skills: ?$ReadOnlyArray<?string>,
      +experience: ?string,
      +visible: ?number,
      +uuid: ?string,
      +id: ?string,
      +slackid: ?string,
    |}>,
    +interests: ?$ReadOnlyArray<?string>,
    +description: ?string,
    +project_idea: ?string,
    +notifications: $ReadOnlyArray<{|
      +id: ?string,
      +bio: ?string,
      +idea: ?string,
      +sender: ?({|
        +__typename: "User",
        +id: ?string,
        +name: ?string,
      |} | {|
        // This will never be '%other', but we need some
        // value in case none of the concrete values match.
        +__typename: "%other"
      |}),
      +senderType: ?string,
    |}>,
    +public: ?boolean,
  |},
  +user_profile: {|
    +team: ?{|
      +id: ?string
    |}
  |},
|};
export type TeamPageQuery = {|
  variables: TeamPageQueryVariables,
  response: TeamPageQueryResponse,
|};
*/


/*
query TeamPageQuery(
  $team_id: String
) {
  team(team_id: $team_id) {
    id
    name
    picture
    members {
      name
      email
      school
      grad_year
      contact
      skills
      experience
      visible
      uuid
      id
      slackid
    }
    interests
    description
    project_idea
    notifications {
      id
      bio
      idea
      sender {
        __typename
        ... on User {
          id
          name
        }
        ... on Team {
          id
          name
        }
      }
      senderType
    }
    public
  }
  user_profile {
    team {
      id
    }
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "team_id",
    "type": "String",
    "defaultValue": null
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v3 = [
  (v1/*: any*/),
  (v2/*: any*/)
],
v4 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "team",
  "storageKey": null,
  "args": [
    {
      "kind": "Variable",
      "name": "team_id",
      "variableName": "team_id",
      "type": "String"
    }
  ],
  "concreteType": "Team",
  "plural": false,
  "selections": [
    (v1/*: any*/),
    (v2/*: any*/),
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "picture",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "members",
      "storageKey": null,
      "args": null,
      "concreteType": "User",
      "plural": true,
      "selections": [
        (v2/*: any*/),
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "email",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "school",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "grad_year",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "contact",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "skills",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "experience",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "visible",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "uuid",
          "args": null,
          "storageKey": null
        },
        (v1/*: any*/),
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "slackid",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "interests",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "description",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "project_idea",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "notifications",
      "storageKey": null,
      "args": null,
      "concreteType": "Notification",
      "plural": true,
      "selections": [
        (v1/*: any*/),
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "bio",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "idea",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "sender",
          "storageKey": null,
          "args": null,
          "concreteType": null,
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "__typename",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "InlineFragment",
              "type": "User",
              "selections": (v3/*: any*/)
            },
            {
              "kind": "InlineFragment",
              "type": "Team",
              "selections": (v3/*: any*/)
            }
          ]
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "senderType",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "public",
      "args": null,
      "storageKey": null
    }
  ]
},
v5 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "team",
  "storageKey": null,
  "args": null,
  "concreteType": "Team",
  "plural": false,
  "selections": [
    (v1/*: any*/)
  ]
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "TeamPageQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      (v4/*: any*/),
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "user_profile",
        "storageKey": null,
        "args": null,
        "concreteType": "User",
        "plural": false,
        "selections": [
          (v5/*: any*/)
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "TeamPageQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      (v4/*: any*/),
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "user_profile",
        "storageKey": null,
        "args": null,
        "concreteType": "User",
        "plural": false,
        "selections": [
          (v5/*: any*/),
          (v1/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "TeamPageQuery",
    "id": null,
    "text": "query TeamPageQuery(\n  $team_id: String\n) {\n  team(team_id: $team_id) {\n    id\n    name\n    picture\n    members {\n      name\n      email\n      school\n      grad_year\n      contact\n      skills\n      experience\n      visible\n      uuid\n      id\n      slackid\n    }\n    interests\n    description\n    project_idea\n    notifications {\n      id\n      bio\n      idea\n      sender {\n        __typename\n        ... on User {\n          id\n          name\n        }\n        ... on Team {\n          id\n          name\n        }\n      }\n      senderType\n    }\n    public\n  }\n  user_profile {\n    team {\n      id\n    }\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '733aca9a2f67c0f8010bf3a1d5d92ad8';
module.exports = node;
