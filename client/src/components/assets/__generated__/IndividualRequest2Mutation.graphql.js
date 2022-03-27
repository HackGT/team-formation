/**
 * @flow
 * @relayHash 3fbe4af3873121d7c5cc58b83d7498fb
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type IndividualRequest2MutationVariables = {|
  notification_id?: ?string
|};
export type IndividualRequest2MutationResponse = {|
  +accept_team_request: ?{|
    +id: ?string,
    +name: ?string,
  |}
|};
export type IndividualRequest2Mutation = {|
  variables: IndividualRequest2MutationVariables,
  response: IndividualRequest2MutationResponse,
|};
*/


/*
mutation IndividualRequest2Mutation(
  $notification_id: String
) {
  accept_team_request(notification_id: $notification_id) {
    id
    name
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "notification_id",
    "type": "String",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "accept_team_request",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "notification_id",
        "variableName": "notification_id",
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
    "name": "IndividualRequest2Mutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "IndividualRequest2Mutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "IndividualRequest2Mutation",
    "id": null,
    "text": "mutation IndividualRequest2Mutation(\n  $notification_id: String\n) {\n  accept_team_request(notification_id: $notification_id) {\n    id\n    name\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'aa8b7fca721d6e956aef5218de42c40b';
module.exports = node;
