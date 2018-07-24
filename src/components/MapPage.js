import React, { Component } from "react";
import MapboxWrapper from "./MapboxWrapper";
import Development from "./Development";
import HowTo from "./HowTo";
import styled from "styled-components";
import RoomUrlField from "./RoomUrlField";

const FlexContainer = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 10vh;
  width: 100vw;
  @media (min-width: 768px) {
    align-items: center;
    background-image: url("./images/map_pins.jpg");
    background-size: cover;
    background-position: top;
  }
`;
const Logo = styled.div`
  background-image: url("./images/PlinkLogo.png");
  height: 50px;
  width: 50px;
  margin-left: 10px;
  cursor: pointer;
  background-repeat: no-repeat;
  background-size: 50px;
  @media (min-width: 768px) {
    height: 60px;
    width: 60px;
    background-size: 60px;
  }
`;

const MapboxContainer = styled.div`
  flex-grow: 1;
`;

export default class MapPage extends Component {
  state = {};

  render() {
    return (
      <FlexContainer>
        <Header>
          <Logo />
          <RoomUrlField />
        </Header>
        <MapboxContainer>
          <MapboxWrapper roomId={this.props.roomId} />
          <Development roomId={this.props.roomId} />
          <HowTo />
        </MapboxContainer>
      </FlexContainer>
    );
  }
}
