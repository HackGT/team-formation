/**
 * @flow
 * @relayHash f01ce9e59d11539198e2c5177b5d2ca3
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type HeaderFeedNameQueryVariables = {|
  uuid?: ?string
|};
export type HeaderFeedNameQueryResponse = {|
  +user_profile: {|
    +name: ?string
  |}
|};
export type HeaderFeedNameQuery = {|
  variables: HeaderFeedNameQueryVariables,
  response: HeaderFeedNameQueryResponse,
|};
*/


/*
query HeaderFeedNameQuery(
  $uuid: String
) {
  user_profile(uuid: $uuid) {
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
    "name": "HeaderFeedNameQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "user_profile",
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
    "name": "HeaderFeedNameQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "user_profile",
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
    "operationKind": "query",
    "name": "HeaderFeedNameQuery",
    "id": null,
    "text": "query HeaderFeedNameQuery(\n  $uuid: String\n) {\n  user_profile(uuid: $uuid) {\n    name\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '9529c3b649704bf27dd3ac4b3e2219e0';
module.exports = node;
