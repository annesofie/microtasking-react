import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup, LayerGroup, GeoJSON, LayersControl} from 'react-leaflet'

import markerIcon from '../../assets/images/marker-icon.png';
import shadowIcon from '../../assets/images/marker-shadow.png';


export default function(props){


	var position = [props.mapOptions.lat, props.mapOptions.lng];
	var customIcon = L.icon({
		iconUrl: markerIcon,
		shadowUrl: shadowIcon
	});

	var laygroup;
	var conflgroup;
	var layersControlOverlay;
	if (props.taskmode == 1){
		laygroup = <LayerGroup>
			<GeoJSON key={props.activeTaskObj1.id} data={props.activeTaskObj1} color="purple" onEachFeature={props.clickHandler1}/>
		</LayerGroup>;
		conflgroup = <LayerGroup>
			<GeoJSON key={props.activeTaskObj2.id} data={props.activeTaskObj2} color="orange" onEachFeature={props.clickHandler2}/>
		</LayerGroup>
	//} else if (props.taskmode == 3) {
	//	layersControlOverlay = <LayersControl key="ksjdhaskj" position='topright'>{props.taskElemConflPair.map(elem => {
	//		return <LayersControl.Overlay key={'LCO'+elem.elem.properties.title} name={elem.elem.properties.title} checked={true}>
	//			<LayerGroup key={'lg'+elem.elem.properties.title}>
	//				<GeoJSON key={'0'+elem.elem.title} data={elem.elem} color="blue" onEachFeature={props.clickHandler1}/>
	//				<GeoJSON key={'1'+elem.confl.title} data={elem.confl} color="purple" onEachFeature={props.clickHandler1}/>
	//			</LayerGroup>
	//		</LayersControl.Overlay>;
	//	})}</LayersControl>
	} else {
		laygroup = <LayerGroup>
			{props.activeTaskObj1.map(elem => {
				return (
					<GeoJSON key={elem.id} data={elem} onEachFeature={props.clickHandler1}/>
				)
			})}
		</LayerGroup>;
		conflgroup = <LayerGroup>
			{props.activeTaskObj2.map(elem => {
				return (
					<GeoJSON key={elem.id} data={elem} color="orange" onEachFeature={props.clickHandler2}/>
				)
			})}
		</LayerGroup>;
	}
	var onetaskoverlay = <LayersControl position='topright'>
		<LayersControl.Overlay name="Overlay1" checked={true}>
			{laygroup}
		</LayersControl.Overlay>
		<LayersControl.Overlay name="Overlay2" checked={true}>
			{conflgroup}
		</LayersControl.Overlay>
	</LayersControl>;

	return (
		<div className="p-2 map-box">
			<Map
				center={position} zoom={props.mapOptions.zoom}>
				<TileLayer
					attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
				/>
				{onetaskoverlay}
			</Map>
		</div>
	)
}

