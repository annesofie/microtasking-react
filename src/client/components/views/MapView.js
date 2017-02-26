import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup, LayerGroup, GeoJSON, LayersControl} from 'react-leaflet'

import markerIcon from '../assets/images/marker-icon.png';
import shadowIcon from '../assets/images/marker-shadow.png';


export default function(props){


	var position = [props.mapOptions.lat, props.mapOptions.lng];
	var customIcon = L.icon({
		iconUrl: markerIcon,
		shadowUrl: shadowIcon
	});
	var laygroup;
	if (props.taskmode == 1){
		 laygroup = <LayerGroup>
					<GeoJSON key={props.activeTaskObj1.id} data={props.activeTaskObj1} color="purple" onEachFeature={props.clickHandler1}/>
		</LayerGroup>;
	} else if (props.taskmode == 3) {
		laygroup = <LayerGroup>
			{props.activeTaskObj1.map(elem => {
				return (
					<GeoJSON key={elem.id} data={elem} onEachFeature={props.clickHandler1}/>
				)
			})}
		</LayerGroup>;
	} else {
		laygroup = <LayerGroup>
			{props.taskelements.features.map(elem => {
				return (
					<GeoJSON key={elem.id} data={elem} color="purple" onEachFeature={props.clickHandler2}/>
				)
			})}
		</LayerGroup>;
	}


	return (
		<div className="p-2 map-box">
			<Map
				center={position} zoom={props.mapOptions.zoom}>
				<TileLayer
					attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
				/>
			<LayersControl position='topright'>
				<LayersControl.Overlay name="Elements 1" checked={true}>
					{laygroup}
				</LayersControl.Overlay>
				<LayersControl.Overlay name="Elements 2" checked={true}>
					<LayerGroup>
						{props.conflictelements.features.map(elem => {
							return (
								<GeoJSON key={elem.id} data={elem} color="orange" onEachFeature={props.clickHandler2}/>
							)
						})}
					</LayerGroup>
				</LayersControl.Overlay>
			</LayersControl>
			</Map>
		</div>
	)
}

//ref={m => {props.leafletMap = m; }}

//MapContainer.propTypes = {
//	mapOptions: PropTypes.string
//};

//<p>{this.state.geom}</p>
//{props.geom}
