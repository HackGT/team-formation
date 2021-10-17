/**
 * @flow
 * @relayHash 93fde5a5f18feec70098c9cc8a2c81cb
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type MembersQueryVariables = {||};
export type MembersQueryResponse = {|
  +user_profile: {|
    +team: ?{|
      +members: ?$ReadOnlyArray<?{|
        +name: ?string,
        +school: ?string,
        +grad_year: ?string,
        +contact: ?string,
        +skills: ?$ReadOnlyArray<?string>,
        +experience: ?string,
        +location: ?string,
      |}>
    |}
  |}
|};
export type MembersQuery = {|
  variables: MembersQueryVariables,
  response: MembersQueryResponse,
|};
*/


/*
query MembersQuery {
  user_profile {
    team {
      members {
        name
        school
        grad_year
        contact
        skills
        experience
        location
        id
      }
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
  "name": "school",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "grad_year",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "contact",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "skills",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "experience",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "location",
  "args": null,
  "storageKey": null
},
v7 = {
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
    "name": "MembersQuery",
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
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "team",
            "storageKey": null,
            "args": null,
            "concreteType": "Team",
            "plural": false,
            "selections": [
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
                  (v1/*: any*/),
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/)
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "MembersQuery",
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
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "team",
            "storageKey": null,
            "args": null,
            "concreteType": "Team",
            "plural": false,
            "selections": [
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
                  (v1/*: any*/),
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/)
                ]
              },
              (v7/*: any*/)
            ]
          },
          (v7/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "MembersQuery",
    "id": null,
    "text": "query MembersQuery {\n  user_profile {\n    team {\n      members {\n        name\n        school\n        grad_year\n        contact\n        skills\n        experience\n        location\n        id\n      }\n      id\n    }\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '3e63c6223ebff4946f6582e0efb494f0';
module.exports = node;
