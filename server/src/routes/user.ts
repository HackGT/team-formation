import express from "express";
import request from "request";
import passport from "passport";

import { createLink, AuthenticateOptions } from "./strategies";
import { IUser, User } from "../schema";

export const userRoutes = express.Router();

userRoutes.route("/login").get((req, response, next) => {
  const callbackURL = createLink(req, "api/user/login/callback");
  passport.authenticate("oauth2", { callbackURL } as AuthenticateOptions)(req, response, next);
});

userRoutes.route("/login/callback").get((req, response, next) => {
  const callbackURL = createLink(req, "api/user/login/callback");

  if (req.query.error === "access_denied") {
    response.redirect("/login");
    return;
  }

  passport.authenticate("oauth2", {
    failureRedirect: "/",
    successReturnToOrRedirect: "/edit-profile",
    callbackURL,
  } as AuthenticateOptions)(req, response, next);
});

userRoutes.route("/check").get((req, response, next) => {
  if (req.user) {
    return response.status(200).json(req.user);
  }
  return response.status(400).json({ success: false });
});

userRoutes.route("/logout").all(async (req, response) => {
  const user = req.user as IUser | undefined;
  const gturl = process.env.GROUNDTRUTHURL || "https://login.hack.gt";
  if (user) {
    const options = {
      method: "POST",
      url: `${gturl}/api/user/logout`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    request(options, async (err, res, body) => {
      if (err) {
        return console.log(err);
      }
      await req.logout();
      return response.redirect("/api/user/login");
    });
  } else {
    response.redirect("/api/user/login");
  }
});

userRoutes.route("/slack/callback").all(async (req, response) => {
  console.log(req.query);
  const { code } = req.query;
  const urlStr = `https://slack.com/api/oauth.v2.access?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${code}&redirect_uri=https%3A%2F%2F${process.env.HOST_URL}%2Fapi%2Fuser%2Fslack%2Fcallback`;

  request(urlStr, async (err, resp, body) => {
    console.log("BODY");
    console.log(body);
    const user = req.user as IUser | undefined;
    const jsonBody = JSON.parse(body);
    if (jsonBody.team.id == process.env.TEAM_ID) {
      await User.findByIdAndUpdate(user?._id, {
        slackid: JSON.parse(body).authed_user.id,
      });
    }
  });
  response.redirect("/feed");
});
