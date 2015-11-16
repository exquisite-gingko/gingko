var database = require('./db');
var Promise = require('bluebird');

module.exports = {
  user: {

    get: function () {
      return database.Users.findAll()
      .then(function (users) {
        return users;
      });
    },

    post: function (data) {
      return database.Users.create({
        firstName: data.firstName,
        lastName: data.lastName,
        facebookId: data.facebookId
      }).then(function (message) {
        return message;
      });
    },
    
    //for a user joining a meal
    joinMeal: function(data) {
      return database.Users.find({ where: {firstName: data.firstName, lastName: data.lastName} })
      .then(function(user) {
        //this should get the user data that matched the user details passed
        return database.Meals.find({ where: {description: data.description} })
        .then(function(meal) {
          //meal should be an object containing the table input for this meal
          return database.Attendees.create({
            UserId: user.id,
            MealId: meal.id
          })
          .then(function(attendee) {
            return attendee;
          });
        });
      });
    }

  },

  meals: {

    get: function (data) {
      console.log('getting meals!! in controllers fn--------------')
      return database.Meals.findAll({ include: [database.Users, database.Restaurants]})
        .then(function (meals) {
          //use the bluebird promise functions
          return Promise.map(meals, function(meal) {
            return meal.getUsers().then(function(result) {
              var mealObj = {meal: meal, attendees: result};
              console.log('meal obj', mealObj);
              return mealObj;
            });
          });
        }).then(function(meals) {
          console.log('----------------->>>>>>>>',meal);
          return meals;
        });
    },

    post: function (data) {
      return database.Users.findOrCreate({where: {firstName: data.firstName, lastName: data.lastName}})
        .then(function (user) {
          return database.Restaurants.findOrCreate({where: {name: data.restaurant}, defaults:  {name: data.restaurant, address: data.address, contact: data.contact}})
            .then(function (restaurant) {
              return database.Meals.create({
                date: data.date,
                time: data.time,
                description: data.description,
                UserId: user[0].dataValues.id,
                RestaurantId: restaurant[0].dataValues.id
              }).then(function (message) {
                return message;
              });
            });
        });
    }
  },
  restaurants: {},
  genre: {}
};
