import firebase from "firebase";

// const database = {
// 	storeMarker: this.storeMarker.bind(this),
// 	loadMarkersOnce: this.loadMarkersOnce.bind(this),
// 	addMarkerListener: this.addMarkerListener.bind(this)
// };
const database = {
	loadMarkersOnce: loadMarkersOnce,
	addMarkerCreatedListener: addMarkerCreatedListener,
	addMarkerChangedListener: addMarkerChangedListener,
	addMarkerRemovedListener: addMarkerRemovedListener,
	storeMarker: storeMarker,
	updateMarker: updateMarker,
	removeMarker,
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
		if (callback !== undefined) callback(false);
		return;
	}
	if (callback !== undefined) callback(true);
}

function storeMarker(roomId, markerData, callbackNewkey, callbackMarkerStored) {
	let markerWasStored;
	let newKey = null;
	try {
		//get a unique random key for the new point
		newKey = firebase
			.database()
			.ref("/rooms/" + roomId + "/markers")
			.push().key;

		if (callbackNewkey !== undefined) callbackNewkey(newKey);
		//add the new key as an attribute to the marker
		markerData["key"] = newKey;

		console.log("Marker is beeing stored", markerData);

		//store marker data at the unique location
		firebase
			.database()
			.ref("rooms/" + roomId + "/markers/" + newKey)
			.set(markerData);
		markerWasStored = true;
	} catch (e) {
		markerWasStored = false;
	}
	if (callbackMarkerStored !== undefined)
		callbackMarkerStored(markerWasStored, newKey);
}

// Update the marker given by data.key with data in the data object.
// Attributes not in the data objects will remain.
// Callbacks with wether the marker was actually updated.
function updateMarker(roomId, markerId, data, callback) {
	markerId === undefined &&
		console.log("No markerId given when updating marker");

	console.log("Updating marker with:", data);
	let markerWasUpdated;
	try {
		firebase
			.database()
			.ref("rooms/" + roomId + "/markers/" + markerId)
			.update(data);

		markerWasUpdated = true;
	} catch (e) {
		markerWasUpdated = false;
	}

	callback !== undefined && callback(markerWasUpdated);
}

function removeMarker(roomId, markerId, callback) {
	markerId === undefined &&
		console.log("No markerId given when removing marker");

	let markerWasRemoved;
	try {
		firebase
			.database()
			.ref("rooms/" + roomId + "/markers/" + markerId)
			.set(null);

		markerWasRemoved = true;
	} catch (e) {
		markerWasRemoved = false;
	}

	callback && callback(markerWasRemoved);
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
function addMarkerCreatedListener(roomId, listener) {
	var roomRef = firebase.database().ref("/rooms/" + roomId + "/markers");
	roomRef.on("child_added", snapshot => listener(snapshot.val()));
}
function addMarkerChangedListener(roomId, listener) {
	var roomRef = firebase.database().ref("/rooms/" + roomId + "/markers");
	roomRef.on("child_changed", snapshot => listener(snapshot.val()));
}
function addMarkerRemovedListener(roomId, listener) {
	var roomRef = firebase.database().ref("/rooms/" + roomId + "/markers");
	roomRef.on("child_removed", snapshot => listener(snapshot.val()));
}

// function addMarkerUpdateListener(roomId, markerKey, listener) {
// 	var markerRef = firebase
// 		.database()
// 		.ref("/rooms/" + roomId + "/markers/" + markerKey);
// 	markerRef.on("value", snapshot => {
// 		console.log("Marker updated", snapshot.val());
// 		listener(snapshot.val());
// 	});
// }
