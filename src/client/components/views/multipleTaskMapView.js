/**
 * Created by AnneSofie on 27.02.2017.
 */

import React, {Component} from 'react';
import { Map, TileLayer, Marker, Popup, LayerGroup, GeoJSON, LayersControl} from 'react-leaflet'

class MultipleMapView extends Component {

	constructor(props) {
		super(props);

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
		let elemList=[];
		const base = this.props.activeTaskElements;
		Object.keys(base).map((elem, index) => {
			elemList[index] = this.oneTaskElemLayerGroup(base[index][0]);
		});
		return elemList;
	}
	getLayergroupConfl() {
		let conflList=[];
		const base = this.props.activeTaskElements;
		Object.keys(base).map((elem, index) => {
			conflList[index] = this.oneTaskConflLayerGroup(base[index][1]);
		});
		return conflList;
	}
	renderLayerControlOverlayElem() {
		const layerelem = this.getLayergroupElem();
		let layerControlOverlayList = [];
		layerelem.map((elem, index) => {
			layerControlOverlayList[index] = <LayersControl.Overlay key={'lco_elem_'+this.props.activeTaskElements[index][0].id} name={this.props.activeTaskElements[index][0].properties.title} checked={true}>
				{layerelem[index]}
			</LayersControl.Overlay>;
		});
		return layerControlOverlayList;
	}
	renderLayerControlOverlayConfl() {
		const layerconfl = this.getLayergroupConfl();
		let layerControlOverlayList = [];
		layerconfl.map((elem, index) => {
			layerControlOverlayList[index] = <LayersControl.Overlay key={'lco_confl_'+this.props.activeTaskElements[index][1].id} name={this.props.activeTaskElements[index][1].properties.title} checked={true}>
				{layerconfl[index]}
			</LayersControl.Overlay>;
		});
		return layerControlOverlayList;
	}

	render() {
		const position = [this.props.activeTaskElements[0][0].geometry.coordinates[0][0][0][1], this.props.activeTaskElements[0][0].geometry.coordinates[0][0][0][0]];
		const ortomap = 'https://waapi.webatlas.no/maptiles/tiles/webatlas-orto-newup/wa_grid/{z}/{x}/{y}.jpeg?APITOKEN=';
		const tileapikey = '2564333f-3201-4cee-adaf-d3beaf650208';
		const mapboxtile = 'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWF0aGlsZG8iLCJhIjoiY2lrdHZvMHdsMDAxMHdvbTR0MWZkY3FtaCJ9.u4bFYLBtEGNv4Qaa8Uaqzw';
		const layercontroloverlay1 = this.renderLayerControlOverlayElem();
		const layercontroloverlay2 = this.renderLayerControlOverlayConfl();
		return (
			<div className="map-box">
				<Map
					center={position} zoom={this.props.mapOptions.zoom}>
					<TileLayer
						url={ortomap+tileapikey}
						maxZoom={20}
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
