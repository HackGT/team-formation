"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
exports.mongoose = mongoose_1.default;
dotenv_1.default.config();
const MONGO_URL = String(process.env.MONGO_URL);
mongoose_1.default.connect(MONGO_URL, {
    useMongoClient: false
}).catch(err => {
    throw err;
});
function createNew(model, doc) {
    return new model(doc);
}
exports.createNew = createNew;
exports.Team = mongoose_1.default.model("Team", new mongoose_1.default.Schema({
    creator: {
        required: true,
        type: String
    },
    name: {
        required: true,
        type: String,
        unique: true
    },
    picture: String,
    members: {
        required: true,
        type: [String],
        unique: true
    },
    interests: [String],
    description: String
}, {
    usePushEach: true
}));
exports.User = mongoose_1.default.model("User", new mongoose_1.default.Schema({
    uuid: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: false
    },
    school: {
        type: String,
        required: false
    },
    token: String,
    grad_year: String,
    skills: [String],
    beginner: {
        type: Boolean,
        required: false
    },
    experience: String,
    image: String,
    auth_keys: [String],
    admin: Boolean,
    contact: String,
    contact_method: String,
    visible: Number
}, {
    usePushEach: true
}));
