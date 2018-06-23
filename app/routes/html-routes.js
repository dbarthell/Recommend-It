// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  // newpost route loads post.html (page user adds new post)
  app.get("/newpost", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/post.html"));
  });

  // :category (placeholder) route loads index.html ()
  app.get("/:category", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};
