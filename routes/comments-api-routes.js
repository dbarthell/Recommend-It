// *********************************************************************************************

// Dependencies
// ===========================================================================

var db = require("../models");

module.exports = function (app) {

  // Find all comments and return them to the user with res.json 
  app.get("/api/comment/:postId", function (req, res) {
    db.Comment.findAll({
      where:{
        postId:req.params.postId
      },
      order: [
        ['createdAt', 'DESC']
      ],
      include:[{model:db.Recommendation, as:'Recommendation'}]
    }).then(function (dbComment) {
      res.json(dbComment);
    });
  });

  // Route for creating new comment
  app.post("/api/comment/:postId", function (req, res) {
    console.log(req.body);
    
    db.Comment.create({
      postId:req.params.postId,
      author: req.body.author,
      body: req.body.body
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