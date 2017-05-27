$(document).ready(function(){

// This is the user's input
var artist = "porter robinson"; // $("#").val().trim();
var artistId;

// This will be the URL to obtain the attractionId for the artist 
// We need this so we can find the upcoming events for the exact artist
var attractionsURL = "https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=JuO6exfNpASFTwptmBPvKKqdGYrP7S96&keyword=" + artist;  

// AJAX REQUEST #1: Obtaining information about artist
$.ajax({
	url: attractionsURL,
	method: "GET"
})
.done(function(artistResponse){
	console.log(artistResponse);
	artistId = artistResponse._embedded.attractions[0].id;
	console.log(artistId);

	// We need to grab twitterURL
	// call the twitter function


	var twitterURL = artistResponse._embedded.attractions[0].externalLinks.twitter[0].url;
	// console.log(twitterURL);

	twitter(twitterURL);

	var countryCode = "US";
	var dateOrder = "date,asc";
	var sixMonthsLimit = moment().add(6, "months").format("YYYY-MM-DDTHH:mm:ss");
	var eventsURL = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=JuO6exfNpASFTwptmBPvKKqdGYrP7S96&attractionId="+ artistId +  "&countryCode=" + countryCode + "&sort=" + dateOrder + "&endDateTime=" + sixMonthsLimit + "Z";
	
	// AJAX REQUEST #2: Obtaining information about artist's upcoming events
	$.ajax({
		url: eventsURL,
		method: "GET"
	}) 
	.done(function(eventsResponse){
		console.log(eventsResponse);

		// grab panel content

		var concertName;
		var city;
		var state;
		var venueName;
		var startDate;
		var ticketLink;
		var time;
		var formatTime;

		// for map api
		var latlong = []; // push each set of lat & long here
		var latitude;
		var longitude;

		for (var i = 0; i < 10 && i < eventsResponse._embedded.events.length; i++) {

			// grab concert name from each event
			concertName = eventsResponse._embedded.events[i].name;
			console.log("concert " + (i+1) + " name: " + concertName);

			// grab city
			city = eventsResponse._embedded.events[i]._embedded.venues[0].city.name;
			console.log("city: " + city);

			// grab state
			state = eventsResponse._embedded.events[i]._embedded.venues[0].state.stateCode;
			console.log("state: " + state);

			// grab venue name from each event
			venueName = eventsResponse._embedded.events[i]._embedded.venues[0].name;
			console.log("venue " + (i+1) + " name: " + venueName);
		
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
				console.log("date: " + startDate);
			}

			else {
				startDate = "The date hasn't been set yet!";
			}

			// grab ticket link
			ticketLink = eventsResponse._embedded.events[i].url;
			console.log("Tickets for Concert " + (i+1) + ": " + ticketLink);
		
			// grab latitutde and longitude
			latitude = eventsResponse._embedded.events[i]._embedded.venues[0].location.latitude;
			longitude = eventsResponse._embedded.events[i]._embedded.venues[0].location.longitude;
			console.log("latitude: " + latitude);
			console.log("longitude: " + longitude);

			latlong.push({
				concert: concertName,
				venue: venueName,
				lat: latitude,
				long: longitude
			});

			console.log(latlong);

			$('#concerts-display').append(
				"<div class='panel panel-info'>" +
				"<div class='panel-heading'>" +
				"<h3 class='panel-title'>" +
				concertName + " <small>" + city + ", "  + state + 
				"</small>" + "</h3></div>" +
				"<div class='panel-body'>" +
				venueName + "<br/>" + formatTime + "<br/>" +
				"<a href='" + ticketLink + "'>Purchase Tickets Here</a>" +
				"</div></div>"
			);

		}

	});

});

function twitter(twitterURL){
	console.log(twitterURL);

	var splitArr = twitterURL.split("https://twitter.com/");
	var twitterHandle = splitArr[1];
	console.log(twitterHandle);

	// $("#twitter").attr("data-screen-name", "twitterHandle");
	$("#source").attr("href", twitterURL);

	twttr.widgets.createTimeline({
    	sourceType: 'profile',
    	screenName: twitterHandle
  	},
  	document.getElementById('twitcontainer')
	);

}


/*
* panel content (grab from under events ajax call)
* concert name
* venue name
* concert dates
* address
* venue link

put in for loop & grab first 10 or limit response to 10

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

})

