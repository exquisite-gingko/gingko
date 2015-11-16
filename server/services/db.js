var Sequelize = require("sequelize");

//Unsure if we need password, come back to this

var db = new Sequelize("tablesurfer", "admin", "admin", {
  dialect: "postgres", // or 'sqlite', mysql', 'mariadb'
  port: 5432 //(for postgres)
});

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
  // facebookId: {
  //   type: Sequelize.STRING,
  //   allowNull: true //this may not be with every user
  // }
});

var Meals = db.define("Meals", {
  //title field
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
    allowNull: true
  },
  address: {
    type: Sequelize.STRING,
    allowNull: true
  },
  contact: {
    type: Sequelize.STRING,
    allowNull: true
  }
  //latitude
  //longitude
  //rating?
});

//this creates restaurant foreign key for meal
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



db.sync();

exports.Meals = Meals;
exports.Users = Users;
exports.Restaurants = Restaurants;
exports.Attendees = Attendees;
