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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const morgan_1 = __importDefault(require("morgan"));
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const express_graphql_1 = __importDefault(require("express-graphql"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const graphql_1 = require("graphql");
const strategies_1 = require("./routes/strategies");
const schema_1 = require("./schema");
const user_1 = require("./routes/user");
dotenv_1.default.config();
const PORT = 3000;
const typeDefs = fs_1.default.readFileSync(path_1.default.resolve(__dirname, "../api.graphql"), "utf8");
const VERSION_NUMBER = JSON.parse(fs_1.default.readFileSync(path_1.default.resolve(__dirname, "../package.json"), "utf8")).version;
exports.app = express_1.default();
if (process.env.ISPRODUCTION === 'true') {
    exports.app.enable("trust proxy");
}
else {
    console.warn("OAuth callback(s) running in development mode");
}
exports.app.use(morgan_1.default("dev"));
exports.app.use(compression_1.default());
exports.app.use(cors_1.default());
const session_secret = process.env['SECRET'];
if (!session_secret) {
    throw new Error("Secret not specified");
}
exports.app.use(express_session_1.default({
    secret: session_secret,
    saveUninitialized: false,
    resave: true
}));
exports.app.use(passport_1.default.initialize());
exports.app.use(passport_1.default.session());
function loggedInErr(req, res, next) {
    if (req.user) {
        res.status(200).json({
            success: true
        });
        next();
    }
    else {
        res.status(401).json({ "error": "User not logged in", success: false });
        return;
    }
}
exports.loggedInErr = loggedInErr;
const gturl = String(process.env.GROUNDTRUTHURL || "login.hack.gt");
const groundTruthStrategy = new strategies_1.GroundTruthStrategy(gturl);
passport_1.default.use(groundTruthStrategy);
passport_1.default.serializeUser((user, done) => {
    done(null, user.uuid);
});
passport_1.default.deserializeUser((id, done) => {
    schema_1.User.findOne({ uuid: id }, (err, user) => {
        done(err, user);
    });
});
let getUser = function (args) {
    return __awaiter(this, void 0, void 0, function* () {
        let users;
        if (args.name == "" || args.name == null) {
            users = yield schema_1.User.find({});
        }
        else {
            users = yield schema_1.User.find({ name: { $regex: '.*' + args.name + '.*', $options: 'i' } });
        }
        if (!users) {
            return null;
        }
        users.sort(function (a, b) { return a.name.toLowerCase().indexOf(args.name.toLowerCase()) - b.name.toLowerCase().indexOf(args.name.toLowerCase()); });
        return users;
    });
};
let updateUser = function (args) {
    return __awaiter(this, void 0, void 0, function* () {
        return schema_1.User.findOneAndUpdate({ 'uuid': args.uuid }, { "$set": args }, { new: true });
    });
};
let getUserProfile = function (args) {
    return __awaiter(this, void 0, void 0, function* () {
        return schema_1.User.findOne({ uuid: args.uuid });
    });
};
let toggleVisibility = function (args) {
    return __awaiter(this, void 0, void 0, function* () {
        return schema_1.User.findOneAndUpdate({ 'uuid': args.uuid }, { "$bit": { visible: { xor: 1 } } }, { new: true });
    });
};
let apiRouter = express_1.default.Router();
const root = {
    user: getUser,
    update_user: updateUser,
    user_profile: getUserProfile,
    toggle_visibility: toggleVisibility
};
apiRouter.use("/user", user_1.userRoutes);
exports.app.use("/api", apiRouter);
exports.app.use('/graphql', express_graphql_1.default({
    schema: graphql_1.buildSchema(typeDefs),
    rootValue: root,
    graphiql: true
}));
exports.app.use(express_1.default.static(path_1.default.join(__dirname, "../../client/build")));
exports.app.get("*", (request, response) => {
    response.sendFile(path_1.default.join(__dirname, "../../client/build", "index.html"));
});
exports.app.listen(PORT, () => {
    console.log(`Team Formation system v${VERSION_NUMBER} started on port ${PORT}`);
});
