/**
 * Created by AnneSofie on 27.02.2017.
 */

import React, {Component} from 'react';
import { Map, TileLayer, Marker, Popup, LayerGroup, GeoJSON, LayersControl} from 'react-leaflet'

class MultipleMapView extends Component {

	constructor(props) {
		super(props);
		this.num1=0;
		this.num2=0;

		this.getLayergroupConfl = this.getLayergroupConfl.bind(this);
		this.getLayergroupElem = this.getLayergroupElem.bind(this);
	}

	oneTaskElemLayerGroup(elem) {
		return <LayerGroup>
			<GeoJSON key={'1'+elem.id} data={elem} color={this.props.colorPair[0]}
							 onEachFeature={this.props.clickHandler1.bind(this, elem.id)}/>
		</LayerGroup>;
	}
	oneTaskConflLayerGroup(confl) {
		return <LayerGroup>
			<GeoJSON key={'2'+confl.id} data={confl} color={this.props.colorPair[1]}
							 onEachFeature={this.props.clickHandler2.bind(this, confl.id)}/>
		</LayerGroup>;
	}
	getLayergroupElem() {
		var elemList=[];
		this.props.activeTaskObj1.map((elem, index) => {
			elemList[index] = this.oneTaskElemLayerGroup(elem);
		});
		return elemList;
	}
	getLayergroupConfl() {
		var conflList=[];
		this.props.activeTaskObj2.map((confl, index) => {
			conflList[index] = this.oneTaskConflLayerGroup(confl);
		});
		return conflList;
	}
	renderLayerControlOverlayElem() {
		var layerelem = this.getLayergroupElem();
		var layerControlOverlayList = [];
		layerelem.map((elem, index) => {
			layerControlOverlayList[index] = <LayersControl.Overlay key={'lco_elem_'+this.props.activeTaskObj1[index].id} name={this.props.activeTaskObj1[index].properties.title} checked={true}>
				{layerelem[index]}
			</LayersControl.Overlay>;
		});
		return layerControlOverlayList;
	}
	renderLayerControlOverlayConfl() {
		var layerconfl = this.getLayergroupConfl();
		var layerControlOverlayList = [];
		layerconfl.map((elem, index) => {
			layerControlOverlayList[index] = <LayersControl.Overlay key={'lco_confl_'+this.props.activeTaskObj2[index].id} name={this.props.activeTaskObj2[index].properties.title} checked={true}>
				{layerconfl[index]}
			</LayersControl.Overlay>;
		});
		return layerControlOverlayList;
	}


	render() {
		var position = [this.props.mapOptions.lat, this.props.mapOptions.lng];
		var layercontroloverlay1 = this.renderLayerControlOverlayElem();
		var layercontroloverlay2 = this.renderLayerControlOverlayConfl();
		return (
			<div className="map-box">
				<Map
					center={position} zoom={this.props.mapOptions.zoom}>
					<TileLayer
						attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
						url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
					/>
					{layercontroloverlay1.map((elem, index) => {
						return <LayersControl key={index} position='topright' collapsed={false}>
							{layercontroloverlay1[index]}
							{layercontroloverlay2[index]}
						</LayersControl>;
					})}
				</Map>
			</div>
		)
	}
}

export default MultipleMapView;
