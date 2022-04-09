/**
 * @flow
 * @relayHash 2a4cc3dd05b3e231c51db688389f998f
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type TeamInformationMutationVariables = {|
  picture?: ?string,
  interests?: ?$ReadOnlyArray<?string>,
  description?: ?string,
  project_idea?: ?string,
|};
export type TeamInformationMutationResponse = {|
  +update_team: ?{|
    +picture: ?string,
    +interests: ?$ReadOnlyArray<?string>,
    +description: ?string,
    +project_idea: ?string,
  |}
|};
export type TeamInformationMutation = {|
  variables: TeamInformationMutationVariables,
  response: TeamInformationMutationResponse,
|};
*/


/*
mutation TeamInformationMutation(
  $picture: String
  $interests: [String]
  $description: String
  $project_idea: String
) {
  update_team(picture: $picture, interests: $interests, description: $description, project_idea: $project_idea) {
    picture
    interests
    description
    project_idea
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "picture",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "interests",
    "type": "[String]",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "description",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "project_idea",
    "type": "String",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "description",
    "variableName": "description",
    "type": "String"
  },
  {
    "kind": "Variable",
    "name": "interests",
    "variableName": "interests",
    "type": "[String]"
  },
  {
    "kind": "Variable",
    "name": "picture",
    "variableName": "picture",
    "type": "String"
  },
  {
    "kind": "Variable",
    "name": "project_idea",
    "variableName": "project_idea",
    "type": "String"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "picture",
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
  "name": "project_idea",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "TeamInformationMutation",
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
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/)
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "TeamInformationMutation",
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
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
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
    "name": "TeamInformationMutation",
    "id": null,
    "text": "mutation TeamInformationMutation(\n  $picture: String\n  $interests: [String]\n  $description: String\n  $project_idea: String\n) {\n  update_team(picture: $picture, interests: $interests, description: $description, project_idea: $project_idea) {\n    picture\n    interests\n    description\n    project_idea\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '045454525221835db801612036076455';
module.exports = node;
