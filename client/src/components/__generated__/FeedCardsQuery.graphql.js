/**
 * @flow
 * @relayHash ae4bd7bef6514aa6d90ceb336834ec7d
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type FeedCardsQueryVariables = {|
  skill?: ?string,
  grad_year?: ?string,
  school?: ?string,
  search?: ?string,
|};
export type FeedCardsQueryResponse = {|
  +users: $ReadOnlyArray<{|
    +name: ?string,
    +school: ?string,
    +grad_year: ?string,
    +contact: ?string,
    +skills: ?$ReadOnlyArray<?string>,
    +experience: ?string,
    +visible: ?number,
    +uuid: ?string,
    +id: ?string,
  |}>
|};
export type FeedCardsQuery = {|
  variables: FeedCardsQueryVariables,
  response: FeedCardsQueryResponse,
|};
*/


/*
query FeedCardsQuery(
  $skill: String
  $grad_year: String
  $school: String
  $search: String
) {
  users(skill: $skill, grad_year: $grad_year, school: $school, search: $search) {
    name
    school
    grad_year
    contact
    skills
    experience
    visible
    uuid
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "skill",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "grad_year",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "school",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "search",
    "type": "String",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "users",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "grad_year",
        "variableName": "grad_year",
        "type": "String"
      },
      {
        "kind": "Variable",
        "name": "school",
        "variableName": "school",
        "type": "String"
      },
      {
        "kind": "Variable",
        "name": "search",
        "variableName": "search",
        "type": "String"
      },
      {
        "kind": "Variable",
        "name": "skill",
        "variableName": "skill",
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
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "visible",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "uuid",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "id",
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
    "text": "query FeedCardsQuery(\n  $skill: String\n  $grad_year: String\n  $school: String\n  $search: String\n) {\n  users(skill: $skill, grad_year: $grad_year, school: $school, search: $search) {\n    name\n    school\n    grad_year\n    contact\n    skills\n    experience\n    visible\n    uuid\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'f92f21f91193c45020dda4a481b127c5';
module.exports = node;
