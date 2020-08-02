/**
 * @flow
 * @relayHash c2d5e7ab8f22be2ab8cbf5e5508aad3d
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type JoinTeamMutationVariables = {|
  team_id?: ?string,
  bio?: ?string,
  idea?: ?string,
|};
export type JoinTeamMutationResponse = {|
  +make_team_request: ?{|
    +id: ?string,
    +idea: ?string,
    +bio: ?string,
  |}
|};
export type JoinTeamMutation = {|
  variables: JoinTeamMutationVariables,
  response: JoinTeamMutationResponse,
|};
*/


/*
mutation JoinTeamMutation(
  $team_id: String
  $bio: String
  $idea: String
) {
  make_team_request(team_id: $team_id, bio: $bio, idea: $idea) {
    id
    idea
    bio
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "team_id",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "bio",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "idea",
    "type": "String",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "make_team_request",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "bio",
        "variableName": "bio",
        "type": "String"
      },
      {
        "kind": "Variable",
        "name": "idea",
        "variableName": "idea",
        "type": "String"
      },
      {
        "kind": "Variable",
        "name": "team_id",
        "variableName": "team_id",
        "type": "String"
      }
    ],
    "concreteType": "Notification",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "id",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "idea",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "bio",
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
    "name": "JoinTeamMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "JoinTeamMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "JoinTeamMutation",
    "id": null,
    "text": "mutation JoinTeamMutation(\n  $team_id: String\n  $bio: String\n  $idea: String\n) {\n  make_team_request(team_id: $team_id, bio: $bio, idea: $idea) {\n    id\n    idea\n    bio\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '17343e0dd29df8c6747dc39e2470943f';
module.exports = node;
