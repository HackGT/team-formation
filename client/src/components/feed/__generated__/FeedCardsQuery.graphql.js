/**
 * @flow
 * @relayHash 993a52d8d838b4945b2e7931277eb4d6
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
  track?: ?string,
  location?: ?string,
|};
export type FeedCardsQueryResponse = {|
  +users: $ReadOnlyArray<{|
    +name: ?string,
    +email: ?string,
    +school: ?string,
    +grad_year: ?string,
    +contact: ?string,
    +skills: ?$ReadOnlyArray<?string>,
    +track: ?string,
    +experience: ?string,
    +visible: ?number,
    +uuid: ?string,
    +id: ?string,
    +slackid: ?string,
    +location: ?string,
  |}>,
  +user_profile: {|
    +team: ?{|
      +id: ?string
    |}
  |},
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
  $track: String
  $location: String
) {
  users(skill: $skill, grad_year: $grad_year, school: $school, search: $search, track: $track, location: $location) {
    name
    email
    school
    grad_year
    contact
    skills
    track
    experience
    visible
    uuid
    id
    slackid
    location
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
  },
  {
    "kind": "LocalArgument",
    "name": "track",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "location",
    "type": "String",
    "defaultValue": null
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v2 = {
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
      "name": "location",
      "variableName": "location",
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
    },
    {
      "kind": "Variable",
      "name": "track",
      "variableName": "track",
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
      "name": "email",
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
      "name": "track",
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
    (v1/*: any*/),
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "slackid",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "location",
      "args": null,
      "storageKey": null
    }
  ]
},
v3 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "team",
  "storageKey": null,
  "args": null,
  "concreteType": "Team",
  "plural": false,
  "selections": [
    (v1/*: any*/)
  ]
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "FeedCardsQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      (v2/*: any*/),
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "user_profile",
        "storageKey": null,
        "args": null,
        "concreteType": "User",
        "plural": false,
        "selections": [
          (v3/*: any*/)
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "FeedCardsQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      (v2/*: any*/),
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "user_profile",
        "storageKey": null,
        "args": null,
        "concreteType": "User",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v1/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "FeedCardsQuery",
    "id": null,
    "text": "query FeedCardsQuery(\n  $skill: String\n  $grad_year: String\n  $school: String\n  $search: String\n  $track: String\n  $location: String\n) {\n  users(skill: $skill, grad_year: $grad_year, school: $school, search: $search, track: $track, location: $location) {\n    name\n    email\n    school\n    grad_year\n    contact\n    skills\n    track\n    experience\n    visible\n    uuid\n    id\n    slackid\n    location\n  }\n  user_profile {\n    team {\n      id\n    }\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '2417d533a065e98cab9a98a977df204e';
module.exports = node;
