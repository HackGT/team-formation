import * as crypto from "crypto";
import * as express from "express";
import * as http from "http";
import * as https from "https";
import {
	pbkdf2Async,

    postParser,
    loggedInErr
} from "../app";
import {
	IUser, IUserMongoose, User, ITeam, ITeamMongoose, Team
} from "../schema";
import * as passport from "passport";
import { request } from "https";
import {createLink, AuthenticateOptions} from "./strategies"
import { RequestHandler } from "_debugger";
export let userRoutes = express.Router();

function loggedIn(req, res, next) {

    if (req.user && req.user.email === req.body.email) {
        console.log('req.user')
        res.status(200).json({
            "success": true
        });
    }
    else {
        next();
    }
}
userRoutes.route("/signup").post(postParser, async (request, response) => {
	let email: string = request.body.email || "";
	let password: string = request.body.password || "";
	email = email.trim();
	if (!email || !password) {
		response.status(400).json({
            "error": "Email or password not specified",
            "success": false
		});
		return;
	}

	let salt = crypto.randomBytes(32);
	let passwordHashed = await pbkdf2Async(password, salt, 500000, 128, "sha256");

	let user = new User({
		email: email,
		login: {
			hash: passwordHashed.toString("hex"),
			salt: salt.toString("hex")
		},
		admin: false
	});

	try {
		await user.save();
		response.status(201).json({
			success: true
		});
	}
    catch (err) {
        console.log(err);
		if (err.code === 11000) {
			response.status(400).json({
                "error": "A user with that email already exists",
                success: false
			});
			return;
		}
		console.error(err);
		response.status(500).json({
            "error": "An error occurred while creating user",
            success: false
		});
	}
});




userRoutes.route("/make_profile").post(postParser, async (request, response) => {

    if (!request.user) {
        response.status(400).json({
            "error": "User not logged in"
        });
        return;
    }
    let user = await User.findOne({ email: request.user.email });
    if (user != null) {
        for (var key in request.body) {
            if (Object.prototype.hasOwnProperty.call(request.body,key)) {
                user[key] = request.body[key];
            }
        }
        try {
            await user.save();
            response.status(201).json({

                "success": true

            });
        }
        catch (err) {
            console.error(err);
            response.status(500).json({
                "error": "An error occurred while making profile"
            });
            return;
        }
    }

});


userRoutes.route("/make_team").post(postParser, async (request, response) => {

    if (!request.user) {
        response.status(400).json({
            "error": "User not logged in"
        });
        return;
    }
    let team = new Team({creator: request.user.name});
    for (var key in request.body) {
        if (Object.prototype.hasOwnProperty.call(request.body,key)) {
            team[key] = request.body[key];
        }
    }
    try {
        await team.save();
        response.status(201).json({

            "success": true

        });
    }
    catch (err) {
        console.error(err);
        response.status(500).json({
            "error": "An error occurred while making team"
        });
        return;
    }


});

userRoutes.route("/email").post(postParser, async (request, response) => {
    let email: string = request.body.email || "";
    email = email.trim();
    if (!email) {
        response.status(400).json({
            "error": "Email not specified"
        });
        return;
    }
    let user = await User.findOne({ email: email });
    if (!user) {
        response.status(404).json({
            "error": "Email not registered"
        });
        return;
    } else {
        response.status(200).json({
            success: true,
            "id": user.uuid
        });
    }


});

userRoutes.route("/login").get((request, response, next) => {
    let callbackURL = createLink(request, "api/user/login/callback");

    passport.authenticate('oauth2', { callbackURL } as AuthenticateOptions)(request, response, next)
});
userRoutes.route("/login/callback").get((request, response, next) => {
    let callbackURL = createLink(request, "api/user/login/callback");
    
	if (request.query.error === "access_denied") {
		//request.flash("error", "Authentication request was denied");
		response.redirect("/login");
        return;
    }

	passport.authenticate("oauth2", {
		failureRedirect: "/api/user/login",
        successReturnToOrRedirect: "/api/user/success",
        callbackURL
    } as AuthenticateOptions)(request, response, next); 
});
userRoutes.route("/success").get((request, response, next) => {
    console.log(request);
    return response.status(200).json({ "success": true });
})


//not actually logging out
userRoutes.route("/logout").all((request, response) => {
    let user = request.user as IUser | undefined;
    const gturl = process.env.groundTruthurl || 'https://login.hack.gt'
	if (user) {
		let groundTruthURL = new URL(gturl);
		let requester = groundTruthURL.protocol === "http:" ? http : https;
        requester.request({
            hostname: gturl,
            path: "/api/user/logout",
			method: "POST",
			headers: {
				"Authorization": `Bearer ${user.token}`
			}
		}).end();

		request.logout();
	}
	if (request.session) {
		request.session.loginAction = "render";
	}
	response.redirect("/login");
});
