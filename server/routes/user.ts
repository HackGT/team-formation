import * as crypto from "crypto";
import * as express from "express";
import {
	pbkdf2Async,
	mongoose,
	/*authenticateWithReject,
	authenticateWithRedirect,*/
	postParser
} from "../app";
import {
	IUser, IUserMongoose, User, ITeam, ITeamMongoose, Team
} from "../schema";
import * as passport from "passport";
import { request } from "https";
export let userRoutes = express.Router();

function loggedIn(req, res, next) {
    if (req.user) {
        console.log('user');
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
			"error": "Email or password not specified"
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
		auth_keys: [],
		admin: false
	});

	try {
		await user.save();
		response.status(201).json({
			"success": true
		});
	}
	catch (err) {
		if (err.code === 11000) {
			response.status(400).json({
				"error": "A user with that email already exists"
			});
			return;
		}
		console.error(err);
		response.status(500).json({
			"error": "An error occurred while creating user"
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
    //write to mongodb

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

    //write to mongodb

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
            "success": true
        });
    }



});

userRoutes.route("/login").post(postParser, loggedIn, passport.authenticate('local'), async (request, response) => {
    response.status(200).json({
        "success": true
    });
});
    /*
	if (request.cookies.auth) {
		let authKey: string = request.cookies.auth;
		await User.update({ "auth_keys": authKey }, { $pull: { "auth_keys": authKey } }).exec();
		response.clearCookie("auth");
	}

	let email: string = request.body.email || "";
	let password: string = request.body.password || "";
	email = email.trim();
	if (!email || !password) {
		response.status(400).json({
			"error": "Email or password not specified"
		});
		return;
	}

	let user = await User.findOne({email: email});
	let salt: Buffer;
	if (!user) {
		salt = new Buffer(32);
	}
	else {
		salt = Buffer.from(user.login.salt, "hex");
	}
	// Hash the password in both cases so that requests for non-existant emails take the same amount of time as existant ones
	let passwordHashed = await pbkdf2Async(password, salt, 500000, 128, "sha256");
	if (!user || user.login.hash !== passwordHashed.toString("hex")) {
		response.status(401).json({
			"error": "Email or password incorrect"
		});
		return;
	}
	let authKey = crypto.randomBytes(32).toString("hex");
	user.auth_keys.push(authKey);

	try {
		await user.save();
		response.cookie("auth", authKey);
		response.status(200).json({
			"success": true
		});
	}
	catch (err) {
		console.error(err);
		response.status(500).json({
			"error": "An error occurred while logging in"
		});
    }*/

userRoutes.route("/logout").all(async (request, response) => {
	try {
		if (request.cookies.auth) {
			let authKey: string = request.cookies.auth;
			await User.update({ "auth_keys": authKey }, { $pull: { "auth_keys": authKey } }).exec();
			response.clearCookie("auth");
		}
		response.status(200).json({
			"success": true
		});
	}
	catch (err) {
		console.error(err);
		response.status(500).json({
			"error": "An error occurred while signing out"
		});
	}
});
