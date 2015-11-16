if(process.env['facebookAuth.callbackURL'] !== undefined) {
  console.log('running on heroku setup');
  console.log(process.env['facebookAuth.callbackURL']);
  module.exports = {
    facebookAuth: {
      callbackURL: process.env['facebookAuth.callbackURL'],
      clientID: process.env['facebookAuth.clientID'],
      clientSecret: process.env['facebookAuth.clientSecret']
    },
    oauth: {
      consumer_key: process.env['oauth.consumer_key'],
      token: process.env['oauth.token']
    },
    yelp: {
      consumerSecret: process.env['yelp.consumerSecret'],
      tokenSecret: process.env['yelp.tokenSecret']
    }
  };
} else {
  module.exports = require('./authKeys');
};
