import React from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

const Map = ReactMapboxGl({
	accessToken:
		"pk.eyJ1IjoibmluYXRoOTMiLCJhIjoiY2pqaWlscDRsM3Q2aDNrcGxsaHQ1dG02NCJ9.7hwR--67HQrjo9MDxJ8HJQ"
});

class MapboxWrapper extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			markers: []
		};
		this.addMarker = this.addMarker.bind(this);
	}

	componentDidMount() {
		//setup databse marker listener
		this.props.database.addMarkerListener(this.props.roomId, newVal =>
			this.showMarker(newVal)
		);
	}

	//just puts a marker on the map
	showMarker(lnglat) {
		console.log(lnglat);

		this.setState({
			markers: [...this.state.markers, lngLat]
		});
	}

	//saves a marker to the database and adds it to the map
	addMarker(lngLat) {
		this.storeMarker(marker);
		this.showMarker(marker); //the marker will probably be showed again after its stored, might want to fox this
	}

	storeMarker(marker) {
		this.props.database.storeMarker(this.props.roomId, 0, 0, "tag");
	}

	render() {
		return (
			<Map
				style="mapbox://styles/mapbox/light-v9"
				zoom={[0]}
				onClick={(map, event) => this.addMarker(event.lngLat)}
				containerStyle={{
					height: "100vh",
					width: "100vw"
				}}
			>
				{this.state.markers.map(lngLat => (
					<Marker coordinates={lngLat} offset="0" anchor="bottom">
						<img
							src="https://image.flaticon.com/icons/png/512/33/33622.png"
							style={{ width: "20px" }}
						/>
					</Marker>
				))}
			</Map>
		);
	}
}

export default MapboxWrapper;
