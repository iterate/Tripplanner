import React from 'react';
import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl';


const Map = ReactMapboxGl({
	accessToken: 'pk.eyJ1IjoibmluYXRoOTMiLCJhIjoiY2pqaWlscDRsM3Q2aDNrcGxsaHQ1dG02NCJ9.7hwR--67HQrjo9MDxJ8HJQ'
});

class MapboxWrapper extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			markers: []
		};
		this.addMarker = this.addMarker.bind(this);
	}

	addMarker(lngLat) {
		this.setState({
			markers: [...this.state.markers, lngLat]
		});
	}

	render() {
		return (
			<Map
				style="mapbox://styles/mapbox/light-v9"
				zoom={[0]}
				onClick= {(map, event) =>
					this.addMarker(event.lngLat)
				}
				containerStyle={{
					height: '100vh',
					width: '100vw'
				}}>
				{this.state.markers.map(lngLat =>
					<Marker
						coordinates={lngLat}
						offset="0"
						anchor="bottom">
						<img src="https://image.flaticon.com/icons/png/512/33/33622.png"
							style={{width:'20px'}}
						/>
					</Marker>
				)}
			</Map>
		);
	}
}

export default MapboxWrapper;
