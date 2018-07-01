$(document).ready(function() {
    /* global moment */
    // postContainer holds all of our posts
    var postContainer = $(".row");
    var postCategorySelect = $("#category");
    // Click events for the edit and delete buttons
    $(document).on("click", ".btn-danger", handlePostDelete);
    $(document).on("click", ".btn-primary", handlePostEdit);
    postCategorySelect.on("change", handleCategoryChange);
    var posts;

    // Change events for the category menu to get all posts based on category
    $( "#category" ).change(function() {
      event.preventDefault();
      var category = $(this).find('option:selected').text();
      getPosts(category);
    });
  
    // This function grabs posts from the database and updates the view
    function getPosts(category) {
      var categoryString = category || "";
      $.get("/api/posts/" + categoryString, function(data) {
        console.log("Posts", data);
        posts = data;``
        if (!posts || !posts.length) {
          displayEmpty();
        }
        else {
          initializeRows();
        }
      });
    }
  
    // This function does an API call to delete posts
    function deletePost(id) {
      $.ajax({
        method: "DELETE",
        url: "/api/posts/" + id
      })
        .then(function() {
          getPosts(postCategorySelect.val());
        });
    }
  
    // Getting the initial list of posts
    getPosts();
    // InitializeRows handles appending all of our constructed post HTML inside
    // postContainer
    function initializeRows() {
      postContainer.empty();
      var postsToAdd = [];
      for (var i = 0; i < posts.length; i++) {
        postsToAdd.push(createNewRow(posts[i]));
      }
      postContainer.append(postsToAdd);
    }
  
    // This function constructs a post's HTML. Handlebars would've been easier...
    function createNewRow(post) {
      var newPostCardCol = $("<div>");
      newPostCardCol.addClass("col-xs-12 col-md-4 col-lg-3");
      var newPostCard = $("<div>");
      newPostCard.addClass("post-container");
      var newPostCardImage = $("<img>");
      newPostCardImage.addClass("card-img img-fluid");
      newPostCardImage.attr("src", post.image_url);
      var newPostCardBody = $("<div>");
      newPostCardBody.addClass("card-body");          
      var newPostCardTitle = $("<h5>");
      newPostCardTitle.addClass("card-title");
      newPostCardTitle.text(post.title);
      var newPostCardText = $("<p>");
      newPostCardText.addClass("card-text");
      newPostCardText.text(post.post);
      var newPostCardSmallText = $("<p>");
      newPostCardSmallText.addClass("card-text");
      var newPostCardSmall = $("<small>");
      newPostCardSmall.addClass("text-muted");
      newPostCardSmall.text(post.category);                  
      var editBtn = $("<a>");
      editBtn.text("Edit");
      editBtn.addClass("btn btn-primary");
      editBtn.attr("href", "#");    
      var deleteBtn = $("<a>");
      deleteBtn.text("Delete");
      deleteBtn.addClass("btn btn-danger");
      deleteBtn.attr("href", "#");    

      newPostCard.append(newPostCardImage);
      newPostCardSmallText.append(newPostCardSmall);
      newPostCardBody.append(newPostCardTitle);
      newPostCardBody.append(newPostCardText);
      newPostCardBody.append(newPostCardSmallText);
      newPostCardBody.append(editBtn);
      newPostCardBody.append(deleteBtn);
      newPostCard.append(newPostCardBody);
      newPostCardCol.append(newPostCard);
      newPostCardCol.data("post", post);
      return newPostCardCol;
    }
  
    // This function figures out which post we want to delete and then calls
    // deletePost
    function handlePostDelete() {
      var currentPost = $(this)
        .parent()
        .parent()
        .parent()
        .data("post");
      deletePost(currentPost.id);
    }
  
    // This function figures out which post we want to edit and takes it to the
    // Appropriate url
    function handlePostEdit() {
      var currentPost = $(this)
        .parent()
        .parent()
        .parent()
        .data("post");
      console.log(currentPost);
      window.location.href = "/newpost?post_id=" + currentPost.id;
    }
  
    // This function displays a message when there are no posts
    function displayEmpty() {
      postContainer.empty();
      var messageH2 = $("<h2>");
      messageH2.css({ "text-align": "center", "margin-top": "50px" });
      messageH2.html("Create the first post for this category <a href='/newpost'>here</a> !");
      postContainer.append(messageH2);
    }
  
    // This function handles reloading new posts when the category changes
    function handleCategoryChange() {
      var newPostCategory = $(this).val();
      getPosts(newPostCategory);
    }
  
  });