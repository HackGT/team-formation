/**
 * @flow
 * @relayHash 7931cf45695dc14149cfce5d2d495a2b
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type NotificationGroupQueryVariables = {||};
export type NotificationGroupQueryResponse = {|
  +notifications: $ReadOnlyArray<{|
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
  |}>
|};
export type NotificationGroupQuery = {|
  variables: NotificationGroupQueryVariables,
  response: NotificationGroupQueryResponse,
|};
*/


/*
query NotificationGroupQuery {
  notifications {
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
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "bio",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "idea",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v3 = [
  (v2/*: any*/),
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "name",
    "args": null,
    "storageKey": null
  }
],
v4 = {
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
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "senderType",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "NotificationGroupQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "notifications",
        "storageKey": null,
        "args": null,
        "concreteType": "Notification",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/)
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "NotificationGroupQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "notifications",
        "storageKey": null,
        "args": null,
        "concreteType": "Notification",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v2/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "NotificationGroupQuery",
    "id": null,
    "text": "query NotificationGroupQuery {\n  notifications {\n    bio\n    idea\n    sender {\n      __typename\n      ... on User {\n        id\n        name\n      }\n      ... on Team {\n        id\n        name\n      }\n    }\n    senderType\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '1322c60f022ce261fa8b2031974fb1d0';
module.exports = node;
