/**
 * @flow
 * @relayHash d85d3e2bee2c2d73debd4896b2eacf9c
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type IndividualRequestMutationVariables = {|
  user_id?: ?string
|};
export type IndividualRequestMutationResponse = {|
  +join_users_in_team: ?{|
    +id: ?string,
    +name: ?string,
  |}
|};
export type IndividualRequestMutation = {|
  variables: IndividualRequestMutationVariables,
  response: IndividualRequestMutationResponse,
|};
*/


/*
mutation IndividualRequestMutation(
  $user_id: String
) {
  join_users_in_team(user2: $user_id) {
    id
    name
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
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "join_users_in_team",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "user2",
        "variableName": "user_id",
        "type": "String"
      }
    ],
    "concreteType": "Team",
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
        "name": "name",
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
    "name": "IndividualRequestMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "IndividualRequestMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "IndividualRequestMutation",
    "id": null,
    "text": "mutation IndividualRequestMutation(\n  $user_id: String\n) {\n  join_users_in_team(user2: $user_id) {\n    id\n    name\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'cc1c48dacd802b652795954ce7e4d1b4';
module.exports = node;
