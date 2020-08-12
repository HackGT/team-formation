/**
 * @flow
 * @relayHash 2109f5557ec6882b45e05d9a46072e0d
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
      +name: ?string
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
      id
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
v1 = [
  {
    "kind": "Variable",
    "name": "team_id",
    "variableName": "team_id",
    "type": "String"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "picture",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "interests",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "description",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "project_idea",
  "args": null,
  "storageKey": null
},
v8 = [
  (v2/*: any*/),
  (v3/*: any*/)
],
v9 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "notifications",
  "storageKey": null,
  "args": null,
  "concreteType": "Notification",
  "plural": true,
  "selections": [
    (v2/*: any*/),
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
          "selections": (v8/*: any*/)
        },
        {
          "kind": "InlineFragment",
          "type": "Team",
          "selections": (v8/*: any*/)
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
v10 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "public",
  "args": null,
  "storageKey": null
},
v11 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "team",
  "storageKey": null,
  "args": null,
  "concreteType": "Team",
  "plural": false,
  "selections": [
    (v2/*: any*/)
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
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "team",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Team",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "members",
            "storageKey": null,
            "args": null,
            "concreteType": "User",
            "plural": true,
            "selections": [
              (v3/*: any*/)
            ]
          },
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v9/*: any*/),
          (v10/*: any*/)
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "user_profile",
        "storageKey": null,
        "args": null,
        "concreteType": "User",
        "plural": false,
        "selections": [
          (v11/*: any*/)
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "TeamPageQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "team",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Team",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "members",
            "storageKey": null,
            "args": null,
            "concreteType": "User",
            "plural": true,
            "selections": [
              (v3/*: any*/),
              (v2/*: any*/)
            ]
          },
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v9/*: any*/),
          (v10/*: any*/)
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "user_profile",
        "storageKey": null,
        "args": null,
        "concreteType": "User",
        "plural": false,
        "selections": [
          (v11/*: any*/),
          (v2/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "TeamPageQuery",
    "id": null,
    "text": "query TeamPageQuery(\n  $team_id: String\n) {\n  team(team_id: $team_id) {\n    id\n    name\n    picture\n    members {\n      name\n      id\n    }\n    interests\n    description\n    project_idea\n    notifications {\n      id\n      bio\n      idea\n      sender {\n        __typename\n        ... on User {\n          id\n          name\n        }\n        ... on Team {\n          id\n          name\n        }\n      }\n      senderType\n    }\n    public\n  }\n  user_profile {\n    team {\n      id\n    }\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '00f03bd5ca6b4119712db88c0721dc7b';
module.exports = node;
