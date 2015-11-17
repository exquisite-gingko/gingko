var Sequelize = require("sequelize");

//Unsure if we need password, come back to this

var db = new Sequelize("tablesurfer", "admin", "admin", {
  dialect: "postgres", // or 'sqlite', mysql', 'mariadb'
  port: 5432 //(for postgres)
});

var Users = db.define("Users", {
  //here we will have to figure out the data from facebook on authentication
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  facebookId: {
    type: Sequelize.STRING,
    allowNull: true
  }
  
});

var Meals = db.define("Meals", {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  date: {
    type: Sequelize.STRING,
    allowNull: false
  },
  time: {
    type: Sequelize.STRING,
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
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false
  },
  contact: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lat: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  lng: {
    type: Sequelize.FLOAT,
    allowNull: false
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
