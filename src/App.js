import React, { Component } from "react";
import VisDatabaseTest from "./components/VisDatabaseTest";
import MapboxWrapper from "./components/MapboxWrapper";
import database from "./database";

class App extends Component {
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
					<MapboxWrapper database={database} roomId={roomId} />;
				</div>
			);
		}
	}
}

export default App;
