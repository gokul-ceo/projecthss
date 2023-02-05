import * as dotenv from 'dotenv';
dotenv.config()
import { Strategy as GoogleStrategy} from "passport-google-oauth2";
import passport from "passport";
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const authUser = (request, accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }
  passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/auth/google/callback",
    passReqToCallback   : true
  }, authUser));
  
  
  passport.serializeUser( (user, done) => { 
    // console.log(`\n--------> Serialize User:`)
    // console.log(user)
     // The USER object is the "authenticated user" from the done() in authUser function.
     // serializeUser() will attach this user to "req.session.passport.user.{user}", so that it is tied to the session object for each session.  
  
    done(null, user)
  } );
  passport.deserializeUser((user, done) => {
    // console.log("\n--------- Deserialized User:")
    // console.log(user)
    // This is the {user} that was saved in req.session.passport.user.{user} in the serializationUser()
    // deserializeUser will attach this {user} to the "req.user.{user}", so that it can be used anywhere in the App.
  
    done (null, user)
  }) ;