/**
 * @flow
 * @relayHash e04d48f593eae436dc060d87bcafd2ed
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type HeaderFeedNameQueryVariables = {||};
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
query HeaderFeedNameQuery {
  user_profile {
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
    "name": "HeaderFeedNameQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "user_profile",
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
    "name": "HeaderFeedNameQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "user_profile",
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
    "operationKind": "query",
    "name": "HeaderFeedNameQuery",
    "id": null,
    "text": "query HeaderFeedNameQuery {\n  user_profile {\n    name\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '9aa262b6718b00bc15049993a54b31a8';
module.exports = node;
