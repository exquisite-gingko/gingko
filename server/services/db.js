var Sequelize = require("sequelize");

//Unsure if we need password, come back to this



var db = new Sequelize("TableSurf", "root", "", {
  dialect: "postgres", // or 'sqlite', mysql', 'mariadb'
  // port:    3306, // or 5432 (for postgres)
});

db.authenticate().complete(function(err) {
  if (!!err) {
    console.log('Unable to connect to the database:', err)
  } else {
    console.log('Connection has been established successfully.')
  }
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
  },
  photo: {
    //lookup datatype for sequelize
  }
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
  attendees: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
});
//create user foreign key for meal
Users.belongsTo(Meals);

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
Restaurants.belongsTo(Meals);

var Genre = db.define("Genre", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

Genre.belongsTo(Meals);

exports.Meals = Meals;
