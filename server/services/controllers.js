var database = require('./db');

module.exports = {
  user: {
    get: function (req, res) {
      database.Users.findAll().then(function (users) {
        res.json(users);
      })
    },
    post: function (req, res) {
      database.Users.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName
      }).then(function (message) {
        console.log(message);
        res.sendStatus(201);
      });
    }
  },
  meals: {
    get: function (req, res) {
      database.Meals.findAll().then(function (meals) {
        res.json(meals);
      })
    },
    post: function (req, res) {
      database.Users.findOrCreate({where: {firstName: req.body.firstName, lastName: req.body.lastName}})
        .then(function (user) {
          database.Meals.create({
            date: req.body.date,
            time: req.body.time,
            attendees: req.body.attendees,
            description: req.body.description,
            userId: user.id
          }).then(function (message) {
            res.sendStatus(201);
          });
        });
    }
  },
  restaurants: {},
  genre: {}  
}
