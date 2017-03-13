/**
 * Created by AnneSofie on 28.02.2017.
 */

import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup, LayerGroup, GeoJSON} from 'react-leaflet'

//views
import MultipleTaskMapView from '../views/multipleTaskMapView'

export default class OneTaskMapComponent extends Component {

	constructor(props) {
		super(props);
		this.mapOptions = {
			lat: 63.4239779,
			lng: 10.4499185,
			zoom: 17
		};
		const x = Math.floor(Math.random() * ((4-1)+1));
		const y = Math.floor(Math.random() * ((4-1)+1));
		this.colormap1 = ['#3fe5e5', '#43cd80', '#63137a', '#8e374d'];
		this.colormap2 = ['#105576', '#2a7a13', '#63137a', '#e68e74'];
		this.colorPair = [this.colormap1[x], this.colormap2[y]];
		this.activelayer=null;
		this._clickEventHandler1 = this._clickEventHandler1.bind(this);
		this._clickEventHandler2 = this._clickEventHandler2.bind(this);
	}

	_clickEventHandler1(id, feature, layer) {
		layer.on('click', function(e) {
			if (this.activelayer && this.activelayer.feature.id == feature.id) {
				this.activelayer.setStyle({
					color: this.colorPair[1],
					weight: 4
				});
			}
			e.target.setStyle({
				color: 'blue',
				weight: 5
			});
			this.activelayer=e.target;
			this.props._setChosenBuildingLayer(e.target, id);
		}.bind(this));
	}

	_clickEventHandler2(id, feature, layer) {
		layer.on('click', function(e) {
			if (this.activelayer && this.activelayer.feature.id == feature.id) {
				this.activelayer.setStyle({
					color: this.colorPair[0],
					weight: 4
				});
			}
			e.target.setStyle({
				color: 'blue',
				weight: 5
			});
			this.activelayer=e.target;
			this.props._setChosenBuildingLayer(e.target, id);
		}.bind(this));
	}

	render() {
		return(
			<MultipleTaskMapView
				mapOptions={this.mapOptions}
				taskmode={this.props.elementsInTask}
				taskElemConflPair={this.props.taskElemConflPair}
				activeTaskObj1={this.props.activeTaskObj1}
				activeTaskObj2={this.props.activeTaskObj2}
				clickHandler1={this._clickEventHandler1}
				clickHandler2={this._clickEventHandler2}
				colorPair={this.colorPair}
			/>
		)
	}
}
