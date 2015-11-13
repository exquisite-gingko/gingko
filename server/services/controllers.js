var database = require('./db');

module.exports = {
  user: {
    get: function (req, res) {
      database.User.findAll().then(function (users) {
        res.json(users);
      });
    },
    post: function (req, res) {
      database.User.create({
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
      database.Meals.findAll({include: [database.User]}).then(function (meals) {
        res.json(meals);
      });
    },

    //---------------------------refactored this moring---------------------------------------------//
    post: function (data) {
      return database.User.find({where: {firstName: data.firstName, lastName: data.lastName}})
        .then(function (user) {
          return database.Meals.create({
            date: data.date,
            time: data.time,
            description: data.description,
            userId: user.id
          }).then(function (message) {
            //CHECK MESSAGE FORMAT
            return message;
          });

        });
      
    }
  },
  restaurants: {},
  genre: {}
};
