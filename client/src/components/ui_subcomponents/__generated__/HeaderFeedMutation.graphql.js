/**
 * @flow
 * @relayHash 4c0850f7d8e463d8357a987f45abb273
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type HeaderFeedMutationVariables = {||};
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
mutation HeaderFeedMutation {
  toggle_visibility {
    name
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
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
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "toggle_visibility",
        "storageKey": null,
        "args": null,
        "concreteType": "User",
        "plural": false,
        "selections": [
          (v0/*: any*/)
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "HeaderFeedMutation",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "toggle_visibility",
        "storageKey": null,
        "args": null,
        "concreteType": "User",
        "plural": false,
        "selections": [
          (v0/*: any*/),
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
    "text": "mutation HeaderFeedMutation {\n  toggle_visibility {\n    name\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'd68b2220786c360f6732d709278a74bd';
module.exports = node;
