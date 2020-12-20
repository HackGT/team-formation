const { AuthenticationError } = require("apollo-server-express");

export const ensureSignedIn = (context): void => {
  if (!context._id) { // check if user's id exists
    throw new AuthenticationError("You must be signed in.");
  }
};
