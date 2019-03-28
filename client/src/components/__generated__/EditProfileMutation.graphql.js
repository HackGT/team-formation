/**
 * @flow
 * @relayHash 92a6599b90acec2d7a22ef84e2c9f88b
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type EditProfileMutationVariables = {|
  id: string,
  name?: ?string,
  grad_year?: ?string,
  school?: ?string,
  secondary_email?: ?string,
  contact?: ?string,
  skills?: ?$ReadOnlyArray<?string>,
|};
export type EditProfileMutationResponse = {|
  +update_user: {|
    +name: ?string,
    +email: ?string,
    +grad_year: ?string,
    +school: ?string,
    +secondary_email: ?string,
    +skills: ?$ReadOnlyArray<?string>,
  |}
|};
export type EditProfileMutation = {|
  variables: EditProfileMutationVariables,
  response: EditProfileMutationResponse,
|};
*/


/*
mutation EditProfileMutation(
  $id: ID!
  $name: String
  $grad_year: String
  $school: String
  $secondary_email: String
  $contact: String
  $skills: [String]
) {
  update_user(id: $id, name: $name, grad_year: $grad_year, school: $school, secondary_email: $secondary_email, contact: $contact, skills: $skills) {
    name
    email
    grad_year
    school
    secondary_email
    skills
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "id",
    "type": "ID!",
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
    "name": "secondary_email",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "contact",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "skills",
    "type": "[String]",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "contact",
    "variableName": "contact",
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
    "name": "id",
    "variableName": "id",
    "type": "ID"
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
    "name": "secondary_email",
    "variableName": "secondary_email",
    "type": "String"
  },
  {
    "kind": "Variable",
    "name": "skills",
    "variableName": "skills",
    "type": "[String]"
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
  "name": "email",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "grad_year",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "school",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "secondary_email",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "skills",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "EditProfileMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "update_user",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/)
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "EditProfileMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "update_user",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
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
    "name": "EditProfileMutation",
    "id": null,
    "text": "mutation EditProfileMutation(\n  $id: ID!\n  $name: String\n  $grad_year: String\n  $school: String\n  $secondary_email: String\n  $contact: String\n  $skills: [String]\n) {\n  update_user(id: $id, name: $name, grad_year: $grad_year, school: $school, secondary_email: $secondary_email, contact: $contact, skills: $skills) {\n    name\n    email\n    grad_year\n    school\n    secondary_email\n    skills\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '200ee84a4365462963ec5d123d78f57c';
module.exports = node;
