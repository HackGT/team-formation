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
const url_1 = require("url");
const passport_oauth2_1 = require("passport-oauth2");
const dotenv_1 = __importDefault(require("dotenv"));
const request_1 = __importDefault(require("request"));
const schema_1 = require("../schema");
dotenv_1.default.config();
class GroundTruthStrategy extends passport_oauth2_1.Strategy {
    constructor(url) {
        const secret = (process.env.GROUNDTRUTHSECRET);
        const id = (process.env.GROUNDTRUTHID);
        if (!secret || !id) {
            throw new Error(`Client ID or secret not configured in environment variables for Ground Truth`);
        }
        let options = {
            authorizationURL: new url_1.URL("/oauth/authorize", url).toString(),
            tokenURL: new url_1.URL("/oauth/token", url).toString(),
            clientID: id,
            clientSecret: secret,
            passReqToCallback: true
        };
        super(options, GroundTruthStrategy.passportCallback);
        this.url = url;
    }
    userProfile(accessToken, done) {
        this._oauth2._request("GET", new url_1.URL("/api/user", this.url).toString(), null, null, accessToken, (err, data) => {
            if (err) {
                done(err);
                return;
            }
            try {
                let profile = Object.assign({}, JSON.parse(data), { token: accessToken });
                done(null, profile);
            }
            catch (err) {
                return done(err);
            }
        });
    }
    static passportCallback(req, accessToken, refreshToken, profile, done) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield schema_1.User.findOne({ uuid: profile.uuid });
            const GRAPHQLURL = process.env.GRAPHQLURL || 'https://registration.hack.gt/graphql';
            if (!user) {
                let confirmed = false;
                const query = `
            query($search: String!) {
                search_user(search: $search, offset: 0, n: 1) {
                    users {
                        confirmed
                    }
                }
            }`;
                const variables = {
                    search: profile.email
                };
                const options = { method: 'POST',
                    url: GRAPHQLURL,
                    headers: {
                        Authorization: 'Bearer ' + process.env.GRAPHQLAUTH,
                        'Content-Type': "application/json"
                    },
                    body: JSON.stringify({
                        query,
                        variables
                    })
                };
                yield request_1.default(options, (err, res, body) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        return console.log(err);
                    }
                    if (JSON.parse(body).data.search_user.users.length > 0) {
                        confirmed = JSON.parse(body).data.search_user.users[0].confirmed;
                    }
                    if (confirmed) {
                        user = schema_1.createNew(schema_1.User, Object.assign({}, profile, { visible: 1 }));
                        yield user.save();
                        done(null, user);
                    }
                    else {
                        done(null, undefined);
                    }
                }));
            }
            else {
                user.token = accessToken;
                user.admin = false;
                yield user.save();
                done(null, user);
            }
        });
    }
}
exports.GroundTruthStrategy = GroundTruthStrategy;
function getExternalPort(req) {
    function defaultPort() {
        return req.protocol === "http" ? 80 : 443;
    }
    const host = req.headers.host;
    if (!host || Array.isArray(host)) {
        return defaultPort();
    }
    const offset = host[0] === "[" ? host.indexOf("]") + 1 : 0;
    const index = host.indexOf(":", offset);
    if (index !== -1) {
        return parseInt(host.substring(index + 1), 10);
    }
    else {
        return defaultPort();
    }
}
function createLink(req, link) {
    if (link[0] === "/") {
        link = link.substring(1);
    }
    if ((req.secure && getExternalPort(req) === 443) || (!req.secure && getExternalPort(req) === 80)) {
        return `http${req.secure ? "s" : ""}://${req.hostname}/${link}`;
    }
    else {
        return `http${req.secure ? "s" : ""}://${req.hostname}:${getExternalPort(req)}/${link}`;
    }
}
exports.createLink = createLink;
