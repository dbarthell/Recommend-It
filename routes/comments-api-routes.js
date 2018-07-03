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

  // Delete existing comment by post id
  app.delete("/api/comment/:postId", function (req, res) {
    db.Comment.destroy({
      where: {
        postId: req.params.postId
      }
    }).then(function (dbComment) {
      res.json(dbComment);
    });
  });
}