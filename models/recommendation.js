// Dependencies
// =============================================================

// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references my connection to the DB.
var sequelize = require("../config/connection.js");

// Creates a "Recommendation" model that matches up with DB
var Recommendation = sequelize.define("recommendation", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  author: {
    type: Sequelize.STRING
  },
  category: {
    type: Sequelize.ENUM('books', 'movies', 'shows', 'songs', 'restaurants'),
  },
  title: {
    type: Sequelize.STRING
  },
  post: {
    type: Sequelize.TEXT
  },
  image_url: {
    type: Sequelize.STRING
  }
});