module.exports = function (sequelize, DataTypes) {


  var Recommendation = sequelize.define("Recommendation", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.ENUM('books', 'movies', 'shows', 'songs', 'restaurants'),
      allowNull: false
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    post: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    image_url: {
      type: Sequelize.STRING
    }
  });
  return Recommendation;

};