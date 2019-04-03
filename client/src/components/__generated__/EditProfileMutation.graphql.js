/**
 * @flow
 * @relayHash 46a3a6fd60ab70c3d2fec94d3492f950
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type EditProfileMutationVariables = {|
  uuid?: ?string,
  name?: ?string,
  grad_year?: ?string,
  school?: ?string,
  skills?: ?$ReadOnlyArray<?string>,
  experience?: ?string,
  contact?: ?string,
|};
export type EditProfileMutationResponse = {|
  +update_user: {|
    +name: ?string,
    +grad_year: ?string,
    +school: ?string,
    +skills: ?$ReadOnlyArray<?string>,
    +experience: ?string,
    +contact: ?string,
  |}
|};
export type EditProfileMutation = {|
  variables: EditProfileMutationVariables,
  response: EditProfileMutationResponse,
|};
*/


/*
mutation EditProfileMutation(
  $uuid: String
  $name: String
  $grad_year: String
  $school: String
  $skills: [String]
  $experience: String
  $contact: String
) {
  update_user(uuid: $uuid, name: $name, grad_year: $grad_year, school: $school, skills: $skills, experience: $experience, contact: $contact) {
    name
    grad_year
    school
    skills
    experience
    contact
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "uuid",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "name",
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
    "name": "skills",
    "type": "[String]",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "experience",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "contact",
    "type": "String",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "update_user",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "contact",
        "variableName": "contact",
        "type": "String"
      },
      {
        "kind": "Variable",
        "name": "experience",
        "variableName": "experience",
        "type": "String"
      },
      {
        "kind": "Variable",
        "name": "grad_year",
        "variableName": "grad_year",
        "type": "String"
      },
      {
        "kind": "Variable",
        "name": "name",
        "variableName": "name",
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
        "name": "skills",
        "variableName": "skills",
        "type": "[String]"
      },
      {
        "kind": "Variable",
        "name": "uuid",
        "variableName": "uuid",
        "type": "String"
      }
    ],
    "concreteType": "User",
    "plural": false,
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
        "name": "grad_year",
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
        "name": "contact",
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
    "name": "EditProfileMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "EditProfileMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "EditProfileMutation",
    "id": null,
    "text": "mutation EditProfileMutation(\n  $uuid: String\n  $name: String\n  $grad_year: String\n  $school: String\n  $skills: [String]\n  $experience: String\n  $contact: String\n) {\n  update_user(uuid: $uuid, name: $name, grad_year: $grad_year, school: $school, skills: $skills, experience: $experience, contact: $contact) {\n    name\n    grad_year\n    school\n    skills\n    experience\n    contact\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'b5c1afc23f32cb13a2f5e6eb887fe2f3';
module.exports = node;
