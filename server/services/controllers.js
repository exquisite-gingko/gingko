var database = require('./db');
var Promise = require('bluebird');
var objectify = require('./../classes/controllerClasses');

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

    // TODO: Perhaps rename to getAll?
    get: function (data) {
      return database.Meals.findAll({ include: [database.Users, database.Restaurants]})
        .then(function (meals) {
          //use the bluebird promise functions
          return Promise.map(meals, function(meal) {
            return meal.getUsers().then(function(result) {
              var mealObj = {meal: meal, attendees: result};
              return mealObj;
            });
          });
        }).then(function(meals) {
          //make an object to send back
          var obj = {};
          meals.map(function(meal, i) {
            obj[i] = new objectify.restaurantData(meal);
          });
          return obj;
        });
    },

    getOne: function (data) {
      // data being passed in is the meal's ID number that should be retrieved
      console.log('getOne should be finding this one: ', data);
      database.Meals.findById(data)
        .then(function (meal) {
          console.log('***********', meal);
          return meal;
          // return Promise.map(meal, function(meal) {
          //   return meal.getUsers().then(function(result) {
          //     var mealObj = {meal: meal, attendees: result};
          //     return mealObj;
          //   });
          // });
        })
        .then(function(meal) {
          res.json(meal);
        })
        // .then(function(meal) {
        //   if (meal === null) {
        //     res.sendStatus(404);
        //   }
        //   // res.json(meals)
        // })
    },

    post: function (data) {
      return database.Users.findOrCreate({where: {firstName: data.firstName, lastName: data.lastName}})
        .then(function (user) {
          return database.Restaurants.findOrCreate({where: {name: data.restaurant}, defaults:  {name: data.restaurant, address: data.address, contact: data.contact}})
            .then(function (restaurant) {
              return database.Meals.create({
                title: data.title,
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
