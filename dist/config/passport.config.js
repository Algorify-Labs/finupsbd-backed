"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
// Configure Google OAuth strategy
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: '111706942312-nskqgcqi5nqggkn5j4ttn62dq6erfmal.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:5000/api/v1/auth/google/callback', // Adjust to your URL
}, function (accessToken, refreshToken, profile, done) {
    // You can store the profile info in the database or session
    // In this case, we pass the profile directly
    console.log(profile);
    return done(null, profile);
}));
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((user, done) => {
    done(null, user);
});
