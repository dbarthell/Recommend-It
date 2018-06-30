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
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    post: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    image_url: {
      type: DataTypes.STRING,
      isUrl: true
    },
    createdAt: {
      type: DataTypes.DATE(3),
      // defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)'),
      defaultValue: DataTypes.NOW(),
  },
    updatedAt: {
      type: DataTypes.DATE(3),
      defaultValue: DataTypes.NOW(),
    }
  });
  return Recommendation;
};