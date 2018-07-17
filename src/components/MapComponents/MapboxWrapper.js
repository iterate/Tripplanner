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
		markers: {},
		activeMarkerKey: null,
		lastMarkerCreatedKey: undefined,
		mapRef: React.createRef()
	};

	componentDidMount = () => {
		this.props.database.addMarkerListener(
			this.props.roomId,
			this.onMarkerLoadedFromDB
		);
	};

	//marker loaded from database
	onMarkerLoadedFromDB = dbMarker => {
		this.pushMarkerToState(dbMarker, () => {
			console.log("Marker loaded form db");
			this.state.lastMarkerCreatedKey === dbMarker.key &&
				this.setState({ activeMarkerKey: dbMarker.key });
		});
	};

	pushMarkerToDB = data => {
		let newMarker = {
			lng: undefined,
			lat: undefined,
			title: "",
			link: "",
			comment: "",
			...data
		};
		console.log("Pushing marker to db:", newMarker);
		this.props.database.storeMarker(this.props.roomId, data, newKey => {
			this.setState({ lastMarkerCreatedKey: newKey });
		});
	};

	updateMarkerInDB = (markerId, data) => {
		this.props.database.updateMarker(this.props.roomId, markerId, data);
	};

	// pushNewPointToDB = lngLat => {
	// 	let marker_data = {
	// 		lng: lngLat[0],
	// 		lat: lngLat[1]
	// 	};
	// 	this.storeMarker(marker_data);
	// };

	//put marker in state so it is rendered
	pushMarkerToState = (data, callback) => {
		if (data.lng === undefined || data.lat === undefined) {
			console.error("lat and lang not given", data);
		}
		//explicit to show what attributes exsist
		let markerData = {
			key: data.key,
			lng: data.lng,
			lat: data.lat,
			title: data.title || "",
			link: data.link || "",
			comment: data.comment || ""
		};
		this.setState(
			state => ({
				markers: { ...state.markers, [data.key]: markerData }
			}),
			() => callback && callback()
		);
	};

	updateMarkerInState = dbMarker => {
		//TODO: do this on marker update in db
	};

	//Createsm a new marker with the given lnd and lat and make this marker active.
	//The marker is put to render and stored in the database
	// pushEmptyMarkerToDB = data => {
	// 	let newMarker = {
	// 		lng: undefined,
	// 		lat: undefined,
	// 		title: "",
	// 		link: "",
	// 		comment: "",
	// 		...data
	// 	};
	// 	this.storeMarkerInDatabase(newMarker);
	// 	// this.putMarker(newMarker, newMarkerIndex => {
	// 	// 	this.setState(state => ({
	// 	// 		activeMarkerIndex: state.markers.length - 1
	// 	// 	}));
	// 	// 	//store in database
	// 	// 	this.storeMarkerInDatabase(newMarker);
	// 	// });
	// };

	onMapClick = click_event => {
		//click_event.preventDefault();

		if (this.state.activeMarkerKey !== null) {
			this.setState({ activeMarkerKey: null });
		} else {
			this.pushMarkerToDB({
				lng: click_event.lngLat[0],
				lat: click_event.lngLat[1]
			});
		}
	};

	viewportHandler = viewport => {
		this.setState({
			viewport: { ...this.state.viewport, ...viewport }
		});
	};

	jumpHandler = (lat, lng) => {
		let coordinate = {
			lat: lat,
			lng: lng
		};
		this.putMarker(coordinate);
	};

	//when the save burtton to a marker edit-box is clicked
	onSaveMarker(e, data) {
		e.preventDefault();

		this.updateMarkerInDB(this.state.activeMarkerKey, data);

		this.setState({ activeMarkerKey: null });
	}

	renderActiveMarkerMenu = () => {
		if (this.state.activeMarkerKey !== null) {
			let activeMarker = this.state.markers[this.state.activeMarkerKey];
			console.log(
				"Active marker: index(",
				this.state.activeMarkerKey,
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

	//what is rendered per marker
	renderMarker = markerKeyData => {
		let key = markerKeyData[0];
		let markerData = markerKeyData[1];
		//check if data is invalid
		if (markerData.lng == null || markerData.lat == null) {
			console.error(
				"undefined lngLat in MapboxWrapper.renderMarker()",
				markerData
			);
			return;
		}
		return (
			<Marker
				key={markerData.key}
				latitude={markerData.lat}
				longitude={markerData.lng}
				offsetLeft={0}
				offsetTop={0}
			>
				{markerData.title}
				<div
					id={markerData.key}
					className="station"
					onClick={() =>
						this.setState({
							activeMarkerKey: markerData.key
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
				onClick={this.onMapClick.bind(this)}
			>
				<style>{MARKER_STYLE}</style>
				{Object.entries(this.state.markers).map(this.renderMarker)}
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
