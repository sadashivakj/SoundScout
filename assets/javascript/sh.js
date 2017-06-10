var config = {
    apiKey: "AIzaSyAnNm1xoAljW5fWeHMFgxlJZdHNd2CAFS0",
    authDomain: "soundscout-e2f06.firebaseapp.com",
    databaseURL: "https://soundscout-e2f06.firebaseio.com",
    projectId: "soundscout-e2f06",
    storageBucket: "soundscout-e2f06.appspot.com",
    messagingSenderId: "849230955414"
  };
  firebase.initializeApp(config);

  var searchData = firebase.database();

$(document).ready(function(event){ 
// search button 1
$("#search1").on("click", function(event){ 
    event.preventDefault();
    var searchinfo = $("#artist-input1").val().trim();
    console.log(searchinfo);

    searchData.ref().push({
        searchinfo :  searchinfo,
    }); 

    $("#artist-input1").val("");
    return false;
});
 
// search button 2
$("#search2").on("click", function(event){
  
    event.preventDefault();
    var searchinfo = $("#artist-input2").val().trim();
    console.log(searchinfo);

    searchData.ref().push({
        searchinfo :  searchinfo,
    }); 

    $("#artist-input2").val("");
    return false;
});

// search button 3
$("#search3").on("click", function(event){
  
    event.preventDefault();
    var searchinfo = $("#artist-input3").val().trim();
    console.log(searchinfo);

    searchData.ref().push({
        searchinfo :  searchinfo,
    }); 

    $("#artist-input3").val("");
    return false;
});

// search button 4
$("#search4").on("click", function(event){
  
    event.preventDefault();
    var searchinfo = $("#artist-input4").val().trim();
    console.log(searchinfo);

    searchData.ref().push({
        searchinfo :  searchinfo,
    }); 

    $("#artist-input4").val("");
    return false;
});
 
 
searchData.ref().on("child_added", function(childSnapshot) {

 var searchList = childSnapshot.val().searchinfo;
 
for (var i=0;i<1;i++) {
    $('#internalActivities').prepend('<tr><td>'+searchList+'</td></tr>');
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

//console.log(searchList);
 
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
});
