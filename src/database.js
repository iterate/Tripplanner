import firebase from "firebase";

// const database = {
// 	storeMarker: this.storeMarker.bind(this),
// 	loadMarkersOnce: this.loadMarkersOnce.bind(this),
// 	addMarkerListener: this.addMarkerListener.bind(this)
// };
const database = {
	storeMarker: storeMarker,
	loadMarkersOnce: loadMarkersOnce,
	addMarkerListener: addMarkerListener,
	checkIfRoomExists: checkIfRoomExists,
	createRoom: createRoom
};
export default database;

const roomPath = "/rooms/";

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

function checkIfRoomExists(roomId, callback) {
	try {
		firebase
			.database()
			.ref("rooms/" + roomId)
			.once("value")
			.then(snapshot => {
				//console.log("Room", roomId, roomExists);
				let roomExists = snapshot.val() !== null;
				callback(roomExists);
			});
	} catch (error) {
		callback(false);
	}
}

//Create a new room, overrides existing ones
//callbacks when a room is created, returns wether a new room was actually created
function createRoom(roomId, callback) {
	try {
		firebase
			.database()
			.ref("rooms/" + roomId)
			.set({ exists: true });
	} catch (e) {
		//assumes that an error indicates room not created
		if (callback !== null) callback(false);
		return;
	}
	if (callback !== null) callback(true);
}

function storeMarker(roomId, lng, lat, title) {
	//get a unique random key for the new point
	var newKey = firebase
		.database()
		.ref("/rooms/" + roomId + "/markers")
		.push().key;
	//store marker data at the unique location
	firebase
		.database()
		.ref("rooms/" + roomId + "/markers/" + newKey)
		.set({
			title: title,
			lng: lng,
			lat: lat
		});
}

//returns all markers within a given room.
// callbacks: an object where each key is an marker id, and the value is the marker data
function loadMarkersOnce(roomId, callback) {
	var roomRef = firebase.database().ref("/rooms/" + roomId + "/markers");
	roomRef.once("value").then(function(snapshot) {
		callback(snapshot.val());
	});
}

// initially callbacks once for each existing marker for the given room in the datanase
// thereafter get notified whenever a new marker is added
function addMarkerListener(roomId, callback) {
	var roomRef = firebase.database().ref("/rooms/" + roomId + "/markers");
	roomRef.on("child_added", snapshot => callback(snapshot.val()));
}
