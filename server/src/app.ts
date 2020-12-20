import fs from "fs";
import path from "path";
import express from "express";
import compression from "compression";
import morgan from "morgan";
import passport from "passport";
import session from "express-session";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
const { ApolloServer } = require("apollo-server-express");
import { GroundTruthStrategy } from "./routes/strategies";
import { userRoutes } from "./routes/user";
import schemaDirectives from "./directives";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";

dotenv.config();

const PORT = 3000;
const VERSION_NUMBER = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../package.json"), "utf8")
).version;

import User from "./models/user";
import { IUser } from "./types/user";

export let app = express();
app.use(morgan("dev"));
app.use(compression());
app.use(cors());
const session_secret = process.env["SECRET"];
if (!session_secret) {
  throw new Error("Secret not specified");
}
app.use(
  session({
    secret: session_secret,
    saveUninitialized: false,
    resave: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

export function loggedInErr(req, res, next) {
  if (req.user) {
    res.status(200).json({
      success: true,
    });
    next();
  } else {
    res.status(401).json({ error: "User not logged in", success: false });
    return;
  }
}

const gturl = String(process.env.GROUNDTRUTHURL || "login.hack.gt");
const groundTruthStrategy = new GroundTruthStrategy(gturl);
passport.use(groundTruthStrategy);
passport.serializeUser<IUser, string>((user, done) => {
  done(null, user.uuid);
});
passport.deserializeUser<IUser, string>((id, done) => {
  User.findOne({ uuid: id }, (err, user) => {
    done(err, user!);
  });
});

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
