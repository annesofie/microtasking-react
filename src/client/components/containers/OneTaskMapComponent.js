/**
 * Created by AnneSofie on 27.02.2017.
 */

import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup, LayerGroup, GeoJSON} from 'react-leaflet'

//views
import OneTaskMapView from '../views/oneTaskMapView'

export default class OneTaskMapComponent extends Component {

	constructor(props) {
		super(props);
		this.mapOptions = {
			lat: 63.4239779,
			lng: 10.4499185,
			zoom: 17
		};
		this.activelayer=null;
		this._clickEventHandler1 = this._clickEventHandler1.bind(this);
		this._clickEventHandler2 = this._clickEventHandler2.bind(this);
	}

	_clickEventHandler1(id, feature, layer) {
		layer.on('click', function(e) {
			if (this.activelayer && this.activelayer !== e.target) {
				this.props._changeEnableBtnState(false);
				this.activelayer.setStyle({
					color: this.activelayer.feature.properties.buildingColor,
					weight: 4
				});
			}
			e.target.setStyle({
				color: e.target.options.color,
				weight: 7
			});
			this.activelayer=e.target;
			this.props._setChosenBuildingLayer(e.target, id);
		}.bind(this));
	}

	_clickEventHandler2(id, feature, layer) {
		layer.on('click', function(e) {
			if (this.activelayer && this.activelayer !== e.target) {
				this.props._changeEnableBtnState(false);
				this.activelayer.setStyle({
					color: this.activelayer.feature.properties.buildingColor,
					weight: 4
				});
			}
			e.target.setStyle({
				color: e.target.options.color,
				weight: 7
			});
			this.activelayer=e.target;
			this.props._setChosenBuildingLayer(e.target, id);
		}.bind(this));
	}

	render() {
		return(
			<OneTaskMapView
				mapOptions={this.mapOptions}
				activeTaskElements={this.props.activeTaskElements}
				clickHandler1={this._clickEventHandler1}
				clickHandler2={this._clickEventHandler2}
			/>
		)
	}
}
