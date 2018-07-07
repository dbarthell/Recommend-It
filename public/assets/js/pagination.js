// 'use strict';

// // $(document).ready(function(){   

// // Lenght of post on each page
//     var numberofItems = $("#paginate .card-columns").size;
//     var limitPerPage = 9;
//     var Next = "Next";
//     var grandTotal = 0;
//     // var newPost = require("./newPost");
//     // console.log("New Post"+newPost);

//     // Hide any posts after the 9th post
//     $("#paginate .card-columns:gt(" + (limitPerPage - 1) + ")").hide();

//     // set how many pages we need
//     var totalPages = Math.ceil(numberofItems / limitPerPage);
//     console.log("Total pages: "+ totalPages);

//     // Append page 1
//     $(".pagination").append("<li class ='currentPage active' class='page-item'><a class='page-link btn' href='javascript:void(0)' tabindex='0'>" + 1 + "</a></li>");

//     // for loop to insert page numbers starting from page 2
//     for (var i = 2; i <= totalPages; i++) {
//         $(".pagination").append(("<li class ='currentPage' class='page-item'><a class='page-link btn' href='javascript:void(0)' tabindex='0'>" + i + "</a></li>"));
//     };

//     // Append NEXT button after page numbers
//     $(".pagination").append("<li id='next' class='page-item'><a class='page-link btn' href='javascript:void(0)' tabindex='+1'>" + Next + " </a></li>");

//     // Add functionality to each page buttons
//     $(".pagination li.currentPage").on("click", function () {
//         // removing "active state" from buttons when it is not clicked
//         if ($(this).hasClass("active")) {
//             return false;
//         } else {
//             var currentPage = $(this).index();
//             $(".pagination li").removeClass("active");
//             $(this).addClass("active");
//             // Hide posts that are not supposed to be on that page
//             $("#paginate .card-columns").hide();
//             // calculation for how many posts to hide
//             grandTotal = limitPerPage * currentPage;
//             // for loop on how many items to show on the page
//             for (var i = grandTotal - limitPerPage; i < grandTotal; i++) {
//                 $("#paginate .card-columns:eq(" + i + ")").show();
//             }
//         }
//     });

//     // Functionality for NEXT button
//     $("#next").on("click", function () {
//         var current_page = $(".pagination li.active").index();
//         console.log("Current page: "+current_page);
//         if (current_page === totalPages) {
//             return false;
//         } else {
//             current_page++;
//             $(".pagination li").removeClass("active");
//             $("#paginate .card-columns").hide();
//             for (var i = grandTotal - limitPerPage; i < grandTotal; i++) {
//                 $("#paginate .card-columns:eq(" + i + ")").show();
//             }
//             $(".pagination li.current_page:eq(" + (current_page + 1) + ")").addClass("active");
//         }
//     });

//     // Functionality for PREVIOUS button
//     $("#previous").on("click", function () {
//         var current_page = $(".pagenation li.active").index();
//         if (current_page === 1) {
//             return false;
//         } else {
//             current_page--;
//             $(".pagination li").removeClass("active");
//             $("#paginate .card-columns").hide();
//             for (var i = grandTotal - limitPerPage; i < grandTotal; i++) {
//                 $("#paginate .card-columns:eq(" + i + ")").show();
//             }
//             $(".pagination li.current_page:eq(" + (current_page - 1) + ")").addClass("active");
//         }
//     });
// // });