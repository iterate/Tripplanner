import firebase from "firebase";

// const database = {
// 	storeMarker: this.storeMarker.bind(this),
// 	loadMarkersOnce: this.loadMarkersOnce.bind(this),
// 	addMarkerListener: this.addMarkerListener.bind(this)
// };
const database = {
	storeMarker: storeMarker,
	loadMarkersOnce: loadMarkersOnce,
	addMarkerListener: addMarkerListener
};
export default database;

var config = {
	apiKey: "AIzaSyCVzw8DEn6ohfXvSoHWrX5SZZeb-lWj5uM",
	authDomain: "tripplanner-222bd.firebaseapp.com",
	databaseURL: "https://tripplanner-222bd.firebaseio.com",
	projectId: "tripplanner-222bd",
	storageBucket: "",
	messagingSenderId: "942083576578"
};

// const myFirebase = firebase.initializeApp(config);
firebase.initializeApp(config);

function storeMarker(roomName, lng, lat, title) {
	var newKey = firebase
		.database()
		.ref("/rooms/" + roomName)
		.push().key;

	firebase
		.database()
		.ref("rooms/" + roomName + "/" + newKey)
		.set({
			title: title,
			lng: lng,
			lat: lat
		});
}

//returns all markers within a given room.
// callbacks: an object where each key is an marker id, and the value is the marker data
function loadMarkersOnce(roomName, callback) {
	var roomRef = firebase.database().ref("/rooms/" + roomName);
	roomRef.once("value").then(function(snapshot) {
		callback(snapshot.val());
	});
}

// initially callbacks once for each existing marker for the given room in the datanase
// thereafter get notified whenever a new marker is added
function addMarkerListener(roomName, callback) {
	var roomRef = firebase.database().ref("/rooms/" + roomName);
	roomRef.on("child_added", snapshot => callback(snapshot.val()));
}
