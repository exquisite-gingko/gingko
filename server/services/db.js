var Sequelize = require("sequelize");

//Unsure if we need password, come back to this



var db = new Sequelize("tablesurfer", "admin", "admin", {
  dialect: "postgres", // or 'sqlite', mysql', 'mariadb'
  port: 5432 //(for postgres)
});

// .authenticate().complete(function(err) {
//   if (!!err) {
//     console.log('Unable to connect to the database:', err)
//   } else {
//     console.log('Connection has been established successfully.')
//   }
// });

var Users = db.define("Users", {
  //here we will have to figure out the data from facebook on authentication
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  }
  // photo: {
  //   //lookup datatype for sequelize
  // }
});

var Meals = db.define("Meals", {
  date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  time: {
    //.date is used for timestamp
    type: Sequelize.DATE,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
});
//create Users Users foreign key for meal
Users.hasOne(Meals);
Meals.belongsTo(Users);


var Restaurants = db.define("Restaurants", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  contact: {
    type: Sequelize.STRING,
    allowNull: false
  }
  //Do we want to add a city foreign key or zip code?
});

//create restaurant foreign key for meal
Restaurants.hasOne(Meals);
Meals.belongsTo(Restaurants);

var Genres = db.define("Genres", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

Genres.hasOne(Restaurants);
Restaurants.belongsTo(Genres);

var Attendees = db.define("Attendees", {

});

Users.belongsToMany(Meals, {through: 'Attendees'});
Meals.belongsToMany(Users, {through: 'Attendees'});




// Users.drop({force: true});
// Meals.drop({force: true});
// Restaurants.drop({force: true});
// Genres.drop({force: true});
//Attendees.drop({force: true});

db.sync({force: true});

exports.Meals = Meals;
exports.Users = Users;
