// TODO: 
// create a file in this folder called auth.js
// copy the content of this file into auth.js
// replace relevant codes with our fb and yelp keys

module.exports = {
  facebookAuth: {
    'clientID': 'OUR_CLIENT_ID',
    'clientSecret': 'OUR_CLIENT_SECRET',
    'callbackURL': 'http://localhost:3000/auth/facebook/callback'
  },
  oauth: {
    consumer_key: 'OUR_OAUTH_CONSUMER_KEY',
    token: 'OUR_OAUTH_TOKEN'
  },
  yelp: {
    consumerSecret: 'OUR_YELP_CONSUMER_SECRET',
    tokenSecret: 'OUR_YELP_TOKEN_SECRET'
  }
};