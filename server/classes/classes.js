//this is where we construct our 'packets' of data to send to our query functions
//type check and formatting here

module.exports = {

  Meal : function(body) {
    //this is just trying an object constructor that only allows certain data and will throw an error if the data is not in this style. With more time to be implemented across the board.

    var obj = {};
    //dates and times to be formatted using moment.js checker thing
    obj.title = body.title;
    obj.date = body.date;
    obj.time = body.time;

    if (typeof body.description === "string") {
      obj.description = body.description;
    } else {
      return false;
    }

    obj.restaurant = body.restaurant.name;
    obj.address = body.restaurant.display_address;
    obj.contact = body.restaurant.phone;
    obj.latitude = body.restaurant.coordinate.lat;
    obj.longitude = body.restaurant.coordinate.lng;
    
    if (typeof body.username === "string" && body.username.length > 0) {
      obj.username = body.username;
    } else {
      return false;
    }

    // if (typeof body.lastName === "string" && body.firstName.length >0) {
    //   obj.lastName = body.lastName;
    // } else {
    //   return false;
    // }



    return obj;
  },

  Join : function(body) {
    this.firstName = body.firstName;
    this.lastName = body.lastName;
    this.description = body.description;
  },

  AddUser: function(body) {
    this.firstName = body.firstName;
    this.lastName = body.lastName;
    this.facebookId = body.facebookId;
  }
  
};
