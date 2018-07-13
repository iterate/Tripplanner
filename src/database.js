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
				let roomExists = snapshot.val() !== null;
				callback(roomExists);
				console.log("Room", roomId, roomExists);
			});
	} catch (error) {
		callback(false);
	}
}
function createRoom(roomId) {
	firebase
		.database()
		.ref("rooms/")
		.set({ roomId: {} });
}

function storeMarker(roomId, lng, lat, title) {
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

//returns all markers within a given room.
// callbacks: an object where each key is an marker id, and the value is the marker data
function loadMarkersOnce(roomId, callback) {
	var roomRef = firebase.database().ref("/rooms/" + roomId);
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
