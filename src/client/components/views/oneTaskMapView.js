/**
 * Created by AnneSofie on 27.02.2017.
 */

import React, {Component} from 'react';
import { Map, TileLayer, Marker, Popup, LayerGroup, GeoJSON, LayersControl} from 'react-leaflet'

class OneTaskMapView extends Component {

	oneTaskElemLayerGroup() {
		return <LayerGroup>
			<GeoJSON key={'1'+this.props.taskElemConflPair.elem.id} data={this.props.taskElemConflPair.elem} color={this.props.colorPair[0]}
							 onEachFeature={this.props.clickHandler1.bind(this.props.taskElemConflPair.confl.id, id)}/>
		</LayerGroup>;
	}
	oneTaskConflLayerGroup() {
		return <LayerGroup>
			<GeoJSON key={'2'+this.props.taskElemConflPair.confl.id} data={this.props.taskElemConflPair.confl} color={this.props.colorPair[1]}
							 onEachFeature={this.props.clickHandler2.bind(this, this.props.taskElemConflPair.confl.id)}/>
		</LayerGroup>;
	}

	render() {
		var position = [this.props.mapOptions.lat, this.props.mapOptions.lng];
		var layer1 = this.oneTaskElemLayerGroup();
		var layer2 = this.oneTaskConflLayerGroup();
		return (
			<div className="p-2 map-box">
				<Map
					center={position} zoom={this.props.mapOptions.zoom}>
					<TileLayer
						attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
						url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
					/>
					<LayersControl position='topright' collapsed={false}>
						<LayersControl.Overlay key={'lco_elem_'+this.props.taskElemConflPair.elem.id} name={this.props.taskElemConflPair.elem.properties.title} checked={true}>
							{layer1}
						</LayersControl.Overlay>
						<LayersControl.Overlay key={'lco_confl_'+this.props.taskElemConflPair.confl.id} name={this.props.taskElemConflPair.confl.properties.title} checked={true}>
							{layer2}
						</LayersControl.Overlay>
					</LayersControl>
				</Map>
			</div>
		)
	}
}

export default OneTaskMapView;
