/**
 * @flow
 * @relayHash ff68f18a31b21f64dc36d175359b2506
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type TeamRequestMutationVariables = {|
  notification_id?: ?string
|};
export type TeamRequestMutationResponse = {|
  +accept_user_request: ?{|
    +id: ?string,
    +name: ?string,
  |}
|};
export type TeamRequestMutation = {|
  variables: TeamRequestMutationVariables,
  response: TeamRequestMutationResponse,
|};
*/


/*
mutation TeamRequestMutation(
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
    "name": "TeamRequestMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "TeamRequestMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "TeamRequestMutation",
    "id": null,
    "text": "mutation TeamRequestMutation(\n  $notification_id: String\n) {\n  accept_user_request(notification_id: $notification_id) {\n    id\n    name\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'e248f5060a0d8b700fcaf059ad4acdfa';
module.exports = node;
