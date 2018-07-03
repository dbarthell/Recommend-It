// *********************************************************************************************

// Dependencies
// ===========================================================================

var db = require("../models");

module.exports = function (app) {

  // Find all comments and return them to the user with res.json 
  app.get("/api/comment", function (req, res) {
    db.Comment.findAll({
      order: [
        ['createdAt', 'DESC']
      ],
      include:[db.Recommendation]
    }).then(function (dbComment) {
      res.json(dbComment);
    });
  });

  // Route for creating new comment
  app.post("/api/comment", function (req, res) {
    console.log(req.body);
    db.Comment.create({
      author: req.body.author,
      body: req.body.category
    })
      .then(function (dbComment) {
        res.json(dbComment);
      });
  });

  // Delete existing comment by id
  app.delete("/api/comment/:id", function (req, res) {
    db.Comment.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbComment) {
      res.json(dbComment);
    });
  });
}