/* eslint-disable @typescript-eslint/no-shadow */
import { URL } from "url";
import passport from "passport";
import { Strategy as OAuthStrategy } from "passport-oauth2";
import dotenv from "dotenv";
import request from "request";
import { Request } from "express";
import { createNew, IUser, User } from "../schema";
import { confirmationBranches } from "../constants/confirmationBranches";

dotenv.config();

type PassportDone = (
  err: Error | null,
  user?: IUser | false,
  errMessage?: { message: string }
) => void;
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
  slackid: string;
}

export type AuthenticateOptions = passport.AuthenticateOptions & {
  callbackURL: string;
};

export class GroundTruthStrategy extends OAuthStrategy {
  public readonly url: string;

  constructor(url: string) {
    const secret = process.env.GROUNDTRUTHSECRET;
    const id = process.env.GROUNDTRUTHID;
    if (!secret || !id) {
      throw new Error(
        `Client ID or secret not configured in environment variables for Ground Truth`
      );
    }
    const options: IOAuthStrategyOptions = {
      authorizationURL: new URL("/oauth/authorize", url).toString(),
      tokenURL: new URL("/oauth/token", url).toString(),
      clientID: id,
      clientSecret: secret,
      passReqToCallback: true,
    };
    super(options, GroundTruthStrategy.passportCallback);
    this.url = url;
  }

  public userProfile(accessToken: string, done: PassportProfileDone) {
    (this._oauth2 as any)._request(
      "GET",
      new URL("/api/user", this.url).toString(),
      null,
      null,
      accessToken,
      (err: Error | null, data: string) => {
        if (err) {
          done(err);
          return;
        }
        try {
          const profile: IProfile = {
            ...JSON.parse(data),
            token: accessToken,
          };
          done(null, profile);
        } catch (err: any) {
          done(err);
        }
      }
    );
  }

  protected static async passportCallback(
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: IProfile,
    done: PassportDone
  ) {
    console.log(profile);
    let user = await User.findOne({ uuid: profile.uuid });

    const GRAPHQLURL = process.env.GRAPHQLURL || "https://registration.2021.hack.gt/graphql";

    if (!user) {
      let confirmed = false;
      const query = `
            query($search: String!) {
                search_user(search: $search, offset: 0, n: 1) {
                    users {
                        confirmed
                        confirmationBranch
                    }
                }
            }`;
      const variables = {
        search: profile.email,
      };
      const options = {
        method: "POST",
        url: GRAPHQLURL,
        headers: {
          "Authorization": `Bearer ${process.env.GRAPHQLAUTH}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      };

      request(options, async (err, res, body) => {
        if (err) {
          return console.log(err);
        }

        const data = JSON.parse(body);
        let confirmationBranch;
        if (data.data.search_user.users.length > 0) {
          confirmed = data.data.search_user.users[0].confirmed;
          confirmationBranch = data.data.search_user.users[0].confirmationBranch;
        }
        const location =
          confirmationBranch === confirmationBranches.EMERGING_INPERSON ||
          confirmationBranch === confirmationBranches.GENERAL_INPERSON
            ? "In-Person"
            : "Virtual";
        const track =
          confirmationBranch === confirmationBranches.EMERGING_INPERSON ||
          confirmationBranch === confirmationBranches.EMERGING_VIRTUAL
            ? "Emerging"
            : "General";
        if (process.env.ISPRODUCTION === "false" || confirmed) {
          user = createNew<IUser>(User, {
            ...profile,
            visible: 1,
            location,
            track,
          });
          await user.save();
          done(null, user);
        } else {
          done(null, undefined);
        }
      });
    } else {
      user.token = accessToken;
      user.admin = false;
      await user.save();
      done(null, user);
    }
  }
}

function getExternalPort(req: Request): number {
  function defaultPort(): number {
    // Default ports for HTTP and HTTPS
    return req.protocol === "http" ? 80 : 443;
  }

  const { host } = req.headers;

  if (!host || Array.isArray(host)) {
    return defaultPort();
  }

  // IPv6 literal support
  const offset = host[0] === "[" ? host.indexOf("]") + 1 : 0;
  const index = host.indexOf(":", offset);

  if (index !== -1) {
    // eslint-disable-next-line radix
    return parseInt(host.substring(index + 1), 10);
  }

  return defaultPort();
}

export function createLink(req: Request, link: string): string {
  if (link[0] === "/") {
    link = link.substring(1);
  }
  if (
    (req.secure && getExternalPort(req) === 443) ||
    (!req.secure && getExternalPort(req) === 80)
  ) {
    return `http${req.secure ? "s" : ""}://${req.hostname}/${link}`;
  }
  return `http${req.secure ? "s" : ""}://${req.hostname}:${getExternalPort(req)}/${link}`;
}
