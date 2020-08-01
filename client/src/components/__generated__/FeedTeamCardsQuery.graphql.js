/**
 * @flow
 * @relayHash 819b27eeaec3e41751ed53bb34cfdaad
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type FeedTeamCardsQueryVariables = {||};
export type FeedTeamCardsQueryResponse = {|
  +get_teams: $ReadOnlyArray<{|
    +name: ?string,
    +interests: ?$ReadOnlyArray<?string>,
    +description: ?string,
    +public: ?boolean,
    +members: ?$ReadOnlyArray<?{|
      +name: ?string
    |}>,
  |}>
|};
export type FeedTeamCardsQuery = {|
  variables: FeedTeamCardsQueryVariables,
  response: FeedTeamCardsQueryResponse,
|};
*/


/*
query FeedTeamCardsQuery {
  get_teams {
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
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "interests",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "description",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "public",
  "args": null,
  "storageKey": null
},
v4 = {
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
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "get_teams",
        "storageKey": null,
        "args": null,
        "concreteType": "Team",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "members",
            "storageKey": null,
            "args": null,
            "concreteType": "User",
            "plural": true,
            "selections": [
              (v0/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "FeedTeamCardsQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "get_teams",
        "storageKey": null,
        "args": null,
        "concreteType": "Team",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "members",
            "storageKey": null,
            "args": null,
            "concreteType": "User",
            "plural": true,
            "selections": [
              (v0/*: any*/),
              (v4/*: any*/)
            ]
          },
          (v4/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "FeedTeamCardsQuery",
    "id": null,
    "text": "query FeedTeamCardsQuery {\n  get_teams {\n    name\n    interests\n    description\n    public\n    members {\n      name\n      id\n    }\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '6f691c329d1f12b122f8a4ed65385322';
module.exports = node;
