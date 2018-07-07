$(document).ready(function() {
  /* global moment */
  // Initialize AOS
  AOS.init();

  // postContainer holds all of our posts
  var postContainer = $(".card-columns");
  var postCategorySelect = $("#category");
  // Click events for the edit and delete buttons
  $(document).on("click", ".btn-danger", handlePostDelete);
  $(document).on("click", ".btn-primary", handlePostEdit);
  postCategorySelect.on("change", handleCategoryChange);
  var posts;
  var comments;
  // =================
  //KB: Click events for the comments button
  $(document).on("click", ".comment-btn", function() {
    $(".comments").toggleClass("hidden");
  });

  $(document).on("click", ".anchor-modal", function() {
    postContainer.removeAttr("data-aos");
    var postID = $(this).data("post-id");
    console.log("Post Id: " + postID);
    postContainer.removeAttr("data-aos");
    getComments(postID);
  });

  // Change events for the category menu to get all posts based on category
  $("#category").change(function() {
    event.preventDefault();
    var category = $(this)
      .find("option:selected")
      .text();
    if (category === "All Categories") {
      getPosts();
    } else {
      getPosts(category);
    }
  });

  // On click of small text categories, get all posts of that category
  $(document).on("click", ".text-muted", function() {
    var category = $(this).text();
    if (category === "All Categories") {
      getPosts();
    } else {
      getPosts(category);
    }
  });

  // This function grabs posts from the database and updates the view
  function getPosts(category) {
    var categoryString = category || "";
    $.get("/api/posts/" + categoryString, function(data) {
      console.log("Posts", data);
      posts = data;
      if (!posts || !posts.length) {
        displayEmpty();
      } else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete posts
  function deletePost(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/posts/" + id
    }).then(function() {
      getPosts();
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
    var newPostCard = $("<div>");
    newPostCard.addClass("post-container card");
    newPostCard.attr("data-aos", "zoom-in");
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
    //============
    //KB: Adding in Bootstrap 4 modals dynamically. post.comments does not exist yet. Once Joe and Nerita get the comments model up and running we can add it in.
    //KB: This syntax isn't as secure as the syntax above for adding elements dynamically. I only added it in this way in order to show visually all the components that might be necessary for the bootstrap modal feature.
    //
    var newModalButton = `<a href="#" class="anchor-modal" data-toggle="modal" data-target="#post-modal-${
      post.id
    }" data-post-id="${post.id}">
    See more...
  </a>`;
    var newModal = `<div class="modal fade" id="post-modal-${
      post.id
    }" tabindex="-1" role="dialog" aria-labelledby="post-modal-label-${
      post.id
    }" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="post-modal-label-${post.id}">${
      post.title
    } vouched for by ${post.author}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
        <img class="card-img img-fluid" src=${post.image_url}>
        <br><br>
        <div class="post">${post.post}</div>
        <br>
        <br>      
        <button type="button" class="btn btn-success comment-btn">Add Comment</button>
         <div class="comments hidden">
         <form class="form-container add-comment" data-post-id="${post.id}">
         <div class="form-group">
      <label for="author"><br>User:</label>
      <input type="text" class="form-control author comment-author">
      <label for="body">Comment:</label>
       <textarea class="form-control body comment-body" rows="2"></textarea>
       <button type="submit" class="btn submit-comment">Submit Comment</button>
      </div>
      </form>
      </div>
      <br><br>
         <div class="all-comments"> 
          
        </div>
         </div>
      </div>
    </div>
  </div>`;
    //============
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
    newPostCardText.append(newModal);
    newPostCardText.append(newModalButton);
    newPostCardBody.append(newPostCardText);
    newPostCardBody.append(newPostCardSmallText);
    newPostCardBody.append(editBtn);
    newPostCardBody.append(deleteBtn);
    newPostCard.append(newPostCardBody);
    newPostCard.data("post", post);

    //remove aos animation to unblock comment modal
    $(document).on("click", ".anchor-modal", function() {
      newPostCard.removeAttr("data-aos");
    });
    return newPostCard;
  }

  // This function figures out which post we want to delete and then calls
  // deletePost
  function handlePostDelete() {
    var currentPost = $(this)
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
      .data("post");
    console.log(currentPost);
    window.location.href = "/newpost?post_id=" + currentPost.id;
  }

  // This function displays a message when there are no posts
  function displayEmpty() {
    postContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html("Create <a href='/newpost'>new</a> category!");
    postContainer.append(messageH2);
  }

  // This function handles reloading new posts when the category changes
  function handleCategoryChange() {
    var newPostCategory = $(this).val();
    getPosts(newPostCategory);
  }
});

//Post comment functions
//============================
// This function grabs comments from the database and updates the modals for each card
function getComments(id) {
  $.get("/api/comment/" + id, function(data) {
    console.log("Comments", data);
    comments = data;
    if (!comments || !comments.length) {
      console.log("no comments yet");
    } else {
      console.log(comments);
      addCommentRow(id, comments);
    }
  });

  var addComment = $(".add-comment");

  // Adding an event listener for when the form is submitted
  $(addComment).on("submit", function(event) {
    event.preventDefault();
    var commentAuthor = $(this).find(".comment-author");
    var commentBody = $(this).find(".comment-body");
    var postID = $(this).data("post-id");
    // Won't submit the comment if we are missing a body or an author
    if (!commentAuthor.val().trim() || !commentBody.val().trim()) {
      return;
    }
    // Constructing a newComment object to hand to the database
    var newComment = {
      author: commentAuthor.val(),
      body: commentBody.val(),
      postId: postID
    };
    commentAuthor.empty();
    commentBody.empty();
    console.log(newComment);
    // Submits a new comment

    $.post("/api/comment/" + postID, newComment);
   
    commentAuthor.val("");
    commentBody.val("");
    getComments(postID);
  });
}
function addCommentRow(id,comments){
  var commentContainer = $("#post-modal-" + id).find(".all-comments");
  commentContainer.empty();
  var newCommentRow;
  for (i = 0; i < comments.length; i++) {
    newCommentRow = $("<div>");
    newCommentRow.addClass("each-comment");
    newCommentRow.html(comments[i].author + ": " + comments[i].body);
    commentContainer.append(newCommentRow);
  }
}

