// TODO: 
// create a file in this folder called auth.js
// copy the content of this file into auth.js
// replace relevant codes with our fb and yelp keys

module.exports = {
  'facebookAuth': {
    'clientID': 'OUR_CLIENT_ID',
    'clientSecret': 'OUR_CLIENT_SECRET',
    'callbackURL': 'http://localhost:3000/auth/facebook/callback'
  }
};