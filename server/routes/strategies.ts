
import { URL } from "url";
import * as passport from "passport";
import { Strategy as OAuthStrategy } from "passport-oauth2";
import * as dotenv from "dotenv"
import * as requests from "request"
// TODO import { trackEvent } from "../middleware";
import { createNew, IUser, User } from "../schema";
import { Request, Response, NextFunction } from "express";
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

// Because the passport typedefs don't include this for some reason
// Defined: https://github.com/jaredhanson/passport-oauth2/blob/9ddff909a992c3428781b7b2957ce1a97a924367/lib/strategy.js#L135
export type AuthenticateOptions = passport.AuthenticateOptions & {
	callbackURL: string;
};

export class GroundTruthStrategy extends OAuthStrategy {
	public readonly url: string;

	public static get defaultUserProperties() {
        return {
            
		};
	}

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
        if (!user) {
            var confirmed = false;
            let options = { method: 'GET',
                url: 'https://registration.horizons.hack.gt/graphql',
                qs: {
                    query: '{search_user(search:"abhinavk99@gmail.com", offset:0, n:1){users{confirmed}}}'
                },
                headers: 
                {
                    Authorization: 'Bearer ' + process.env.graphqlAuth
                }
            };
            requests(options, (err, res, body) => {
                if (err) { return console.log(err); }
                confirmed = JSON.parse(body).data.search_user.users[0].confirmed
            });
            //Manually set confirmed true for testing
            confirmed = true;
            if (confirmed) {
                user = createNew<IUser>(User, {
                    ...GroundTruthStrategy.defaultUserProperties,
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