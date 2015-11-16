var moment = require('moment');

module.exports = {

  restaurantData : function (returnFromDb) {
    var date = returnFromDb.meal.date;
    var time = returnFromDb.meal.date;

    this.title = returnFromDb.meal.title;
    this.host = returnFromDb.meal.User.firstName + ' ' + returnFromDb.meal.User.lastName;
    this.date = moment(date).format('LL');
    this.time = moment(time).format('h:mm:ss a');
    this.description = returnFromDb.meal.description;
    this.address = returnFromDb.meal.Restaurant.address;

  }
  
};
