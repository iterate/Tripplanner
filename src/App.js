import React, { Component } from "react";
import FirebaseHandeler from "./FirebaseHandler";
import VisDatabaseTest from "./VisDatabaseTest";

class App extends Component {
	render() {
		return (
			<div className="App">
				<FirebaseHandeler>
					<VisDatabaseTest />
				</FirebaseHandeler>
			</div>
		);
	}
}

export default App;
