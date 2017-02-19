import React, { Component } from 'react'
//import L from 'leaflet';
//delete L.Icon.Default.prototype._getIconUrl;
//
//L.Icon.Default.mergeOptions({
//	iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//	iconUrl: require('leaflet/dist/images/marker-icon.png'),
//	shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
//});
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

export default class SimpleExample extends Component {
	state = {
		lat: 51.505,
		lng: -0.09,
		zoom: 13,
	}

	render () {
		const position = [this.state.lat, this.state.lng]
		return (
			<Map center={position} zoom={this.state.zoom}>
				<TileLayer
					attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
				/>
				<Marker position={position}>
					<Popup>
						<span>A pretty CSS3 popup. <br /> Easily customizable.</span>
					</Popup>
				</Marker>
			</Map>
		)
	}
}
