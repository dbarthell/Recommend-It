// *********************************************************************************************
// api-routes.js - this file offers a set of routes for sending CRUD to Sequelize models folder
// *********************************************************************************************

// Dependencies
// ===========================================================================

var db = require("../models");

module.exports = function(app) {
  // Find all posts and return them to the user with res.json
  app.get("/api/posts", function(req, res) {
    db.Post.findAll({}).then(function(dbPost) {
      res.json(dbPost);
    });
  });

    // Find ALL post with the category in req.params.id and return them to the user with res.json

  app.get("/api/post/:category", function(req, res) {
    db.Author.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbAuthor) {
      res.json(dbAuthor);
    });
  });

  app.post("/api/posts", function(req, res) {
    console.log(req.body);
    db.Recommendation.create({
      //TODO: create database object
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  app.post("/api/authors", function(req, res) {
    console.log(req.body);
    db.Author.create(req.body).then(function(dbAuthor) {
      res.json(dbAuthor);
    });
  });

  app.delete("/api/authors/:id", function(req, res) {
    // Delete the Author with the id available to us in req.params.id
    db.Author.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbAuthor) {
      res.json(dbAuthor);
    });
  });

};
