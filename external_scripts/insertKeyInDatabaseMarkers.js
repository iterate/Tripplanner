const firebase = require("firebase");

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

const markerHasKey = (path, callback) => {
	firebase
		.database()
		.ref(path)
		.once("value")
		.then(snapshot => {});
};

let totalMarkerCount = 0;
let markersWithoutKeyCount = 0;
let markersWithUndefinedKeyCount = 0;

firebase
	.database()
	.ref("/rooms/")
	.once("value")
	.then(snapshot => {
		//console.log(snapshot.val());
		let allRooms = snapshot.val();

		for (let key in allRooms) {
			let room = allRooms[key];

			// for (let m in room) {
			// 	if (m !== "exists" && m !== "markers") {
			// 		let ref = "/rooms/" + key + "/" + m;
			// 		console.log(ref);
			// 		firebase
			// 			.database()
			// 			.ref(ref)
			// 			.set(null);
			// 	}
			// }

			//console.log("Room", key);
			for (let markerKey in room.markers) {
				let marker = room.markers[markerKey];
				//console.log("Marker", marker);

				let path = "/rooms/" + key + "/markers/" + markerKey + "/";
				//console.log(path);

				totalMarkerCount += 1;

				if (!marker.hasOwnProperty("key")) {
					markersWithoutKeyCount += 1;

					//write key attribute
					firebase
						.database()
						.ref(path)
						.update({ key: markerKey });
				} else if (marker.key === "undefined" || markerKey === "undefined") {
					markersWithUndefinedKeyCount += 1;
					firebase
						.database()
						.ref(path)
						.set(null);
				}
			}
		}

		console.log("Total marker count: ", totalMarkerCount);
		console.log("Markers without key count: ", markersWithoutKeyCount);
		console.log(
			"Markers with undefined key count: ",
			markersWithUndefinedKeyCount
		);
		console.log("Key property should now have been added");
	});
