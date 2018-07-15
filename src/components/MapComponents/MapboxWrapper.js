import React from "react";
import ReactMapGL, {Marker} from 'react-map-gl';
import Dimensions from 'react-dimensions';
import Config from './config.json';
import MARKER_STYLE from './marker-style';


class MapboxWrapper extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			viewport: {
				width: this.props.containerWidth,
				height: this.props.containerHeight,
				latitude: 59.914344,
				longitude: 10.744033,
				zoom: 15
			},
			markers: []
		};
		this.clickHandler = this.clickHandler.bind(this);
	}

	componentDidMount() {
		this.props.database.addMarkerListener(this.props.roomId, this.updateMarkers);
	}

	updateMarkers(lngLat) {
		this.setState({
			markers: [...this.state.markers, lngLat]
		});
	}

	pushNewPointToDB(lngLat) {
		this.props.database.storeMarker(
			this.props.roomId,
			lngLat.lng,
			lngLat.lat,
			"tag"
		);
	}

	clickHandler(click_event) {
		this.pushNewPointToDB(click_event.lngLat);
	}

	renderMarker(lngLat, i) {
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

	render() {
		return (
			<ReactMapGL
				mapboxApiAccessToken={Config.accessToken}
				{...this.state.viewport}
				onViewportChange={(viewport) => this.setState({viewport})}
				onClick={this.clickHandler}>
				<style>{MARKER_STYLE}</style>
				{this.state.markers.map(this.renderMarker)}
			</ReactMapGL>
		);
	}
}

export default Dimensions()(MapboxWrapper);
