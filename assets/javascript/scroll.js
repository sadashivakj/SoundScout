$(document).ready(function(event) {
        
   // search button click function to slide landing page to main page
   $(".btn,#search").on("click", function(event) {
        event.preventDefault();
        console.log("inside click function");
        $(".jumbotron").slideUp("slow", function() {
            console.log("jumbotron hide");
                $("#bottom").show();
        	})    
    });
	   
    var ww = $(window).width();
    // if statement for resizing response
       	if (ww <768) {
            $("#form2").on("click", "#search", function(search) {
            search.preventDefault();
                // console.log("inside click function");
                $(".jumbotron").hide("slow", function() {
                    // console.log("jumbotron hide");
                        $("#bottom").show();
                    })    
        	})
        } // end of if statement

   $(window).resize(function(event) {
        var ww = $(window).width();
            if(ww <768) {
                $("#form2").on("click", "#search", function(search) {
                    search.preventDefault();
                    // console.log("inside click function");
                    $(".jumbotron").hide("slow", function() {
                        // console.log("jumbotron hide");
                        $("#bottom").show();
                        
                    });   
                });
        }
    }); // end of window resize

}); // end of document ready
