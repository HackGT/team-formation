/**
 * @flow
 * @relayHash 37609fe8c7b13eb8bf27e39e7f825127
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type TeamRequestsSentQueryVariables = {||};
export type TeamRequestsSentQueryResponse = {|
  +sent_team_notifications: $ReadOnlyArray<?{|
    +id: ?string,
    +message: ?string,
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
    +receiver: ?({|
      +__typename: "User",
      +id: ?string,
      +name: ?string,
    |} | {|
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      +__typename: "%other"
    |}),
    +resolved: ?boolean,
  |}>
|};
export type TeamRequestsSentQuery = {|
  variables: TeamRequestsSentQueryVariables,
  response: TeamRequestsSentQueryResponse,
|};
*/


/*
query TeamRequestsSentQuery {
  sent_team_notifications {
    id
    message
    bio
    idea
    sender {
      __typename
      ... on User {
        id
        name
      }
      ... on Team {
        name
        id
      }
    }
    senderType
    receiver {
      __typename
      ... on User {
        id
        name
      }
      ... on Team {
        name
        id
      }
    }
    resolved
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "message",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "bio",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "idea",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "InlineFragment",
  "type": "User",
  "selections": [
    (v0/*: any*/),
    (v5/*: any*/)
  ]
},
v7 = [
  (v4/*: any*/),
  (v6/*: any*/),
  {
    "kind": "InlineFragment",
    "type": "Team",
    "selections": [
      (v5/*: any*/)
    ]
  }
],
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "senderType",
  "args": null,
  "storageKey": null
},
v9 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "resolved",
  "args": null,
  "storageKey": null
},
v10 = [
  (v4/*: any*/),
  (v6/*: any*/),
  {
    "kind": "InlineFragment",
    "type": "Team",
    "selections": [
      (v5/*: any*/),
      (v0/*: any*/)
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "TeamRequestsSentQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "sent_team_notifications",
        "storageKey": null,
        "args": null,
        "concreteType": "Notification",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "sender",
            "storageKey": null,
            "args": null,
            "concreteType": null,
            "plural": false,
            "selections": (v7/*: any*/)
          },
          (v8/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "receiver",
            "storageKey": null,
            "args": null,
            "concreteType": null,
            "plural": false,
            "selections": (v7/*: any*/)
          },
          (v9/*: any*/)
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "TeamRequestsSentQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "sent_team_notifications",
        "storageKey": null,
        "args": null,
        "concreteType": "Notification",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "sender",
            "storageKey": null,
            "args": null,
            "concreteType": null,
            "plural": false,
            "selections": (v10/*: any*/)
          },
          (v8/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "receiver",
            "storageKey": null,
            "args": null,
            "concreteType": null,
            "plural": false,
            "selections": (v10/*: any*/)
          },
          (v9/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "TeamRequestsSentQuery",
    "id": null,
    "text": "query TeamRequestsSentQuery {\n  sent_team_notifications {\n    id\n    message\n    bio\n    idea\n    sender {\n      __typename\n      ... on User {\n        id\n        name\n      }\n      ... on Team {\n        name\n        id\n      }\n    }\n    senderType\n    receiver {\n      __typename\n      ... on User {\n        id\n        name\n      }\n      ... on Team {\n        name\n        id\n      }\n    }\n    resolved\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'a0f663963064ab2d189ad9db8fd29f6a';
module.exports = node;
