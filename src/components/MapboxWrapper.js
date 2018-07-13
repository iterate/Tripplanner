import React from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

const Map = ReactMapboxGl({
	accessToken:
		"pk.eyJ1IjoibmluYXRoOTMiLCJhIjoiY2pqaWlscDRsM3Q2aDNrcGxsaHQ1dG02NCJ9.7hwR--67HQrjo9MDxJ8HJQ"
});

class MapboxWrapper extends React.Component {
	componentDidMount() {
		//setup databse marker listener
		this.props.database.addMarkerListener(this.props.roomId, newVal =>
			this.showMarker(newVal)
		);
	}

	//just puts a marker on the map
	showMarker(marker) {
		console.log(marker);
	}

	//saves a marker to the database and adds it to the map
	addMarker(marker) {
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
				containerStyle={{
					height: "100vh",
					width: "100vw"
				}}
			>
				<Layer type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}>
					<Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
				</Layer>
			</Map>
		);
	}
}

export default MapboxWrapper;
