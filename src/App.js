import React, { Component } from "react";
import VisDatabaseTest from "./components/VisDatabaseTest";
import MapboxWrapper from "./components/MapboxWrapper";
import database from "./database";
import WaitPage from "./components/WaitPage";
import Frontpage from "./components/Frontpage";

const stateFrontPage = 0;
const stateInactiveMap = 1;
const stateActiveMap = 2;
const stateWaitPage = 3;

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			page: stateWaitPage
		};

		//get the path specified after the domain in the url.
		//e.g. www.tripplanner.com/myCoolMap gives "/myCoolMap"
		this.roomId = window.location.pathname;
		// this.roomId = this.roomId.length <= 1 ? "" : this.roomId.substring(1);
		this.roomId = this.roomId.substring(1);
		console.log(this.roomId);
	}

	componentDidMount() {
		console.log("will mount");
		if (this.roomId === "") {
			this.setState({ page: stateFrontPage });
			return;
		}

		database.checkIfRoomExists(this.roomId, roomExists => {
			this.setState({ page: roomExists ? stateActiveMap : stateInactiveMap });
		});
	}

	onCreateRoom(e) {
		let newpath = "/" + this.state.createRoomName;
		console.log("newpath:", newpath);
		window.location.pathname = newpath;

		//e.preventDefault();
	}

	render() {
		if (this.state.page === stateWaitPage) {
			return <WaitPage />;
		} else if (this.state.page === stateInactiveMap) {
			return (
				<div>
					<h1>{"This map doesn't exist :("}</h1>
					<p>{"let us know if that is wrong"}</p>
					<a href="/">{"Go to homepage"}</a>
				</div>
			);
		} else if (this.state.page === stateActiveMap) {
			return (
				<div>
					<MapboxWrapper database={database} roomId={this.roomId} />;
				</div>
			);
		} else if (this.state.page !== stateFrontPage) {
			console.error("No page state detected, returning to front page");
		}

		return (
			<Frontpage
				onTextChange={(e => (this.state.createRoomName = e.target.value)).bind(
					this
				)}
				onTextKeyDown={(e => e.keyCode === 13 && this.onCreateRoom()).bind(
					this
				)}
				onCreateRoomClick={this.onCreateRoom.bind(this)}
			/>
			// <div>
			// 	<p>{"Front page"}</p>
			// 	<input
			// 		type="text"
			// 		onChange={e => {
			// 			this.state.createRoomName = e.target.value;
			// 			console.log(this.state.createRoomName);
			// 		}}
			// 		onKeyDown={e => e.keyCode === 13 && this.onCreateRoom()}
			// 	/>
			// 	<input
			// 		type="button"
			// 		value="Create map"
			// 		onClick={this.onCreateRoom.bind(this)}
			// 	/>
			// </div>
		);
	}
}

export default App;
