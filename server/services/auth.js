var authKeys = require('./authKeys');


if(process.env.facebookAuth) {
  module.exports.facebookAuth = process.env.facebookAuth;
  module.exports.oauth = process.env.oauth;
  module.exports.yelp = process.env.yelp;
} else {
  module.exports = authKeys;
};
