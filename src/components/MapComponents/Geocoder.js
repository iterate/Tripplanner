/***************************************************************
* Source: https://github.com/SamSamskies/react-map-gl-geocoder *
***************************************************************/

import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { Component } from 'react';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { FlyToInterpolator } from 'react-map-gl';

class Geocoder extends Component {
	componentDidMount() {
		this.forceUpdate();
	}

	componentDidUpdate() {
		if (this.geocoder !== undefined) {
			return;
		}

		const { mapRef, onViewportChange, mapboxApiAccessToken, options } = this.props;

		this.geocoder = new MapboxGeocoder({ accessToken: mapboxApiAccessToken, ...options });
		this.geocoder.on('result', ({ result }) => {
			const [longitude, latitude] = result.center;

			if (this.geocoder.options.flyTo) {
				onViewportChange({
					longitude,
					latitude,
					transitionInterpolator: new FlyToInterpolator(),
					transitionDuration: 3000
				});
				this.props.jumpHandler(latitude, longitude);
			} else {
				onViewportChange({ longitude, latitude });
			}
		});

		mapRef.current.getMap().addControl(this.geocoder);
	}

	getGeocoder() {
		return this.geocoder;
	}

	render() {
		return null;
	}

}

export default Geocoder;
