var roomId;

function storeMarker(lng, lat, title) {
	var newKey = firebase
		.database()
		.ref("/rooms/" + roomId)
		.push().key;

	firebase
		.database()
		.ref("rooms/" + roomId + "/" + newKey)
		.set({
			title: title,
			lng: lng,
			lat: lat
		});
}

document.addEventListener("DOMContentLoaded", function() {
	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyCVzw8DEn6ohfXvSoHWrX5SZZeb-lWj5uM",
		authDomain: "tripplanner-222bd.firebaseapp.com",
		databaseURL: "https://tripplanner-222bd.firebaseio.com",
		projectId: "tripplanner-222bd",
		storageBucket: "",
		messagingSenderId: "942083576578"
	};

	firebase.initializeApp(config);

	console.log("Firebase initialized");

	var database = firebase.database();

	//check if room url sepcified and retrieve it
	console.log(window.location);

	//set roomId to be used when storing markers
	roomId = window.location.pathname;

	loadMap();

	// addPinpoint("qwert", 200, 400, "Oslo");
	//
	var roomRef = firebase.database().ref("/rooms/" + roomId);
	roomRef.once("value").then(function(snapshot) {
		for (entryKey in snapshot.val()) {
			entry = snapshot.val()[entryKey];
			console.log(entry);
			addMarker(entry.lat, entry.lng, "generated from server");
		}
	});
});

//Map stuff

var mapboxgl;
var map;

function loadMap() {
	mapboxgl.accessToken =
		"pk.eyJ1IjoibmluYXRoOTMiLCJhIjoiY2pqaWlscDRsM3Q2aDNrcGxsaHQ1dG02NCJ9.7hwR--67HQrjo9MDxJ8HJQ";

	initMap();
}

function initMap() {
	map = new mapboxgl.Map({
		container: "map",
		style: "mapbox://styles/mapbox/streets-v9"
	});

	//Adding navigation control(zoom in, out, rotate)
	map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

	addMapClickListeners();
	addGeocoder();
}

function addMapClickListeners() {
	map.on("click", function(e) {
		addMarker(e.lngLat.lat, e.lngLat.lng);
	});
}

function addMarker(lat, lng) {
	var marker = new mapboxgl.Marker();
	marker.setLngLat([lng, lat]).addTo(map);

	//store in database
	storeMarker(lng, lat, "Cool place");
}

function addGeocoder() {
	var geocoder = new MapboxGeocoder({
		accessToken: mapboxgl.accessToken
	});

	map.addControl(geocoder);

	// After the map style has loaded on the page, add a source layer and default
	// styling for a single point.
	map.on("load", function() {
		// Listen for the `geocoder.input` event that is triggered when a user
		// makes a selection and add a symbol that matches the result.
		geocoder.on("result", function(ev) {
			debugger;
			addMarker(
				ev.result.geometry.coordinates[1],
				ev.result.geometry.coordinates[0]
			);
		});
	});
}
