import React from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import Dimensions from "react-dimensions";
import Config from "./config.json";
import MARKER_STYLE from "./marker-style2";
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
		//TODO: add a listener for changes

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

	updateMarkerInDB = (markerId, data, callback) => {
		this.props.database.updateMarker(
			this.props.roomId,
			markerId,
			data,
			callback
		);
	};

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

	onMapClick = click_event => {
		//click_event.stopPropagation();
		if (this.state.activeMarkerKey !== null) {
			this.setState({ activeMarkerKey: null });
		} else {
			this.pushMarkerToDB({
				lng: click_event.lngLat[0],
				lat: click_event.lngLat[1]
			});
		}
	};

	onMarkerClick = (_, markerData) => {
		this.setState({
			activeMarkerKey: markerData.key
		});
		console.log("New marker data", markerData.key);
	};

	onSaveMarkerClick(e, data) {
		this.updateMarkerInDB(this.state.activeMarkerKey, data);
		//Tidenes ghettofix for at et nytt punkt ikke skal lages når man clicker:
		setTimeout(() => this.setState({ activeMarkerKey: null }), 300);
		console.log(e);
		e.preventDefault();
		e.stopPropagation();
	}

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
		this.pushMarkerToDB(coordinate);
	};

	renderActiveMarkerMenu = () => {
		if (this.state.activeMarkerKey !== null) {
			let activeMarker = this.state.markers[this.state.activeMarkerKey];
			return (
				<Marker
					key={1000}
					latitude={activeMarker.lat}
					longitude={activeMarker.lng}
					offsetLeft={0}
					offsetTop={0}
				>
					<div>
						<ScreenedPointInfo
							title={activeMarker.title}
							link={activeMarker.link}
							comment={activeMarker.comment}
							onSaveMarker={this.onSaveMarkerClick.bind(this)}
						/>
					</div>
				</Marker>
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
					//style={{ backgroundColor: "red", width: "8px", height: "8px" }}
					className="station"
					onClick={(e => this.onMarkerClick(e, markerData)).bind(this)}
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
