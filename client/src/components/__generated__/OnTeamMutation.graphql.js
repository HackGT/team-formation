/**
 * @flow
 * @relayHash bd5f8c08af584834fced782c7a5c5f5b
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type OnTeamMutationVariables = {|
  name?: ?string
|};
export type OnTeamMutationResponse = {|
  +update_team: ?{|
    +name: ?string
  |}
|};
export type OnTeamMutation = {|
  variables: OnTeamMutationVariables,
  response: OnTeamMutationResponse,
|};
*/


/*
mutation OnTeamMutation(
  $name: String
) {
  update_team(name: $name) {
    name
    id
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
    "kind": "Variable",
    "name": "name",
    "variableName": "name",
    "type": "String"
  }
],
v2 = {
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
    "name": "OnTeamMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "update_team",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Team",
        "plural": false,
        "selections": [
          (v2/*: any*/)
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "OnTeamMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "update_team",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Team",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
    "operationKind": "mutation",
    "name": "OnTeamMutation",
    "id": null,
    "text": "mutation OnTeamMutation(\n  $name: String\n) {\n  update_team(name: $name) {\n    name\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'b02e32ce7e1ea922c17ac8c73a9eb1ae';
module.exports = node;
