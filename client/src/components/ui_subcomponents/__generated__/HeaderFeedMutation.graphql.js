/**
 * @flow
 * @relayHash adff5bb6c024730963ed53f8632956d4
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type HeaderFeedMutationVariables = {|
  uuid?: ?string
|};
export type HeaderFeedMutationResponse = {|
  +toggle_visibility: {|
    +name: ?string
  |}
|};
export type HeaderFeedMutation = {|
  variables: HeaderFeedMutationVariables,
  response: HeaderFeedMutationResponse,
|};
*/


/*
mutation HeaderFeedMutation(
  $uuid: String
) {
  toggle_visibility(uuid: $uuid) {
    name
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "uuid",
    "type": "String",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "uuid",
    "variableName": "uuid",
    "type": "String"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "HeaderFeedMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "toggle_visibility",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "plural": false,
        "selections": [
          (v2/*: any*/)
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "HeaderFeedMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "toggle_visibility",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "HeaderFeedMutation",
    "id": null,
    "text": "mutation HeaderFeedMutation(\n  $uuid: String\n) {\n  toggle_visibility(uuid: $uuid) {\n    name\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '9f033dc9cde9962c95984917ae17dc8d';
module.exports = node;
