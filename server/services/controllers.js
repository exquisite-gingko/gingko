var database = require('./db');

module.exports = {
  users: {
    get: function (req, res) {
      // database.Users.findAll().then(function (users) {

      // })
    },
    post: function (req, res) {
      database.Users.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName
      }).then(function (user) {
        res.sendStatus(201);
      })
    }
  },
  meals: {
    get: function (req, res) {

    },
    post: function (req, res) {
      database.Users.findOrCreate({where: {firstName: req.body.firstName, lastName: req.body.lastName}})
        .then(function (user) {
          database.Meals.create({
            
          })
        })
    }
  },
  restaurants: {},
  genre: {}
}
