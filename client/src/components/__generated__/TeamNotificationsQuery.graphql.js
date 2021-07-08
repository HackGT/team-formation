/**
 * @flow
 * @relayHash a1f820eb14477e077db63be7ae4d8c39
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type TeamNotificationsQueryVariables = {|
  sent?: ?boolean
|};
export type TeamNotificationsQueryResponse = {|
  +team_notifications: $ReadOnlyArray<?{|
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
export type TeamNotificationsQuery = {|
  variables: TeamNotificationsQueryVariables,
  response: TeamNotificationsQueryResponse,
|};
*/


/*
query TeamNotificationsQuery(
  $sent: Boolean
) {
  team_notifications(sent: $sent) {
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
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "sent",
    "type": "Boolean",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "sent",
    "variableName": "sent",
    "type": "Boolean"
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
  "name": "message",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "bio",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "idea",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "InlineFragment",
  "type": "User",
  "selections": [
    (v2/*: any*/),
    (v7/*: any*/)
  ]
},
v9 = [
  (v6/*: any*/),
  (v8/*: any*/),
  {
    "kind": "InlineFragment",
    "type": "Team",
    "selections": [
      (v7/*: any*/)
    ]
  }
],
v10 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "senderType",
  "args": null,
  "storageKey": null
},
v11 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "resolved",
  "args": null,
  "storageKey": null
},
v12 = [
  (v6/*: any*/),
  (v8/*: any*/),
  {
    "kind": "InlineFragment",
    "type": "Team",
    "selections": [
      (v7/*: any*/),
      (v2/*: any*/)
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "TeamNotificationsQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "team_notifications",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Notification",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "sender",
            "storageKey": null,
            "args": null,
            "concreteType": null,
            "plural": false,
            "selections": (v9/*: any*/)
          },
          (v10/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "receiver",
            "storageKey": null,
            "args": null,
            "concreteType": null,
            "plural": false,
            "selections": (v9/*: any*/)
          },
          (v11/*: any*/)
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "TeamNotificationsQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "team_notifications",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Notification",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "sender",
            "storageKey": null,
            "args": null,
            "concreteType": null,
            "plural": false,
            "selections": (v12/*: any*/)
          },
          (v10/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "receiver",
            "storageKey": null,
            "args": null,
            "concreteType": null,
            "plural": false,
            "selections": (v12/*: any*/)
          },
          (v11/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "TeamNotificationsQuery",
    "id": null,
    "text": "query TeamNotificationsQuery(\n  $sent: Boolean\n) {\n  team_notifications(sent: $sent) {\n    id\n    message\n    bio\n    idea\n    sender {\n      __typename\n      ... on User {\n        id\n        name\n      }\n      ... on Team {\n        name\n        id\n      }\n    }\n    senderType\n    receiver {\n      __typename\n      ... on User {\n        id\n        name\n      }\n      ... on Team {\n        name\n        id\n      }\n    }\n    resolved\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'd7a150cf4fc7f3b4d11aaa0bc4b591e0';
module.exports = node;
