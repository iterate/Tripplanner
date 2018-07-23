import React, { Component } from "react";
import MapboxWrapper from "./MapboxWrapper";
import Development from "./Development";
import HowTo from "./HowTo";

export default class MapPage extends Component {
  state = {};

  render() {
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
        <MapboxWrapper roomId={this.props.roomId} />
        <Development roomId={this.props.roomId} />
        <HowTo />
      </div>
    );
  }
}
