"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const request_1 = __importDefault(require("request"));
const passport_1 = __importDefault(require("passport"));
const strategies_1 = require("./strategies");
exports.userRoutes = express_1.default.Router();
exports.userRoutes.route("/login").get((req, response, next) => {
    const callbackURL = strategies_1.createLink(req, "api/user/login/callback");
    passport_1.default.authenticate('oauth2', { callbackURL })(req, response, next);
});
exports.userRoutes.route("/login/callback").get((req, response, next) => {
    const callbackURL = strategies_1.createLink(req, "api/user/login/callback");
    if (req.query.error === "access_denied") {
        response.redirect("/login");
        return;
    }
    passport_1.default.authenticate("oauth2", {
        failureRedirect: "/",
        successReturnToOrRedirect: "/",
        callbackURL
    })(req, response, next);
});
exports.userRoutes.route("/check").get((req, response, next) => {
    if (req.user) {
        return response.status(200).json(req.user);
    }
    else {
        return response.status(400).json({ "success": false });
    }
});
exports.userRoutes.route("/logout").all((req, response) => __awaiter(this, void 0, void 0, function* () {
    const user = req.user;
    const gturl = process.env.GROUNDTRUTHURL || 'https://login.hack.gt';
    if (user) {
        const options = {
            method: 'POST',
            url: gturl + '/api/user/logout',
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        };
        yield request_1.default(options, (err, res, body) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                return console.log(err);
            }
            yield req.logout();
            response.redirect("/api/user/login");
        }));
    }
    else {
        response.redirect("/api/user/login");
    }
}));
