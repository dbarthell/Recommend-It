$(document).ready(function () {
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

  // =================
  //KB: Click events for the comments button
  $(document).on("click", ".btn-success", function () {
    $(".comments").toggleClass("hidden");
  });

  // Change events for the category menu to get all posts based on category
  $("#category").change(function () {
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
  $(document).on("click", ".text-muted", function () {
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
    $.get("/api/posts/" + categoryString, function (data) {
      console.log("Posts", data);
      posts = data;
      ``;
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
    }).then(function () {
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
    //KB: This sntax isn't as secure as the syntax above for adding elements dynamically. I only added it in this way in order to show visually all the components that might be necessary for the bootstrap modal feature. 

    var newModalButton = `<a href="#" class="anchor-modal" data-toggle="modal" data-target="#exampleModal">
    See more...
  </a>`;
    var newModal = `<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">${
      post.title
      } vouched for by ${post.author}
    </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
        <img class="card-img img-fluid" src=${post.image_url}>
        <br><br>
        <div class="post">
     ${post.post}
        </div>
        <br>
        <br>      
   <button type="button" class="btn btn-success">Add Comment</button>
         <div class="comments hidden">

      <label for="author"><br>User:</label>
      <input type="text" class="form-control author" id="author">
      <label for="body">Comment:</label>
       <textarea class="form-control body" id="body" rows="2"></textarea>
       <button type="submit" class="btn submit">Submit Comment</button>
      </div>
      <br><br>
         <div class="all-comments"> 
         This is where post.comments can generate at some point. Maybe as table rows?
         <br><br> Lorizzle ipsizzle dolizzle gangster yo, the bizzle adipiscing stuff. Gizzle sapien velit, for sure volutpizzle, suscipizzle shizznit, gravida vizzle, arcu. Pellentesque boofron shizzle my nizzle crocodizzle. Sizzle erizzle. Yippiyo izzle dolor dapibizzle stuff tempizzle gangster. Mauris pellentesque nibh izzle turpis. Gangsta izzle fo shizzle my nizzle. Pellentesque eleifend rhoncizzle . In hizzle habitasse platea dictumst. Donec dapibizzle. Curabitizzle fo shizzle urna, pretizzle eu, izzle ac, eleifend nizzle, nunc. Break yo neck, yall da bomb. Integer sempizzle i saw beyonces tizzles and my pizzle went crizzle sed we gonna chung.

         Praesent my shizz turpizzle mah nizzle uhuh ... yih! break yo neck, yall molestie. Crackalackin fizzle black vizzle bling bling. Nizzle fizzle ornare pimpin'. Morbi crunk, nisl nizzle bibendizzle bizzle, magna dolor vestibulizzle its fo rizzle, sheezy auctizzle justo mammasay mammasa mamma oo sa cool augue. Sheezy id elizzle da bomb amizzle erizzle adipiscing mofo. Vivamizzle tempor pede ut yo mamma. In rhoncus leo. Things ipsum dolizzle sizzle bling bling, get down get down adipiscing that's the shizzle. Gangster nisi ligula, daahng dawg dizzle check it out, facilisis sizzle, tellivizzle mattizzle, dope. Curabitizzle semper faucibus dope. Ut nizzle fo shizzle. Nunc you son of a bizzle mofo phat diam accumsizzle egestizzle. Quisque gangsta metizzle pimpin' nunc. Fizzle own yo', izzle quizzle varizzle lacinia, that's the shizzle dizzle commodo felis, nizzle ullamcorper eros nisl shit nisi. Ma nizzle leo quam, own yo' sizzle amet, ornare vitae, pulvinar pulvinizzle, mah nizzle.
         
         Sure away mofo in fizzle hizzle consequat. In convallis, arcu izzle check out this posuere, nulla lorizzle crackalackin crazy, a blandit owned go to hizzle sizzle i'm in the shizzle. Gangster izzle diam yippiyo black varizzle sizzle. Curabitizzle dang nisi, pot izzle, porta eleifend, tincidunt izzle, metus. Nunc uhuh ... yih! neque. Shizznit ipsizzle dolizzle sizzle amet, consectetizzle adipiscing elit. Maecenas its fo rizzle crazy. In congue. Vestibulum izzle erizzle check out this velit aliquet dictum. Pizzle facilisizzle we gonna chung fizzle amizzle nibh. Crizzle commodo. Crazy eu ante izzle pimpin' lacinia sagittis. Aenean non massa shut the shizzle up urna break it down lobortis. Suspendisse enizzle est, break it down pulvinar, ornare brizzle, doggy bizzle, bling bling. Crazy egizzle dizzle at tellivizzle adipiscing tempor. Curabitizzle et sheezy quizzle tellizzle get down get down nonummy.
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
    newPostCard.attr("data-aos", "zoom-in");
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
    messageH2.html(
      "Create <a href='/newpost'>new</a> category!"
    );
    postContainer.append(messageH2);
  }

  // This function handles reloading new posts when the category changes
  function handleCategoryChange() {
    var newPostCategory = $(this).val();
    getPosts(newPostCategory);
  }
});
