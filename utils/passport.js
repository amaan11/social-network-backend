import passport from "passport";
import passportJWT from "passport-jwt";
import secret from "./config";

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret
    },
    function(jwtPayload, cb) {
      console.log("jwtpayload");
      //   return UserModel.findOneById(jwtPayload.id)
      //     .then(user => {
      //       return cb(null, user);
      //     })
      //     .catch(err => {
      //       return cb(err);
      //     });
    }
  )
);
