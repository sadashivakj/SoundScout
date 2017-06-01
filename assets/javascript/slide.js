$(document).ready(function(event) {
       
   $("#search").on("click", function(event) {
       event.preventDefault();
       console.log("inside click function");
       $(".jumbotron").slideUp("slow", function() {
           console.log("jumbotron hide");
               $("#bottom").show();
           })    

       });
   })