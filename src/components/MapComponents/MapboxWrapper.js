import React from "react";
import ReactMapGL, {Marker} from 'react-map-gl';
import Dimensions from 'react-dimensions';
import Config from './config.json';
import MARKER_STYLE from './marker-style';
import Geocoder from './Geocoder';


class MapboxWrapper extends React.Component {
	state = {
		viewport: {
			width: this.props.containerWidth,
			height: this.props.containerHeight,
			latitude: 59.914344,
			longitude: 10.744033,
			zoom: 1
		},
		markers: [],
		mapRef: React.createRef()
	};

	componentDidMount  = () => {
		this.props.database.addMarkerListener(this.props.roomId, this.updateMarkers);
	}

	updateMarkers = (coordinate) => {
		this.setState({
			markers: [...this.state.markers, [coordinate.lng, coordinate.lat]]
		});
	}

	pushNewPointToDB = (lngLat) => {
		let marker_data = {
			lng: lngLat[0],
			lat: lngLat[1]
		};
		this.props.database.storeMarker(this.props.roomId, marker_data);
	}

	clickHandler = (click_event) => {
		this.pushNewPointToDB(click_event.lngLat);
	}

	viewportHandler = (viewport) => {
		this.setState({
			viewport: {...this.state.viewport, ...viewport}
		});
	}

	renderMarker = (lngLat, i) => {
		if (lngLat[0] == null || lngLat[1] == null) {
			console.error('undefined lngLat in MapboxWrapper.renderMarker()', lngLat);
			return;
		}
		return (
			<Marker
				key={i}
				latitude={lngLat[1]}
				longitude={lngLat[0]}
				offsetLeft={0}
				offsetTop={0}>
				<div id={i} className='station'>
					<img
						src="https://placekitten.com/g/200/200"
						style={{ width: '20px' }}
					/>
				</div>
			</Marker>
		);
	}

	render = () => {
		return (
			<ReactMapGL
				ref={this.state.mapRef}
				mapboxApiAccessToken={Config.accessToken}
				{...this.state.viewport}
				onViewportChange={this.viewportHandler}
				onClick={this.clickHandler}>
				<style>{MARKER_STYLE}</style>
				{this.state.markers.map(this.renderMarker)}
				<Geocoder
					mapRef={this.state.mapRef}
					onViewportChange={this.viewportHandler}
					mapboxApiAccessToken={Config.accessToken} />
			</ReactMapGL>
		);
	}
}

export default Dimensions()(MapboxWrapper);
