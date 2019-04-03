/**
 * @flow
 * @relayHash 02430334956a7c7104863998d268e8cf
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type FeedCardsQueryVariables = {|
  name?: ?string
|};
export type FeedCardsQueryResponse = {|
  +user: $ReadOnlyArray<{|
    +name: ?string,
    +school: ?string,
    +grad_year: ?string,
    +contact: ?string,
    +skills: ?$ReadOnlyArray<?string>,
    +experience: ?string,
  |}>
|};
export type FeedCardsQuery = {|
  variables: FeedCardsQueryVariables,
  response: FeedCardsQueryResponse,
|};
*/


/*
query FeedCardsQuery(
  $name: String
) {
  user(name: $name) {
    name
    school
    grad_year
    contact
    skills
    experience
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "name",
    "type": "String",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "user",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "name",
        "variableName": "name",
        "type": "String"
      }
    ],
    "concreteType": "User",
    "plural": true,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "name",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "school",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "grad_year",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "contact",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "skills",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "experience",
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
    "name": "FeedCardsQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "FeedCardsQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "FeedCardsQuery",
    "id": null,
    "text": "query FeedCardsQuery(\n  $name: String\n) {\n  user(name: $name) {\n    name\n    school\n    grad_year\n    contact\n    skills\n    experience\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '3fccab9ed03bed1ede41409aa2e81b39';
module.exports = node;
