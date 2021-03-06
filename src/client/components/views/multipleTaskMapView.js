/**
 * Created by AnneSofie on 27.02.2017.
 */

import React, {Component} from 'react';
import LeafletControl from 'react-leaflet-control';
import { Map, TileLayer, Marker, Popup, LayerGroup, GeoJSON, LayersControl} from 'react-leaflet';

class MultipleMapView extends Component {

	constructor(props) {
		super(props);

		this.getLayergroupConfl = this.getLayergroupConfl.bind(this);
		this.getLayergroupElem = this.getLayergroupElem.bind(this);
	}


	oneTaskElemLayerGroup(elem) {
		return <LayerGroup color="blue">
			<GeoJSON key={'1'+elem.id} data={elem} color={elem.properties.buildingColor}
							 onEachFeature={this.props.clickHandler1.bind(this, elem.id)}/>
		</LayerGroup>;
	}
	oneTaskConflLayerGroup(confl) {
		return <LayerGroup color="purple">
			<GeoJSON key={'2'+confl.id} data={confl} color={confl.properties.buildingColor}
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
		let layerControlOverlayList2 = [];
		layerelem.map((elem, index) => {
			let build = this.props.activeTaskElements[index][0];
			let layerkeyname = '<span style=color:'+build.properties.buildingColor+'>'+build.properties.buildingName + ' ' + build.properties.title+'</span>';
			layerControlOverlayList[index] = <LayersControl.Overlay className="layercontrol0" key={'lco_elem_'+build.id} name={layerkeyname} checked={true} >
				{layerelem[index]}
			</LayersControl.Overlay>;

			layerControlOverlayList2[index] = <label>
				<div>
					<input type="checkbox" className="leaflet-control-layers-selector"/>
					<span><p style={{color: build.properties.buildingColor}}>{build.properties.buildingName} {build.properties.title}</p></span>
				</div>
			</label>
		});
		return layerControlOverlayList;
	}
	renderLayerControlOverlayConfl() {
		const layerconfl = this.getLayergroupConfl();
		let layerControlOverlayList = [];
		let layerControlOverlayList2 = [];
		layerconfl.map((elem, index) => {
			let build = this.props.activeTaskElements[index][1];
			let layerkeyname = '<span style=color:'+build.properties.buildingColor+'>'+build.properties.buildingName + ' ' + build.properties.title+'</span>';
			layerControlOverlayList[index] = <LayersControl.Overlay className="layercontrol1" key={'lco_confl_'+this.props.activeTaskElements[index][1].id} name={layerkeyname} checked={true} >
				{layerconfl[index]}
			</LayersControl.Overlay>;

			layerControlOverlayList2[index] = <label>
				<div>
					<input type="checkbox" className="leaflet-control-layers-selector"/>
					<span><p style={{color: build.properties.buildingColor}}>{build.properties.buildingName} {build.properties.title}</p></span>
				</div>
			</label>
		});
		return layerControlOverlayList;
	}

	render() {
		const position = [this.props.activeTaskElements[0][0].geometry.coordinates[0][0][0][1], this.props.activeTaskElements[0][0].geometry.coordinates[0][0][0][0]];
		const ortomap = 'https://waapi.webatlas.no/maptiles/tiles/webatlas-orto-newup/wa_grid/{z}/{x}/{y}.jpeg?APITOKEN=';
		const tileapikey = '2564333f-3201-4cee-adaf-d3beaf650208';
		const mapboxtile = 'https://api.mapbox.com/styles/v1/aserichs/cj14qe14u001k2ro16zbjcwkc/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYXNlcmljaHMiLCJhIjoicWJQd3JTayJ9.HwayzXsujmebUczPif8uig';
		const layercontroloverlay1 = this.renderLayerControlOverlayElem();
		const layercontroloverlay2 = this.renderLayerControlOverlayConfl();
		return (
			<div className="map-box">
				<Map
					center={position} zoom={this.props.mapOptions.zoom}>
					<TileLayer
						url={mapboxtile}
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

					//<LeafletControl position="bottomleft">
					//	<div className="map-legend">
					//		<h5 style={{color: this.props.colorPair[0]}}>Shape 1</h5>
					//		<h5 style={{color: this.props.colorPair[1]}}>Shape 2</h5>
					//	</div>
					//</LeafletControl>
export default MultipleMapView;
