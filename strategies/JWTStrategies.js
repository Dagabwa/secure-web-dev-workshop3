const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const userservice = require('../users/users.service')

passport.use(new Strategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        },
        function(token, done) {
            userservice.strat({_id: token.sub}, function(err, user){
                if (err)    return done(err, false);
                if (user)   return done(null, user);
                return done(null, false);
            });
        }
    )
);