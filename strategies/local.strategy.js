const passport = require("passport");
const LocalStrategy = require("passport-local");
const userService = require("../users/users.service")
const {compareSync} = require("bcrypt");

passport.use(new LocalStrategy(
    function (username, password, done){
        userService.strategyHelper({name : username}, function (err,user){
            if(err) return done(err)
            if(!user) {
                const err = new Error("Not found")
                err.status = 404;
                return done(err);
            }
            if(!compareSync(password, user.password)) {
                const err = new Error("Not matching")
                err.status = 403;
                return done(err);
            }
            return done(null, user)
        })
    }
))