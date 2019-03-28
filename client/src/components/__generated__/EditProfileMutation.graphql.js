/**
 * @flow
 * @relayHash 6c658b52d535d58e586fbbd77a900fde
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type EditProfileMutationVariables = {|
  id: string,
  first_name?: ?string,
  last_name?: ?string,
  email?: ?string,
  grad_year?: ?string,
  school?: ?string,
  secondary_email?: ?string,
  contact?: ?string,
  skills?: ?$ReadOnlyArray<?string>,
|};
export type EditProfileMutationResponse = {|
  +update_user: {|
    +first_name: ?string,
    +last_name: ?string,
    +email: ?string,
    +grad_year: ?string,
    +school: ?string,
    +secondary_email: ?string,
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
  $first_name: String
  $last_name: String
  $email: String
  $grad_year: String
  $school: String
  $secondary_email: String
  $contact: String
  $skills: [String]
) {
  update_user(id: $id, first_name: $first_name, last_name: $last_name, email: $email, grad_year: $grad_year, school: $school, secondary_email: $secondary_email, contact: $contact, skills: $skills) {
    first_name
    last_name
    email
    grad_year
    school
    secondary_email
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
    "name": "first_name",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "last_name",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "email",
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
    "name": "email",
    "variableName": "email",
    "type": "String"
  },
  {
    "kind": "Variable",
    "name": "first_name",
    "variableName": "first_name",
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
    "name": "last_name",
    "variableName": "last_name",
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
  "name": "first_name",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "last_name",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "email",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "grad_year",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "school",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "secondary_email",
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
    "text": "mutation EditProfileMutation(\n  $id: ID!\n  $first_name: String\n  $last_name: String\n  $email: String\n  $grad_year: String\n  $school: String\n  $secondary_email: String\n  $contact: String\n  $skills: [String]\n) {\n  update_user(id: $id, first_name: $first_name, last_name: $last_name, email: $email, grad_year: $grad_year, school: $school, secondary_email: $secondary_email, contact: $contact, skills: $skills) {\n    first_name\n    last_name\n    email\n    grad_year\n    school\n    secondary_email\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '6ff36fcf862e7fd1dddd1b4d5fdc083e';
module.exports = node;
