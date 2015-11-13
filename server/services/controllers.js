var database = require('./db');

module.exports = {
  user: {
    get: function (req, res) {
      database.Users.findAll().then(function (users) {
        res.json(users);
      });
    },

    post: function (req, res) {
      database.Users.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName
      }).then(function (message) {
        console.log(message);
        res.sendStatus(201);
      });
    },
    
    //for a user joining a meal
    joinMeal: function(data) {
      console.log('in join meal', data);
      return database.Users.find({ where: {firstName: data.firstName, lastName: data.lastName} })
      .then(function(user) {
        //this should get the user data that matched the user details passed
        var user_id = user.id;
        return database.Meals.find({ where: {description: data.description} })
        .then(function(meal) {
          //meal should be an object containing the table input for this meal
          var meal_id = meal.id;
          console.log('data being made');
          return database.Atendees.create({
            user_id: user_id,
            meal_id: meal_id
          })
          .then(function(attendee) {
            console.log('data added')
            return attendee;
          });
        });
      });
    }

  },

  meals: {

    get: function (req, res) {
      database.Meals.findAll({include: [database.Users, database.Restaurants]})
        .then(function (meals) {
          res.json(meals);
        })
    },
    post: function (req, res) {
      database.Users.findOrCreate({where: {firstName: req.body.firstName, lastName: req.body.lastName}})
        .then(function (user) {
          database.Restaurants.findOrCreate({where: {name: req.body.restaurant}})
            .then(function (restaurant) {
              database.Meals.create({
                date: req.body.date,
                time: req.body.time,
                description: req.body.description,
                //user.id and restaurant.id are not working as they are expected to--what is up with sequelize?
                UserId: user[0].dataValues.id,
                RestaurantId: restaurant[0].dataValues.id
              }).then(function (message) {
                res.sendStatus(201);
              });
            })
        });
    }
  },
  restaurants: {},
  genre: {}
};
