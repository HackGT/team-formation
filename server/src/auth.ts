
const { AuthenticationError } = require("apollo-server-express");
import { app } from './app'
import passport from "passport";
import session from "express-session";
import { GroundTruthStrategy } from "./routes/strategies";
import User from "./models/user";
import { IUser } from "./types/user";

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

export const ensureSignedIn = (context): void => {
  if (!context._id) { // check if user's id exists
    throw new AuthenticationError("You must be signed in.");
  }
};
