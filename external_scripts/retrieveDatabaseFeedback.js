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

firebase
	.database()
	.ref("/feedback/")
	.once("value")
	.then(snapshot => {
		Object.entries(snapshot.val()).forEach(entry => {
			console.log("");
			console.log("From:", entry[1].email || "-no email-");
			console.log(entry[1].feedback);
		});
	});
