$(document).ready(function(event) {
        
       $(".btn,#search").on("click", function(event) {
            event.preventDefault();
            console.log("inside click function");
            $(".jumbotron").slideUp("slow", function() {
                console.log("jumbotron hide");
                    $("#bottom").show();
            	})    

        	});
	
        var ww = $(window).width();
            
           	if (ww <768) {

                console.log("click");
                $("#form2").on("click", "#search", function(search) {
                search.preventDefault();
                    console.log("inside click function");
                    $(".jumbotron").hide("slow", function() {
                        console.log("jumbotron hide");
                            $("#bottom").show();
                        })    
            	})
            } // end of if statement

       $(window).resize(function(event) {
            var ww = $(window).width();
                if(ww <768) {
                    console.log("click");
                    
                    $("#form2").on("click", "#search", function(search) {
                        search.preventDefault();
                        
                        console.log("inside click function");
                        
                        $(".jumbotron").hide("slow", function() {
                            console.log("jumbotron hide");
                            $("#bottom").show();
                            
                        });   
                    });
            }
        }); // end of window resize

}); // end of document ready
