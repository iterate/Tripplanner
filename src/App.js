import React, { Component } from "react";
import FirebaseHandeler from "./components/FirebaseHandler";
import VisDatabaseTest from "./components/VisDatabaseTest";
import MapboxWrapper from "./components/map";

class App extends Component {
	constructor(props) {
		//create references to firebase and map components
		this.firebaseHandlerRef = React.createRef();
		this.mapboxWrapperRef = React.createRef();
	}

	onMarkerPlacedInMap(marker) {
		//save in database
	}

	onMarkerStoredInDatabase(marker) {
		//
	}

	render() {
		//get the path specified after the domain in the url.
		//e.g. www.tripplanner.com/myCoolMap gives "/myCoolMap"
		let roomId = window.location.pathname;

		if (roomId === "/") {
			//render landing screen
			return "Front page!";
		} else {
			//render map and points according to the roomId
			return (
				<div className="App">
					<MapboxWrapper ref={this.mapboxWrapperRef} />;
					<FirebaseHandeler ref={this.firebaseHandlerRef} />
				</div>
			);
		}
	}
}

export default App;
