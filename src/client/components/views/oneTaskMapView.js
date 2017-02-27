/**
 * Created by AnneSofie on 27.02.2017.
 */

import React, {Component} from 'react';
import { Map, TileLayer, Marker, Popup, LayerGroup, GeoJSON, LayersControl} from 'react-leaflet'


class OneTaskMapView extends Component {

	//constructor(props){
	//	super(props);
	//	console.log(props);
	//	this.position = [props.mapOptions.lat, props.mapOptions.lng];
	//	//this.laygroup = null;
	//	//this.conflgroup = null;
	//}

	componentDidMount() {
		//this.oneTaskLayerControl()
	}

	oneTaskElemLayerGroup() {
		return <LayerGroup>
			<GeoJSON key='1' data={this.props.taskElemConflPair.elem} color="purple"
							 onEachFeature={this.props.clickHandler1}/>
		</LayerGroup>;
	}
	oneTaskConflLayerGroup() {
		return <LayerGroup>
			<GeoJSON key='2' data={this.props.taskElemConflPair.confl} color="orange"
							 onEachFeature={this.props.clickHandler2}/>
		</LayerGroup>;
	}

	render() {
		var position = [this.props.mapOptions.lat, this.props.mapOptions.lng];
		var layerElem = this.oneTaskElemLayerGroup();
		var layerConfl = this.oneTaskConflLayerGroup();
		return (
			<div className="p-2 map-box">
				<Map
					center={position} zoom={this.props.mapOptions.zoom}>
					<TileLayer
						attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
						url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
					/>
					<LayersControl position='topright'>
						<LayersControl.Overlay name="Overlay1" checked={true}>
							{layerElem}
						</LayersControl.Overlay>
						<LayersControl.Overlay name="Overlay2" checked={true}>
							{layerConfl}
						</LayersControl.Overlay>
					</LayersControl>
				</Map>
			</div>
		)
	}
}

export default OneTaskMapView;
