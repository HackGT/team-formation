import * as express from "express";
import * as requests from "request"
import * as passport from "passport";
import { createLink, AuthenticateOptions } from "./strategies"
import { IUser } from "../schema";
export let userRoutes = express.Router();

userRoutes.route("/login").get((request, response, next) => {
    let callbackURL = createLink(request, "api/user/login/callback");
    passport.authenticate('oauth2', { callbackURL } as AuthenticateOptions)(request, response, next)
});

userRoutes.route("/login/callback").get((request, response, next) => {
    let callbackURL = createLink(request, "api/user/login/callback");
    
	if (request.query.error === "access_denied") {
		response.redirect("/login");
        return;
    }

	passport.authenticate("oauth2", {
		failureRedirect: "/api/user/failure",
        successReturnToOrRedirect: "/api/user/success",
        callbackURL
    } as AuthenticateOptions)(request, response, next); 
});

userRoutes.route("/success").get((request, response, next) => {
    return response.status(200).json({ "success": true });
})

userRoutes.route("/failure").get((request, response, next) => {
    return response.status(400).json({ "success": false });
})

userRoutes.route("/logout").all(async (request, response) => {
    let user = request.user as IUser | undefined;
    const gturl = process.env.groundTruthurl || 'https://login.hack.gt'
    if (user) {
        let options = {
            method: 'POST',
            url: gturl + '/api/user/logout',
            headers:
            {
                Authorization: `Bearer ${user.token}`
            }
        };
        await requests(options, (err, res, body) => {
            if (err) { return console.log(err); }
            request.logout();
            response.redirect("/api/user/login");
        });
    }
    else {
        response.redirect("/api/user/login");
    }
});
