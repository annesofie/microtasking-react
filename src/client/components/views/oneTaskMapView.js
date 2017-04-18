/**
 * Created by AnneSofie on 27.02.2017.
 */

import React, {Component} from 'react';
import LeafletControl from 'react-leaflet-control';
import { Map, TileLayer, Marker, Popup, LayerGroup, GeoJSON, LayersControl} from 'react-leaflet'

class OneTaskMapView extends Component {

	oneTaskElemLayerGroup() {
		const base = this.props.activeTaskElements;
		return <LayerGroup>
			<GeoJSON key={'1'+base[0].id} data={base[0]} color={this.props.colorPair[0]}
							 onEachFeature={this.props.clickHandler1.bind(this, base[0].id)}/>
		</LayerGroup>;
	}
	oneTaskConflLayerGroup() {
		const base = this.props.activeTaskElements;
		return <LayerGroup>
			<GeoJSON key={'2'+base[1].id} data={base[1]} color={this.props.colorPair[1]}
							 onEachFeature={this.props.clickHandler2.bind(this, base[1].id)}/>
		</LayerGroup>;
	}

	render() {
		console.log(this.props.activeTaskElements);
		const position = [this.props.activeTaskElements[0].geometry.coordinates[0][0][0][1], this.props.activeTaskElements[0].geometry.coordinates[0][0][0][0]];
		const ortomap = 'https://waapi.webatlas.no/maptiles/tiles/webatlas-orto-newup/wa_grid/{z}/{x}/{y}.jpeg?APITOKEN=';
		const tileapikey = '2564333f-3201-4cee-adaf-d3beaf650208';
		const mapboxtile = 'https://api.mapbox.com/styles/v1/aserichs/cj14qe14u001k2ro16zbjcwkc/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYXNlcmljaHMiLCJhIjoicWJQd3JTayJ9.HwayzXsujmebUczPif8uig';
		const base = this.props.activeTaskElements;
		const layer1 = this.oneTaskElemLayerGroup();
		const layer2 = this.oneTaskConflLayerGroup();

		return (
			<div className="map-box">
				<Map
					center={position} zoom={this.props.mapOptions.zoom}
				>
					<TileLayer
						url={mapboxtile}
						maxZoom={20}
					/>
					<LayersControl position='topright' collapsed={false}>
						<LayersControl.Overlay key={'lco_elem_'+base[0].id} name={base[0].properties.buildingName+' '+base[0].properties.title} checked={true}>
							{layer1}
						</LayersControl.Overlay>
						<LayersControl.Overlay key={'lco_confl_'+base[0].id} name={base[1].properties.buildingName+' '+base[1].properties.title} checked={true}>
							{layer2}
						</LayersControl.Overlay>
					</LayersControl>
					<LeafletControl position="bottomleft">
						<div className="map-legend">
							<h5 style={{color: this.props.colorPair[0]}}>Shape 1</h5>
							<h5 style={{color: this.props.colorPair[1]}}>Shape 2</h5>
						</div>
					</LeafletControl>
				</Map>
			</div>
		)
	}
}

export default OneTaskMapView;
