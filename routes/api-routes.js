// *********************************************************************************************
// api-routes.js - this file offers a set of routes for sending CRUD to Sequelize models folder
// *********************************************************************************************

// Dependencies
// ===========================================================================

var db = require("../models");

module.exports = function(app) {
  
  // Find all posts and return them to the user with res.json (limit results to 10 each page and order by the latest post)
  app.get("/api/posts", function(req, res) {
    db.Recommendation.findAll({
    order: [
      ['createdAt', 'DESC']
    ]
    }).then(function(dbRecommendation) {
      res.json(dbRecommendation);
    });
  });

    // Find ALL post with the category in req.params.category and return them to the user with res.json (limit results to 10 each page and order by the latest post)

  app.get("/api/posts/:category", function(req, res) {
    db.Recommendation.findAll({
      where: {
        category: req.params.category,
      }, 
      order: [
        ['createdAt', 'DESC']
      ]
    }).then(function(dbRecommendation) {
      res.json(dbRecommendation);
    });
  });


  // Route for creating new post
  app.post("/api/posts", function(req, res) {
    console.log(req.body);
    db.Recommendation.create({
      author: req.body.author,
      category: req.body.category,
      title: req.body.title,
      post: req.body.post,
      image_url: req.body.image_url
    })
      .then(function(dbRecommendation) {
        res.json(dbRecommendation);
      });
  });

  // Route for updating content in existing post by id
  app.put("/api/posts", function(req, res) {
    console.log(req.body);
    db.Recommendation.update({
      where:{
        id:req.params.id,
      }     
     }) .then(function(dbRecommendation) {
      res.json(dbRecommendation);
    });
  });

  // Delete existing post by id
  app.delete("/api/posts/:id", function(req, res) {
    db.Recommendation.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbRecommendation) {
      res.json(dbRecommendation);
    });
  });
};
