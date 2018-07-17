import React, { Component } from "react";
import VisDatabaseTest from "./components/VisDatabaseTest";
import MapboxWrapper from "./components/MapComponents/MapboxWrapper";
import database from "./database";
import WaitPage from "./components/WaitPage";
import Frontpage from "./components/Frontpage";
import Development from "./components/Development";

const stateFrontPage = 0;
const stateInactiveMap = 1;
const stateActiveMap = 2;
const stateWaitPage = 3;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: stateWaitPage,
      mapInUseWarning: false,
      notExistsWarning: false
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
    let newName = this.state.createRoomName;
    let newPath = "/" + newName;

    //If the room requested to create already exist, display a message and don't create the room.
    //Otherwise create it and navigate to it
    database.checkIfRoomExists(newName, exists => {
      if (exists) {
        console.log("The map you are creating already exists :(");
        this.setState({ mapInUseWarning: true });
        return;
      }

      database.createRoom(newName, created => {
        if (!created) {
          console.log("Couldn't create the map :( Please try again");
          return;
        }

        this.setState({ mapInUseWarning: false });
        window.location.pathname = newPath;
      });
    });
  }
  onVisitMapClick(e) {
    let newName = this.state.createRoomName;
    let newPath = "/" + newName;

    //If the room requested to create already exist, display a message and don't create the room.
    //Otherwise create it and navigate to it
    database.checkIfRoomExists(newName, exists => {
      if (!exists) {
        this.setState({ notExistsWarning: true });
        return;
      }

      this.setState({ notExistsWarning: false });
      window.location.pathname = newPath;
    });
  }

  onCreateRoomTextChange(e) {
    this.state.createRoomName = e.target.value;
    this.setState({
      createRoomName: e.target.value,
      mapInUseWarning: false,
      notExistsWarning: false
    });
  }

  getWarning() {
    if (this.state.mapInUseWarning)
      return {
        text: "This map already exists",
        linkTxt: "View map",
        link: this.onVisitMapClick.bind(this)
      };
    if (this.state.notExistsWarning)
      return {
        text: "This map doesn't exist",
        linkTxt: "Create map",
        link: this.onCreateRoom.bind(this)
      };
    return false;
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
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }}
        >
          <MapboxWrapper database={database} roomId={this.roomId} />
          <Development />
        </div>
      );
    } else if (this.state.page !== stateFrontPage) {
      console.error("No page state detected, returning to front page");
    }

    return (
      <Frontpage
        warning={this.getWarning()}
        onTextChange={this.onCreateRoomTextChange.bind(this)}
        onTextKeyDown={(e => e.keyCode === 13 && this.onCreateRoom()).bind(
          this
        )}
        onCreateRoomClick={this.onCreateRoom.bind(this)}
        onVisitMapClick={this.onVisitMapClick.bind(this)}
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
