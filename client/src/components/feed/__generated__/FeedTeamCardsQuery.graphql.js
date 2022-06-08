/**
 * @flow
 * @relayHash 03ad01c68a042a6c48692e2be117f686
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
  +teams: $ReadOnlyArray<{|
    +name: ?string,
    +interests: ?$ReadOnlyArray<?string>,
    +description: ?string,
    +public: ?boolean,
    +members: ?$ReadOnlyArray<?{|
      +name: ?string
    |}>,
    +id: ?string,
  |}>,
  +user_profile: {|
    +team: ?{|
      +id: ?string
    |}
  |},
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
  teams(interests: $interests, search: $search) {
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
  user_profile {
    team {
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
},
v7 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "team",
  "storageKey": null,
  "args": null,
  "concreteType": "Team",
  "plural": false,
  "selections": [
    (v6/*: any*/)
  ]
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
        "name": "teams",
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
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "user_profile",
        "storageKey": null,
        "args": null,
        "concreteType": "User",
        "plural": false,
        "selections": [
          (v7/*: any*/)
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
        "name": "teams",
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
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "user_profile",
        "storageKey": null,
        "args": null,
        "concreteType": "User",
        "plural": false,
        "selections": [
          (v7/*: any*/),
          (v6/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "FeedTeamCardsQuery",
    "id": null,
    "text": "query FeedTeamCardsQuery(\n  $interests: String\n  $search: String\n) {\n  teams(interests: $interests, search: $search) {\n    name\n    interests\n    description\n    public\n    members {\n      name\n      id\n    }\n    id\n  }\n  user_profile {\n    team {\n      id\n    }\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'a6204e661d59721b6629dec7b54f1100';
module.exports = node;
