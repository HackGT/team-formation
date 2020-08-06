/**
 * @flow
 * @relayHash fbf9a011804afa2db797b78a765d0668
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type FeedTeamCardsQueryVariables = {|
  interests?: ?string,
  search?: ?string,
|};
export type FeedTeamCardsQueryResponse = {|
  +get_teams: $ReadOnlyArray<{|
    +name: ?string,
    +interests: ?$ReadOnlyArray<?string>,
    +description: ?string,
    +public: ?boolean,
    +members: ?$ReadOnlyArray<?{|
      +name: ?string
    |}>,
    +id: ?string,
  |}>
|};
export type FeedTeamCardsQuery = {|
  variables: FeedTeamCardsQueryVariables,
  response: FeedTeamCardsQueryResponse,
|};
*/


/*
query FeedTeamCardsQuery(
  $interests: String
  $search: String
) {
  get_teams(interests: $interests, search: $search) {
    name
    interests
    description
    public
    members {
      name
      id
    }
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "interests",
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
    "kind": "Variable",
    "name": "interests",
    "variableName": "interests",
    "type": "String"
  },
  {
    "kind": "Variable",
    "name": "search",
    "variableName": "search",
    "type": "String"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "interests",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "description",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "public",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "FeedTeamCardsQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "get_teams",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Team",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "members",
            "storageKey": null,
            "args": null,
            "concreteType": "User",
            "plural": true,
            "selections": [
              (v2/*: any*/)
            ]
          },
          (v6/*: any*/)
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "FeedTeamCardsQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "get_teams",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Team",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "members",
            "storageKey": null,
            "args": null,
            "concreteType": "User",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v6/*: any*/)
            ]
          },
          (v6/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "FeedTeamCardsQuery",
    "id": null,
    "text": "query FeedTeamCardsQuery(\n  $interests: String\n  $search: String\n) {\n  get_teams(interests: $interests, search: $search) {\n    name\n    interests\n    description\n    public\n    members {\n      name\n      id\n    }\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '8c9ff520e37ef2f826f3fb9d74f0b7f4';
module.exports = node;
