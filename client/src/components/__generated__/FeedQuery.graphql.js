/**
 * @flow
 * @relayHash 376250f42b3349773fc365bcef2268a7
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type FeedQueryVariables = {|
  school?: ?string
|};
export type FeedQueryResponse = {|
  +user: $ReadOnlyArray<{|
    +email: ?string,
    +name: ?string,
    +school: ?string,
    +grad_year: ?string,
  |}>
|};
export type FeedQuery = {|
  variables: FeedQueryVariables,
  response: FeedQueryResponse,
|};
*/


/*
query FeedQuery(
  $school: String
) {
  user(school: $school) {
    email
    name
    school
    grad_year
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "school",
    "type": "String",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "school",
    "variableName": "school",
    "type": "String"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "email",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "school",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "grad_year",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "FeedQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "user",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/)
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "FeedQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "user",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
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
    "name": "FeedQuery",
    "id": null,
    "text": "query FeedQuery(\n  $school: String\n) {\n  user(school: $school) {\n    email\n    name\n    school\n    grad_year\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'b672f1a543bb84b11d48da1b4dcdc67f';
module.exports = node;
