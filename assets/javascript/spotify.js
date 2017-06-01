

//Go to Spotify and get artist.
//Get artist ID.
//With IDs, get albums, get tracks, and build playlist.

var artist = "";

var playlistTrackURL = [];

var playlistTrackName = [];

var playlistWidget = "";

$("#search").on("click", function(event) {
	
	event.preventDefault();

	artist = "";

    playlistTrackURL = [];

    playlistTrackName = [];

    playlistWidget = "";

	artist = $("#artist-input").val().trim();
	console.log(artist);

	searchArtist(artist);

});


function searchArtist(artist) {

    $("#spotify-display").empty();

	var queryURL = "https://api.spotify.com/v1/search?q=" + artist + "&type=artist";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {

		console.log(response);
		//Get ID of most relevant artist match.
      	var artistID = response.artists.items[0].id;

      	var queryURLTopTracks = "https://api.spotify.com/v1/artists/" + artistID + "/top-tracks?country=US";

      	$.ajax({
      		url: queryURLTopTracks,
      		method: "GET"
      	}).done(function(topTrackResponse) {
      		console.log(topTrackResponse);

      		for (var i = 0 ; i < 10 ; i++) {
				playlistTrackURL.push(topTrackResponse.tracks[i].preview_url);
				playlistTrackName.push(topTrackResponse.tracks[i].name);
      		};

      		buildPlaylist(playlistTrackURL, playlistTrackName);

      	});
	});
};

function buildPlaylist(playlistTrackURL, playlistTrackName) {

	console.log(playlistTrackURL);
	console.log(playlistTrackName);

	for (var i = 0 ; i < playlistTrackName.length ; i++) {

		var div = $("<div>");
		div.addClass("track");
	
		var btn = $("<button>");
		btn.addClass("play-button")
		btn.attr("id", playlistTrackURL[i]);
		// btn.addEventListener("click", switchTrack);
	
		var span = $("<span>");
		span.addClass("glyphicon glyphicon-play-circle");
	
		btn.append(span);
		div.append(btn);
		div.append(" " + playlistTrackName[i]);
		$("#spotify-display").append(div);

};


// myAudio.addEventListener("ended", function() {

// });

audio = new Audio();
	var playingTrack;
	var isPlaying = false;

function playSong(event) {


	playingTrack = this.id;

	console.log(playingTrack);
	console.log(isPlaying);

	if(isPlaying === true && playingTrack != this.id) {
		isPlaying = true;
		audio.src = this.id;
		audio.play();
		} else if (isPlaying === true && playingTrack === this.id) {
			audio.pause();
			isPlaying = false;
		} else {
		isPlaying = true;
		audio.src = this.id;
		audio.play();
	};

	// if(isPlaying) {
	// 	if(playingTrack != this.id) {
	// 		isPlaying = true;
	// 		audio.src = this.id;
	// 		audio.play();
	// 	} else {
	// 		audio.pause();
	// 		isPlaying = false;
	// 	}
	// } else {
	// 	isPlaying = true;
	// 	audio.src = this.id;
	// 	audio.play();
	// }
};

$(document).on("click", ".play-button", playSong);



	// playlistWidget = "https://embed.spotify.com/?theme=white&uri=spotify:trackset:My&20Playlist:" + playlist;

	// $("#playlist-display").html("<iframe src=" + playlistWidget + " width='300' height='380' frameborder='0' allowtransparency='true'></iframe>");
};



// <iframe src="https://open.spotify.com/embed?uri=spotify:user:spotify:playlist:3rgsDhGHZxZ9sB9DQWQfuf" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>
