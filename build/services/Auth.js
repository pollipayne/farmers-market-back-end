"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleAuth = void 0;
var passport_1 = __importDefault(require("passport"));
var GoogleStrategy = require('passport-google-oauth2').Strategy;
var GOOGLE_CLIENT_ID = process.env.CLIENT_ID;
var GOOGLE_CLIENT_SECRET = process.env.CLIENT_SECRET;
var GoogleAuth = /** @class */ (function () {
    function GoogleAuth() {
    }
    GoogleAuth.prototype.auth = function () {
        var GoogleStrategy = require('passport-google-oauth2').Strategy;
        passport_1.default.use(new GoogleStrategy({
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/google/callback",
            passReqToCallback: true
        }));
    };
    return GoogleAuth;
}());
exports.GoogleAuth = GoogleAuth;
var google = new GoogleAuth();
google.auth();
