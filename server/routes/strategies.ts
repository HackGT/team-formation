import { URL } from "url";
import * as passport from "passport";
import { Strategy as OAuthStrategy } from "passport-oauth2";
import * as dotenv from "dotenv"
import * as requests from "request"
import { Request } from "express";
import { createNew, IUser, User } from "../schema";

dotenv.config()

type PassportDone = (err: Error | null, user?: IUser | false, errMessage?: { message: string }) => void;
type PassportProfileDone = (err: Error | null, profile?: IProfile) => void;

interface IStrategyOptions {
    passReqToCallback: true; // Forced to true for our usecase
}

interface IOAuthStrategyOptions extends IStrategyOptions {
    authorizationURL: string;
    tokenURL: string;
    clientID: string;
    clientSecret: string;
}

interface IProfile {
    uuid: string;
    name: string;
    email: string;
    token: string;
}

export type AuthenticateOptions = passport.AuthenticateOptions & {
    callbackURL: string;
};

export class GroundTruthStrategy extends OAuthStrategy {
    public readonly url: string;

    constructor(url: string) {
        const secret = (process.env.groundTruthSecret);
        const id = (process.env.groundTruthid);
        if (!secret || !id) {
            throw new Error(`Client ID or secret not configured in environment variables for Ground Truth`);
        }
        let options: IOAuthStrategyOptions = {
            authorizationURL: new URL("/oauth/authorize", url).toString(),
            tokenURL: new URL("/oauth/token", url).toString(),
            clientID: id,
            clientSecret: secret,
            passReqToCallback: true
        };
        super(options, GroundTruthStrategy.passportCallback);
        this.url = url;
    }

    public userProfile(accessToken: string, done: PassportProfileDone) {
        (this._oauth2 as any)._request("GET", new URL("/api/user", this.url).toString(), null, null, accessToken, (err: Error | null, data: string) => {
            if (err) {
                done(err);
                return;
            }
            try {
                let profile: IProfile = {
                    ...JSON.parse(data),
                    token: accessToken
                };
                done(null, profile);
            }
            catch (err) {
                return done(err);
            }
        });
    }

    protected static async passportCallback(request: Request,  accessToken: string, refreshToken: string, profile: IProfile, done: PassportDone) {
        let user = await User.findOne({ uuid: profile.uuid });
        let graphqlUrl = process.env.graphqlUrl || 'https://registration.hack.gt/graphql'

        if (!user) {
            let confirmed = false;
            const options = { method: 'GET',
                url: graphqlUrl,
                qs: {
                    query: '{search_user(search:"' + profile.email + '", offset:0, n:1){users{confirmed}}}'
                },
                headers:
                {
                    Authorization: 'Bearer ' + process.env.graphqlAuth
                }
            };

            requests(options, (err, res, body) => {
                if (err) { return console.log(err); }
                let check_users = JSON.parse(body).data.search_user.users;
                if(check_users.length != 0) {
                    confirmed = check_users[0].confirmed;
                } else {
                    confirmed = false;
                }
            });
            confirmed = true;
            if (confirmed) {
                user = createNew<IUser>(User, {
                    ...profile
                });
            }
        } else {
            user.token = accessToken;
            user.admin = false;
        }

        if (user) {
            await user.save();
            done(null, user);
        } else {
            done(null, undefined);
        }
    }
}

function getExternalPort(request: Request): number {
    function defaultPort(): number {
        // Default ports for HTTP and HTTPS
        return request.protocol === "http" ? 80 : 443;
    }

    let host = request.headers.host;
    if (!host || Array.isArray(host)) {
        return defaultPort();
    }

    // IPv6 literal support
    let offset = host[0] === "[" ? host.indexOf("]") + 1 : 0;
    let index = host.indexOf(":", offset);
    if (index !== -1) {
        return parseInt(host.substring(index + 1), 10);
    }
    else {
        return defaultPort();
    }
}

export function createLink(request: Request, link: string): string {
    if (link[0] === "/") {
        link = link.substring(1);
    }
    if ((request.secure && getExternalPort(request) === 443) || (!request.secure && getExternalPort(request) === 80)) {
        return `http${request.secure ? "s" : ""}://${request.hostname}/${link}`;
    }
    else {
        return `http${request.secure ? "s" : ""}://${request.hostname}:${getExternalPort(request)}/${link}`;
    }
}