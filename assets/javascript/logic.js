// LET'S NOT FORGET TO COME BACK AND ERASE ALL THE CONSOLE.LOGS
// BUT RIGHT NOW THEY ARE THERE FOR OUR CONVENIENCE

// GLOBAL VARIABLES ==========================================

'use strict';

var map;
var countryCode = "US";
var dateOrder = "date,asc";
var sixMonthsLimit = moment().add(6, "months").format("YYYY-MM-DDTHH:mm:ss");

// FUNCTIONS =================================================

// This function won't run inside the $(document).ready()
function initMap(){
	var uluru = {lat: 39.114171, lng: -94.627457};	//Center is Kansas City
    map = new google.maps.Map(document.getElementById('map-display'), {
        zoom: 4,
        center: uluru
    });
}

$(document).ready(function(){

	$('#bottom').hide();

	// TWITTER FUNCTION 
	function twitter(twitterURL){
		console.log("twitterURL: " + twitterURL);

		var splitArr = twitterURL.split("https://twitter.com/");
		var twitterHandle = splitArr[1];
		console.log("twitterHandle: " + twitterHandle);

		try {
			twttr.widgets.createTimeline({
		    	sourceType: 'profile',
		    	screenName: twitterHandle
	  		},
	  		document.getElementById('twitcontainer'),
	  		{
	  			theme: "dark",
	  		});
		}
		catch(e) {
			$('#twitter-display').html("<h4>Sorry, this Twitter account is unavailable.</h4>");
		}
	}

	// YOUTUBE FUNCTION

	function youtube(youtubeURL){
		console.log("youtubeURL:" + youtubeURL);

		var splitArray = youtubeURL.split("https://www.youtube.com/user/");
		var youtubeUser = splitArray[1];
		console.log("youtubeUser: " + youtubeUser);

		try {
			$('iframe').attr("src", "https://www.youtube.com/embed?enablejsapi=1&controls=2&showinfo=1&rel=0&listType=user_uploads&list=" + youtubeUser);
		}

		catch(e) {
			$('#youtube-display').html("<h4>Sorry, this Youtube Channel is unavailable.</h4>");
		}
	}

	// CONCERT INFORMATION
	// We can change eventsResponse to another name as to not confuse it with the other
	function concertInformation(eventsResponse){			
		var concertName;
		var city;
		var state;
		var venueName;
		var startDate;
		var ticketLink;
		var time;
		var formatTime;

		for (var i = 0; i < 10 && i < eventsResponse._embedded.events.length; i++) {

			// grab concert name from each event
			concertName = eventsResponse._embedded.events[i].name;
			// console.log("concert " + (i+1) + " name: " + concertName);

			// grab city
			city = eventsResponse._embedded.events[i]._embedded.venues[0].city.name;
			// console.log("city: " + city);

			// grab state
			state = eventsResponse._embedded.events[i]._embedded.venues[0].state.stateCode;
			// console.log("state: " + state);

			// grab venue name from each event
			venueName = eventsResponse._embedded.events[i]._embedded.venues[0].name;
			// console.log("venue " + (i+1) + " name: " + venueName);
			
			// grab concert time
			// validate that the time has been set first
			if (eventsResponse._embedded.events[i].dates.start.timeTBA == false && eventsResponse._embedded.events[i].dates.start.noSpecificTime == false) {
				time = eventsResponse._embedded.events[i].dates.start.localTime;
				formatTime = moment(time, "HH:mm:ss").format("h:mm A");
			}
			else if (eventsResponse._embedded.events[i].dates.start.timeTBA == false && eventsResponse._embedded.events[i].dates.start.noSpecificTime == true) {
				formatTime = "This event has no specific time.";
			}
			else {
				formatTime = "This event's time hasn't been set yet!";
			}

			// grab concert start date
			// validate that the date has been set first
			if (eventsResponse._embedded.events[i].dates.start.dateTBA == false && eventsResponse._embedded.events[i].dates.start.dateTBD == false){
				startDate = eventsResponse._embedded.events[i].dates.start.localDate;
				// console.log("date: " + startDate);
			}
			else {
				startDate = "The date hasn't been set yet!";
			}

			// grab ticket link
			ticketLink = eventsResponse._embedded.events[i].url;
			// console.log("Tickets for Concert " + (i+1) + ": " + ticketLink);
			
			$('#concerts-display').append(
				"<div class='panel panel-info searchContent'>" +
				"<div class='panel-heading' id='searchResults'>" +
				"<h3 class='panel-title searchResultsTitle'>" +
				concertName + " <small>" + city + ", "  + state + 
				"</small>" + "</h3></div>" +
				"<div class='panel-body searchResultsContent'>" +
				venueName + "<br/>" + formatTime + "<br/>" +
				"<a href='" + ticketLink + "'>Purchase Tickets Here</a>" +
				"</div></div>"
			);
		}
	}

	//ARTIST INFORMATION
	function ticketmasterRequest(artist){
		console.log("Artist: " + artist);

		// This will be the URL to obtain the the unique attractionId for the artist 
		// We need this so we can find the upcoming events for the exact artist
		var attractionsURL = "https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=JuO6exfNpASFTwptmBPvKKqdGYrP7S96&keyword=" + artist;  

		// AJAX REQUEST #1: Obtaining information about artist
		$.ajax({
			url: attractionsURL,
			method: "GET"
		})
		.done(function(artistResponse){
			console.log(artistResponse);

			var checkArtist = artistResponse.page.totalElements;

			// If input error is incorrect, alert the user. Otherwise, continue...
			if (checkArtist === 0) {
				// This is the message for the user, uncomment when .search-error is added to html
				$(".search-error").html("*Sorry, try again");
				console.log("Sorry, try again");
			}
			else {
				var artistId = artistResponse._embedded.attractions[0].id; 

				var eventsURL = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=JuO6exfNpASFTwptmBPvKKqdGYrP7S96&attractionId="+ artistId +  "&countryCode=" + countryCode + "&sort=" + dateOrder + "&endDateTime=" + sixMonthsLimit + "Z";
					
				// AJAX REQUEST #2: Obtaining information about artist's upcoming events
				$.ajax({
					url: eventsURL,
					method: "GET"
				}) 
				.done(function(eventsResponse){
					console.log(eventsResponse);

					var upcomingEvents = eventsResponse.page.totalElements;

					// If there are no concerts, alert the user. Otherwise, continue...
					if (upcomingEvents === 0) {
						// Display this message to the user if there are no shows
						$("#concerts-display").html("<h4>Sorry, it seems there are no upcoming shows. Please try again at a later time or search for another artist/band.</h4>");

						console.log("It seems there are no upcoming shows");
					}
					else {
						console.log(eventsResponse);

						concertInformation(eventsResponse);

						// Google Maps Markers
						var numEvents = eventsResponse._embedded.events;
						for (var i = 0; i < numEvents.length ; i++) {
							// Sometimes there is not lat/long for venues, so if-else statement
							if(eventsResponse._embedded.events[i]._embedded.venues[0].location === undefined){
								// We need to change this console.log to some notification for the user
								console.log("No lat/long");
							}
							else {
								var lat = Number(eventsResponse._embedded.events[i]._embedded.venues[0].location.latitude);
								var long = Number(eventsResponse._embedded.events[i]._embedded.venues[0].location.longitude);

									console.log("lat: " + lat);
									console.log("long: " + long);

								var marker = new google.maps.Marker({
									position: {lat: lat, lng: long},
									map: map
								});
							}
						}
					}
				});
			
				// Grabbing the artist's twitter url and calling the twitter function
				var twitterURL = artistResponse._embedded.attractions[0].externalLinks.twitter[0].url;
				// console.log(twitterURL);
				twitter(twitterURL);

				var youtubeURL = artistResponse._embedded.attractions[0].externalLinks.youtube[0].url;
				youtube(youtubeURL);

			}
		});
	}

	// MAIN PROCESSES ============================================

	var artist = "";

	$("#search").on("click", function(event){ 
		event.preventDefault();

		$('#bottom').show();
		initMap();

		// This is the user's input
		artist = $("#artist-input").val().trim();

		$("#artist-input").val("");
		$("#twitcontainer").empty();
		$("#concerts-display").empty();

		console.log("Artist: " + artist);

		ticketmasterRequest(artist);

	});

	$('#search2').on("click", function(event){ 
		event.preventDefault();

		$('#bottom').show();
		initMap();

		// This is the user's input
		artist = $("#artist-input2").val().trim();

		$("#artist-input2").val("");
		$("#twitcontainer").empty();
		$("#concerts-display").empty();

		console.log("Artist: " + artist);

		ticketmasterRequest(artist);

	});

});

/*
* panel content (grab from under events ajax call)
* concert name
* venue name
* concert dates
* address
* venue link


Dates
* objects -> _embedded -> events array & index number -> dates -> start -> grab local date and local time from here
validation if concert spans multiple days & if dateTBA/dateTBD/timeTBA/timeTBD is true 

Venue Image
* objects -> _embedded -> events array & index number -> images array & index number -> url
if fallback is true, there will be a standard venue image

Concert Name
* objects -> _embedded -> events array & index number -> name

Get Ticket Sales Link
* objects -> _embedded -> events array & index number -> url

Get Venue Info
* objects -> _embedded -> events array & index number -> _embedded -> venues array & index number -> address -> line1
gets address line1

* objects -> _embedded -> events array & index number -> _embedded -> venues array & index number -> city -> name
gets city name

* objects -> _embedded -> events array & index number -> _embedded -> venues array & index number -> country -> name
gets country name

* objects -> _embedded -> events array & index number -> _embedded -> venues array & index number -> postalCode
gets zip code

* objects -> _embedded -> events array & index number -> _embedded -> venues array & index number -> location -> latitude/longitude
gets latitude longitude info

* objects -> _embedded -> events array & index number -> _embedded -> venues array & index number -> name
gets venue name

*/

