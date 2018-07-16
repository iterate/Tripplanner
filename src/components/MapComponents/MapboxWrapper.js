import React from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import Dimensions from "react-dimensions";
import Config from "./config.json";
import MARKER_STYLE from "./marker-style";

class MapboxWrapper extends React.Component {
	state = {
		viewport: {
			width: this.props.containerWidth,
			height: this.props.containerHeight,
			latitude: 59.914344,
			longitude: 10.744033,
			zoom: 2
		},
		markers: []
	};

	componentDidMount = () => {
		this.props.database.addMarkerListener(this.props.roomId, this.loadMarker);
	};

	loadMarker = data => {
		let markerData = {
			lng: data.lng,
			lat: data.lat,
			title: "Title",
			link: "https://tripplanner.iterate.no/",
			description: "This is a cool place! OMG we must visit this place!!"
		};
		this.setState({
			markers: [...this.state.markers, markerData]
		});
	};

	pushNewPointToDB = lngLat => {
		let marker_data = {
			lng: lngLat[0],
			lat: lngLat[1]
		};
		this.props.database.storeMarker(this.props.roomId, marker_data);
	};

	clickHandler = click_event => {
		this.pushNewPointToDB(click_event.lngLat);
	};

	//what is rendered per marker
	renderMarker = (data, i) => {
		//check if data is invalid
		if (data.lng == null || data.lat == null) {
			console.error("undefined lngLat in MapboxWrapper.renderMarker()", data);
			return;
		}
		return (
			<Marker
				key={i}
				latitude={data.lat}
				longitude={data.lng}
				offsetLeft={0}
				offsetTop={0}
			>
				{data.title}
				<div id={i} className="station" onClick={e => console.log(e)} />
			</Marker>
		);
	};

	render = () => {
		return (
			<ReactMapGL
				mapboxApiAccessToken={Config.accessToken}
				{...this.state.viewport}
				onViewportChange={viewport => this.setState({ viewport })}
				onClick={this.clickHandler}
			>
				<style>{MARKER_STYLE}</style>
				{this.state.markers.map(this.renderMarker)}
			</ReactMapGL>
		);
	};
}

export default Dimensions()(MapboxWrapper);
