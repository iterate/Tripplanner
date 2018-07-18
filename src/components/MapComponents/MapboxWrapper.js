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
		mapRef: React.createRef(),
		markerEditbox: {
			title: "",
			link: "",
			comment: ""
		}
	};

	componentDidMount = () => {
		this.props.database.addMarkerCreatedListener(
			this.props.roomId,
			this.onMarkerLoadedFromDB
		);
		this.props.database.addMarkerChangedListener(
			this.props.roomId,
			this.updateMarkerInState
		);
		this.props.database.addMarkerRemovedListener(
			this.props.roomId,
			this.onMarkerRemovedInDB
		);
	};

	onMarkerLoadedFromDB = dbMarker => {
		this.pushMarkerToState(dbMarker, () => {
			this.state.lastMarkerCreatedKey === dbMarker.key &&
				this.setState({ activeMarkerKey: dbMarker.key });
		});
	};

	onMarkerRemovedInDB = dbMarker => {
		this.removeMarkerFromState(dbMarker.key);
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
		this.props.database.storeMarker(this.props.roomId, newMarker, newKey => {
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

	removeMarkerFromDb = markerKey => {
		this.props.database.removeMarker(this.props.roomId, markerKey);
	};

	pushMarkerToState = (data, callback) => {
		if (data.lng === undefined || data.lat === undefined) {
			console.error("lat and lang not given", data);
			return;
		}

		console.log("Marker added to state");
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
		this.setState(state => ({
			markers: { ...state.markers, [dbMarker.key]: dbMarker }
		}));
	};

	removeMarkerFromState = stateMarkerKey => {
		this.setState(state => {
			let markers = Object.assign({}, state.markers);
			delete markers[stateMarkerKey];
			this.setState({ markers });
		});
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
			activeMarkerKey: markerData.key,
			markerEditbox: {
				title: markerData.title,
				link: markerData.link,
				comment: markerData.comment
			}
		});
		console.log("New marker data", markerData.key);
	};

	onSaveMarkerClick(e, data) {
		Object.entries(data).forEach(
			() =>
				data ||
				console.error(
					"Data regestered on update marker click is invalid: ",
					data
				)
		);

		this.updateMarkerInDB(this.state.activeMarkerKey, data);
		//Tidenes ghettofix for at et nytt punkt ikke skal lages når man clicker:
		setTimeout(() => this.setState({ activeMarkerKey: null }), 300);

		e.preventDefault();
		e.stopPropagation();
	}

	onDeleteMarkerClick = e => {
		let removeMarkerWithKey = this.state.activeMarkerKey;

		setTimeout(() => {
			this.setState(
				{
					activeMarkerKey: null
				},
				() => this.removeMarkerFromDb(removeMarkerWithKey)
			);
		}, 300);
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
							title={this.state.markerEditbox.title}
							link={this.state.markerEditbox.link}
							comment={this.state.markerEditbox.comment}
							onTitleChange={(e =>
								this.setState({
									markerEditbox: {
										...this.state.markerEditbox,
										title: e.target.value
									}
								})).bind(this)}
							onLinkChange={(e =>
								this.setState({
									markerEditbox: {
										...this.state.markerEditbox,
										link: e.target.value
									}
								})).bind(this)}
							onCommentChange={(e =>
								this.setState({
									markerEditbox: {
										...this.state.markerEditbox,
										comment: e.target.value
									}
								})).bind(this)}
							onSaveMarker={this.onSaveMarkerClick.bind(this)}
							onDeleteMarkerClick={this.onDeleteMarkerClick.bind(this)}
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
				width={this.props.containerWidth}
				height={this.props.containerHeight}>
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
