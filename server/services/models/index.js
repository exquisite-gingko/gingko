if (!global.hasOwnProperty('db')) {
  var Sequelize = require('sequelize')
    , sequelize = null


  //figure out database color--
  if (process.env.DATABASE_URL) {
    // the application is executed on Heroku ... use the postgres database
    sequelize = new Sequelize(process.env.DATABASE_URL, {
      dialect:  'postgres',
      protocol: 'postgres',
      logging:  true //false
    })
  } else {
    // the application is executed on the local machine ... use mysql
    sequelize = new Sequelize("tablesurfer", "admin", "admin", {
      dialect: "postgres", // or 'sqlite', mysql', 'mariadb'
      port: 5432 //(for postgres)
    });
  }


  var Users = sequelize.define("Users", {
  //here we will have to figure out the data from facebook on authentication
    username: {
      type: Sequelize.STRING,
      allowNull: false
    }

    //TO ADD:
    // facebookId: {
    //   type: Sequelize.STRING,
    //   allowNull: false
    // }
    
  });

  var Meals = sequelize.define("Meals", {
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


  var Restaurants = sequelize.define("Restaurants", {
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

  var Genres = sequelize.define("Genres", {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

  Genres.hasOne(Restaurants);
  Restaurants.belongsTo(Genres);

  var Attendees = sequelize.define("Attendees", {
  });

  Users.belongsToMany(Meals, {through: 'Attendees'});
  Meals.belongsToMany(Users, {through: 'Attendees'});



  sequelize.sync({force: true});

  /*
    Associations can be defined here. E.g. like this:
    global.sequelize.User.hasMany(global.sequelize.SomethingElse)
  */
  global.db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    Users: Users,
    Meals: Meals,
    Restaurants: Restaurants,
    Attendees: Attendees

    // add your other models here
  }
}

module.exports = global.db