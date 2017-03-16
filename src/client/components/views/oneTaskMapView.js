/**
 * Created by AnneSofie on 27.02.2017.
 */

import React, {Component} from 'react';
import { Map, TileLayer, Marker, Popup, LayerGroup, GeoJSON, LayersControl} from 'react-leaflet'

class OneTaskMapView extends Component {

	oneTaskElemLayerGroup() {
		var base = this.props.activeTaskElements;
		return <LayerGroup>
			<GeoJSON key={'1'+base[0].id} data={base[0]} color={this.props.colorPair[0]}
							 onEachFeature={this.props.clickHandler1.bind(this, base[0].id)}/>
		</LayerGroup>;
	}
	oneTaskConflLayerGroup() {
		var base = this.props.activeTaskElements;
		return <LayerGroup>
			<GeoJSON key={'2'+base[1].id} data={base[1]} color={this.props.colorPair[1]}
							 onEachFeature={this.props.clickHandler2.bind(this, base[1].id)}/>
		</LayerGroup>;
	}

	render() {
		var position = [this.props.mapOptions.lat, this.props.mapOptions.lng];
		var ortomap = 'https://waapi.webatlas.no/maptiles/tiles/webatlas-orto-newup/wa_grid/{z}/{x}/{y}.jpeg?APITOKEN=';
		var tileapikey = '2564333f-3201-4cee-adaf-d3beaf650208';
		var mapboxtile = 'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWF0aGlsZG8iLCJhIjoiY2lrdHZvMHdsMDAxMHdvbTR0MWZkY3FtaCJ9.u4bFYLBtEGNv4Qaa8Uaqzw';

		var base = this.props.activeTaskElements;
		var layer1 = this.oneTaskElemLayerGroup();
		var layer2 = this.oneTaskConflLayerGroup();
		return (
			<div className="map-box">
				<Map
					center={position} zoom={this.props.mapOptions.zoom}>
					<TileLayer
						url={ortomap+tileapikey}
						maxZoom={20}
					/>
					<LayersControl position='topright' collapsed={false}>
						<LayersControl.Overlay key={'lco_elem_'+base[0].id} name={base[0].properties.title} checked={true}>
							{layer1}
						</LayersControl.Overlay>
						<LayersControl.Overlay key={'lco_confl_'+base[0].id} name={base[1].properties.title} checked={true}>
							{layer2}
						</LayersControl.Overlay>
					</LayersControl>
				</Map>
			</div>
		)
	}
}

export default OneTaskMapView;
