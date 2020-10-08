import express from "express";
import request from "request"
import passport from "passport";
import { createLink, AuthenticateOptions } from "./strategies"
import { IUser, User } from "../schema";
export let userRoutes = express.Router();

userRoutes.route("/login").get((req, response, next) => {
    const callbackURL = createLink(req, "api/user/login/callback");
    passport.authenticate('oauth2', { callbackURL } as AuthenticateOptions)(req, response, next);
});

userRoutes.route("/login/callback").get((req, response, next) => {
    const callbackURL = createLink(req, "api/user/login/callback");

    if (req.query.error === "access_denied") {
        response.redirect("/login");
        return;
    }

    passport.authenticate("oauth2", {
        failureRedirect: "/",
        successReturnToOrRedirect: "/",
        callbackURL
    } as AuthenticateOptions)(req, response, next);
});

userRoutes.route("/check").get((req, response, next) => {
    if (req.user) {
        return response.status(200).json(req.user);
    } else {
        return response.status(400).json({"success": false});
    }
})

userRoutes.route("/logout").all(async (req, response) => {
    const user = req.user as IUser | undefined;
    const gturl = process.env.GROUNDTRUTHURL || 'https://login.hack.gt'
    if (user) {
        const options = {

            method: 'POST',
            url: gturl + '/api/user/logout',
            headers:
            {
                Authorization: `Bearer ${user.token}`
            }
        };
        await request(options, async (err, res, body) => {
            if (err) { return console.log(err); }
            await req.logout();
            response.redirect("/api/user/login");
        });
    }
    else {
        response.redirect("/api/user/login");
    }
});

userRoutes.route('/slack/callback').all(async (req, response) => {
    console.log(req.query);
    const code = req.query.code
    const urlStr = "https://slack.com/api/oauth.v2.access?client_id=" +
    process.env.CLIENT_ID + "&client_secret=" + process.env.CLIENT_SECRET + "&code=" + code + "&redirect_uri=https%3A%2F%2Fteamformation.dev.hack.gt%2Fapi%2Fuser%2Fslack%2Fcallback";
    console.log(urlStr);

    await request(urlStr, async (err, resp, body) => {
        console.log("BODY")
        console.log(body);
        await User.findByIdAndUpdate(req.user.id, {
            "slackid": JSON.parse(body)["authed_user"]["id"]
        })
        console.log("updated user " + JSON.parse(body)["authed_user"]["id"])
    });
    response.redirect("/feed");


});
