/**
 * @flow
 * @relayHash f749db765bc3ef28343cffb1e41fd72d
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type OnTeamLeaveMutationVariables = {||};
export type OnTeamLeaveMutationResponse = {|
  +leave_team: ?{|
    +name: ?string
  |}
|};
export type OnTeamLeaveMutation = {|
  variables: OnTeamLeaveMutationVariables,
  response: OnTeamLeaveMutationResponse,
|};
*/


/*
mutation OnTeamLeaveMutation {
  leave_team {
    name
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
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "OnTeamLeaveMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "leave_team",
        "storageKey": null,
        "args": null,
        "concreteType": "User",
        "plural": false,
        "selections": [
          (v0/*: any*/)
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "OnTeamLeaveMutation",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "leave_team",
        "storageKey": null,
        "args": null,
        "concreteType": "User",
        "plural": false,
        "selections": [
          (v0/*: any*/),
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
    "name": "OnTeamLeaveMutation",
    "id": null,
    "text": "mutation OnTeamLeaveMutation {\n  leave_team {\n    name\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '5f64a44fc05fb94c0a60703402785ea1';
module.exports = node;
