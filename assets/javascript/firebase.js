$(document).ready(function(){ 

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCdLnRyG4j3prvW7fTO7W4sdGSDT3IV5ko",
  authDomain: "soundscout-987b3.firebaseapp.com",
  databaseURL: "https://soundscout-987b3.firebaseio.com",
  projectId: "soundscout-987b3",
  storageBucket: "soundscout-987b3.appspot.com",
  messagingSenderId: "165541661077"
};

firebase.initializeApp(config);

var searchData = firebase.database();


// search button 1
$("#search1").on("click", function(event){ 
    event.preventDefault();
    var searchinfo = $("#artist-input1").val().trim();
    // console.log(searchinfo);

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
    // console.log(searchinfo);

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
    // console.log(searchinfo);

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
    // console.log(searchinfo);

    searchData.ref().push({
        searchinfo :  searchinfo,
    }); 

    $("#artist-input4").val("");
    return false;
});


searchData.ref().on("child_added", function(childSnapshot){
  var searchList = childSnapshot.val().searchinfo;
  $("#recentSearch").prepend(searchList);

});

});

