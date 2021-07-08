// import { SchemaDirectiveVisitor } from 'apollo-server-express'
const { SchemaDirectiveVisitor } = require("apollo-server-express");
import { GraphQLField, defaultFieldResolver } from "graphql";
import { ensureSignedIn } from "../auth";

class AuthDirective extends SchemaDirectiveVisitor {
  public visitFieldDefinition(field: GraphQLField<any, any>) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = function (...args) {
      const [, , context] = args;

      ensureSignedIn(context);

      return resolve.apply(this, args);
    };
  }
}

export default AuthDirective;
