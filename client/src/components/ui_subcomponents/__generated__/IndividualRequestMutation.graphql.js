/**
 * @flow
 * @relayHash 28625187619ad35541e8d63ea79b4120
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type IndividualRequestMutationVariables = {|
  notification_id?: ?string
|};
export type IndividualRequestMutationResponse = {|
  +accept_user_request: ?{|
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
  $notification_id: String
) {
  accept_user_request(notification_id: $notification_id) {
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
    "name": "accept_user_request",
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
    "text": "mutation IndividualRequestMutation(\n  $notification_id: String\n) {\n  accept_user_request(notification_id: $notification_id) {\n    id\n    name\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '7621351c839149eac1653d550572c24b';
module.exports = node;
