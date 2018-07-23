import React, { Component } from "react";
import MapboxWrapper from "./MapboxWrapper";
import Development from "./Development";
import HowTo from "./HowTo";
import styled from "styled-components";

const FlexContainer = styled.div`
	display: flex;
	flex-flow: column;
	justify-content: center;
	height: 100vh;
	width: 100vw;
`;

const Header = styled.div`
height: 10vh;
width: 100vw;
@media (min-width: 768px) {
	align-items: center;
	background-image: url("./images/map_pins.jpg");
	background-size: cover;
	background-position: center;
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
				<Header />
				<MapboxContainer>
					<MapboxWrapper roomId={this.props.roomId} />
					<Development roomId={this.props.roomId} />
					<HowTo />
				</MapboxContainer>
			</FlexContainer>
		);
	}
}
