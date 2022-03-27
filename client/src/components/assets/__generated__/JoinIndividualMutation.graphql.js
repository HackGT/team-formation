/**
 * @flow
 * @relayHash 6b1b801b53f79f5046b8e65a614767a1
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type JoinIndividualMutationVariables = {|
  user_id?: ?string,
  bio?: ?string,
  idea?: ?string,
|};
export type JoinIndividualMutationResponse = {|
  +make_user_request: ?{|
    +id: ?string,
    +message: ?string,
    +bio: ?string,
    +idea: ?string,
    +resolved: ?boolean,
  |}
|};
export type JoinIndividualMutation = {|
  variables: JoinIndividualMutationVariables,
  response: JoinIndividualMutationResponse,
|};
*/


/*
mutation JoinIndividualMutation(
  $user_id: String
  $bio: String
  $idea: String
) {
  make_user_request(user_id: $user_id, bio: $bio, idea: $idea) {
    id
    message
    bio
    idea
    resolved
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "user_id",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "bio",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "idea",
    "type": "String",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "make_user_request",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "bio",
        "variableName": "bio",
        "type": "String"
      },
      {
        "kind": "Variable",
        "name": "idea",
        "variableName": "idea",
        "type": "String"
      },
      {
        "kind": "Variable",
        "name": "user_id",
        "variableName": "user_id",
        "type": "String"
      }
    ],
    "concreteType": "Notification",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "id",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "message",
        "args": null,
        "storageKey": null
      },
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
        "kind": "ScalarField",
        "alias": null,
        "name": "resolved",
        "args": null,
        "storageKey": null
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "JoinIndividualMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "JoinIndividualMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "JoinIndividualMutation",
    "id": null,
    "text": "mutation JoinIndividualMutation(\n  $user_id: String\n  $bio: String\n  $idea: String\n) {\n  make_user_request(user_id: $user_id, bio: $bio, idea: $idea) {\n    id\n    message\n    bio\n    idea\n    resolved\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'fb36ba986ff63454e5f3714412018d3a';
module.exports = node;
