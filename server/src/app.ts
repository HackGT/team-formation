import fs from "fs";
import path from "path";
import express from "express";
import compression from "compression";
import morgan from "morgan";

import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
const { ApolloServer } = require("apollo-server-express");
import { userRoutes } from "./routes/user";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";


dotenv.config();

const PORT = 3000;
const VERSION_NUMBER = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../package.json"), "utf8")
).version;

export let app = express();
app.use(morgan("dev"));
app.use(compression());
app.use(cors());

import schemaDirectives from "./directives"; // handles auth


let apiRouter = express.Router();

apiRouter.use("/user", userRoutes);
app.use("/api", apiRouter);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives,
  context: ({ req }) => {
    return req.user;
  },
  playground: {
    settings: {
      "editor.theme": "dark",
      "request.credentials": "include",
    },
  },
});

server.applyMiddleware({ app });

app.use(express.static(path.join(__dirname, "../../client/build")));
app.get("*", (request, response) => {
  response.sendFile(path.join(__dirname, "../../client/build", "index.html"));
});

const MONGO_URL = String(process.env.MONGO_URL);

(async () => {
  await mongoose
    .connect(MONGO_URL, {
      useMongoClient: false,
    })
    .catch((err) => {
      throw err;
    });
})();

app.listen(PORT, () => {
  console.log(
    `Team Formation system v${VERSION_NUMBER} started on port ${PORT}`
  );
});
