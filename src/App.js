import React, { Component } from "react";
import FirebaseHandeler from "./FirebaseHandler";
import VisDatabaseTest from "./VisDatabaseTest";

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
					<FirebaseHandeler>
						<VisDatabaseTest />
					</FirebaseHandeler>
				</div>
			);
		}
	}
}

export default App;
