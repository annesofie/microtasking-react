import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup, LayerGroup, GeoJSON} from 'react-leaflet'

import markerIcon from '../assets/images/marker-icon.png';
import shadowIcon from '../assets/images/marker-shadow.png';


export default function(props){


	var position = [props.mapOptions.lat, props.mapOptions.lng];
	var customIcon = L.icon({
		iconUrl: markerIcon,
		shadowUrl: shadowIcon
	});
	console.log(props);

	return (
		<div className="p-2 map-box">
			<Map center={position} zoom={props.mapOptions.zoom}>
				<TileLayer
					attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
				/>
				<Marker position={position} icon={customIcon}>
					<Popup>
						<span></span>
					</Popup>
				</Marker>
				{props.taskelements.features.map(elem => {
					return (
						<GeoJSON data={elem} color="purple"/>
					)
				})}
				{props.conflictelements.features.map(elem => {
					return (
						<GeoJSON data={elem} color="blue"/>
					)
				})}
			</Map>
		</div>
	)
}

//MapContainer.propTypes = {
//	mapOptions: PropTypes.string
//};

//<p>{this.state.geom}</p>
//{props.geom}
