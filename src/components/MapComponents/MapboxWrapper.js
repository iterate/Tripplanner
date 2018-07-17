import React from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import Dimensions from "react-dimensions";
import Config from "./config.json";
import MARKER_STYLE from "./marker-style";
import Geocoder from "./Geocoder";
import PointInfo from "../PointInfo";
import styled from "styled-components";

const ScreenedPointInfo = styled(PointInfo)`
	//z-index: 10;
	position: absolute;
`;

class MapboxWrapper extends React.Component {
	state = {
		viewport: {
			width: this.props.containerWidth,
			height: this.props.containerHeight,
			latitude: 59.914344,
			longitude: 10.744033,
			zoom: 2
		},
		markers: [],
		activeMarkerIndex: -1,
		mapRef: React.createRef()
	};

	componentDidMount = () => {
		this.props.database.addMarkerListener(
			this.props.roomId,
			this.onMarkerLoaded
		);
	};

	//marker loaded from database
	onMarkerLoaded = data => {
		this.putMarker(data);
	};

	//store marker to database
	storeMarker = data => {
		this.props.database.storeMarker(this.props.roomId, data);
	};

	//update marker in database
	storeMarkerUpdate = (markerId, data) => {
		this.props.database.updateMarker(this.props.roomId, markerId, data);
	};

	pushNewPointToDB = lngLat => {
		let marker_data = {
			lng: lngLat[0],
			lat: lngLat[1]
		};
		this.storeMarker(marker_data);
	};

	//put marker in state so it is rendered
	putMarker = data => {
		if (data.lng === undefined || data.lat === undefined) {
			console.error("lat and lang not given", data);
		}
		//explicit to show what attributes exsist
		let markerData = {
			key: data.key,
			lng: data.lng,
			lat: data.lat,
			title: data.title !== undefined ? data.title : "",
			link: data.link !== undefined ? data.link : "",
			comment: data.comment !== undefined ? data.comment : ""
		};
		this.setState({
			markers: [...this.state.markers, markerData]
		});
	};

	clickHandler = click_event => {
		click_event.preventDefault();

		if (this.state.activeMarkerIndex !== -1) {
			this.setState({ activeMarkerIndex: -1 });
		} else {
			let newMarker = {
				lng: click_event.lngLat[0],
				lat: click_event.lngLat[1],
				title: "",
				link: "",
				comment: ""
			};
			this.putMarker(newMarker);
			this.setState({
				activeMarkerIndex: this.state.markers.length - 1
			});

			//store this empty info to the database
			this.storeMarker(newMarker);
		}
	};

	viewportHandler = viewport => {
		this.setState({
			viewport: { ...this.state.viewport, ...viewport }
		});
	};

	//when the save burtton to a marker edit-box is clicked
	onSaveMarker(e, data) {
		e.preventDefault();

		this.storeMarkerUpdate(
			this.state.markers[this.state.activeMarkerIndex].key,
			data
		);

		this.setState({ activeMarkerIndex: -1 });
	}

	renderActiveMarkerMenu = () => {
		if (this.state.activeMarkerIndex !== -1) {
			let activeMarker = this.state.markers[this.state.activeMarkerIndex];
			console.log(
				"Active marker: index(",
				this.state.activeMarkerIndex,
				")",
				activeMarker
			);
			return (
				<div>
					<Marker
						key={1000}
						latitude={activeMarker.lat}
						longitude={activeMarker.lng}
						offsetLeft={0}
						offsetTop={0}
					>
						<ScreenedPointInfo
							title={activeMarker.title}
							link={activeMarker.link}
							comment={activeMarker.comment}
							onSaveMarker={this.onSaveMarker.bind(this)}
						/>
					</Marker>
				</div>
			);
		} else return null;
	};

	jumpHandler = (lat, lng) => {
		let coordinate = {
			lat: lat,
			lng: lng
		};
		this.putMarker(coordinate);
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
				<div
					id={i}
					className="station"
					onClick={() =>
						this.setState({
							activeMarkerIndex: i
						})
					}
				/>
			</Marker>
		);
	};

	render = () => {
		return (
			<ReactMapGL
				ref={this.state.mapRef}
				mapboxApiAccessToken={Config.accessToken}
				{...this.state.viewport}
				onViewportChange={this.viewportHandler}
				onClick={this.clickHandler.bind(this)}
			>
				<style>{MARKER_STYLE}</style>
				{this.state.markers.map(this.renderMarker)}
				{this.renderActiveMarkerMenu()}
				<Geocoder
					jumpHandler={this.jumpHandler}
					mapRef={this.state.mapRef}
					onViewportChange={this.viewportHandler}
					mapboxApiAccessToken={Config.accessToken}
				/>
			</ReactMapGL>
		);
	};
}

export default Dimensions()(MapboxWrapper);
