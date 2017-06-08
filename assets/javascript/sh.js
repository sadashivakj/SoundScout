
var config = {
    apiKey: "AIzaSyAnNm1xoAljW5fWeHMFgxlJZdHNd2CAFS0",
    authDomain: "soundscout-e2f06.firebaseapp.com",
    databaseURL: "https://soundscout-e2f06.firebaseio.com",
    projectId: "soundscout-e2f06",
    storageBucket: "soundscout-e2f06.appspot.com",
    messagingSenderId: "849230955414"
  };

  firebase.initializeApp(config);
  var database = firebase.database();

$("#search").on("click", function(event){
  
event.preventDefault();
var searchinfo = $("#artist-input").val().trim();

database.ref().push({
 searchinfo :  searchinfo,

}); 

$("#basic-url").val("");

  return false;
    
});
 
database.ref().on("child_added", function(childSnapshot) {

 var searchList = childSnapshot.val().searchinfo;
 
//$("#info").append("<div><a href=>"+ searchList +"</a></div>");
for (var i=0;i<1;i++) {
    $('#internalActivities').append('<tr><td>'+searchList+'</td></tr>');
}

var trs = $("#internalActivities tr");
var btnMore = $("#seeMoreRecords");
var btnLess = $("#seeLessRecords");
var trsLength = trs.length;
var currentIndex = 5;

trs.hide();
trs.slice(0, 5).show(); 
checkButton();

btnMore.click(function (e) { 
    e.preventDefault();
    $("#internalActivities tr").slice(currentIndex, currentIndex + 5).show();
    currentIndex += 5;
    checkButton();
});

btnLess.click(function (e) { 
    e.preventDefault();
    $("#internalActivities tr").slice(currentIndex - 5, currentIndex).hide();          
    currentIndex -= 5;
    checkButton();
});

function checkButton() {
    var currentLength = $("#internalActivities tr:visible").length;

    if (currentLength >= trsLength) {
        btnMore.hide();            
    } else {
     btnMore.show();   
    }

    if (trsLength > 5 && currentLength > 5) {
        btnLess.show();
    } else {
        btnLess.hide();
    }

}

console.log(searchList);
 
});

 

$("#dropdown").on("click",function(){
 modal.style.display = "block"; 
    });

$(function() {
    //----- OPEN
    $('[data-popup-open]').on('click', function(e)  {
        var targeted_popup_class = jQuery(this).attr('data-popup-open');
        $('[data-popup="' + targeted_popup_class + '"]').fadeIn(350);
 
        e.preventDefault();
    });
 
    //----- CLOSE
    $('[data-popup-close]').on('click', function(e)  {
        var targeted_popup_class = jQuery(this).attr('data-popup-close');
        $('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);
 
        e.preventDefault();
    });
});

