var FacebookStrategy = require('passport-facebook').Strategy;

var configAuth = require('./auth.js');
var database = require('./db.js');

module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function (id, done) {
    database.Users.find({ where: {id: id} })
      .then(function(user) {
        done(err, user);
      });
  });
  passport.use(new FacebookStrategy({
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL
  }));
};