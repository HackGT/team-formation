const resolvers = {
  Source: {
    __resolveType(obj, context, info) {
      if (context.team) {
        return "User";
      }
      if (context._id) {
        return "Team";
      }
      return null;
    },
  },
};

export default resolvers;
