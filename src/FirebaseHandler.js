import React, { Component } from "react";
import firebase from "firebase";

export default class FirebaseComponent extends Component {
	// componentWillMount() {
	// 	document.addEventListener("DOMContentLoaded", this.documentLoaded);
	// }
	componentWillMount() {
		// load firebase
		var config = {
			apiKey: "AIzaSyCVzw8DEn6ohfXvSoHWrX5SZZeb-lWj5uM",
			authDomain: "tripplanner-222bd.firebaseapp.com",
			databaseURL: "https://tripplanner-222bd.firebaseio.com",
			projectId: "tripplanner-222bd",
			storageBucket: "",
			messagingSenderId: "942083576578"
		};

		firebase.initializeApp(config);

		console.log("firebase initialized");

		//this.documentLoaded();
		this.database = {
			storeMarker: this.storeMarker.bind(this),
			loadMarkersOnce: this.loadMarkersOnce.bind(this),
			addMarkerListener: this.addMarkerListener.bind(this)
		};
	}

	storeMarker(roomName, lng, lat, title) {
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
	loadMarkersOnce(roomName, callback) {
		var roomRef = firebase.database().ref("/rooms/" + roomName);
		roomRef.once("value").then(function(snapshot) {
			callback(snapshot.val());
		});
	}

	// initially callbacks once for each existing marker for the given room in the datanase
	// thereafter get notified whenever a new marker is added
	addMarkerListener(roomName, callback) {
		var roomRef = firebase.database().ref("/rooms/" + roomName);
		roomRef.on("child_added", snapshot => callback(snapshot.val()));
	}

	render() {
		const { children } = this.props;

		const childrenWithProps = React.Children.map(children, child =>
			React.cloneElement(child, { database: this.database })
		);

		return <div>{childrenWithProps}</div>;
	}
}
