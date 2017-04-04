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
		this.colormap2 = ['#105576', '#2a7a13', '#7A555D', '#e68e74'];
		this.colorPair = [this.colormap1[x], this.colormap2[y]];
		this.activelayer=[];
		this._clickEventHandler1 = this._clickEventHandler1.bind(this);
		this._clickEventHandler2 = this._clickEventHandler2.bind(this);
	}

	_clickEventHandler1(id, feature, layer) {
		layer.on('click', function(e) {
			const buildingNr = e.target.feature.properties.building_nr;
			if (this.activelayer[buildingNr]) {  //if building already been selected
				this.props._changeEnableBtnState(false);
				if (this.activelayer[buildingNr] !== e.target) { //pressed the other layer
					//console.log('the other layer is pressed');
					this.activelayer[buildingNr].setStyle({
						color: this.colorPair[1],
						weight: 4
					})
				}
			}
			e.target.setStyle({
				color: e.target.options.color,
				weight: 7
			});
			this.activelayer[buildingNr]=e.target;
			this.props._setChosenBuildingLayer(e.target, id);
		}.bind(this));
	}

	_clickEventHandler2(id, feature, layer) {
		layer.on('click', function(e) {
			const buildingNr = e.target.feature.properties.building_nr;
			if (this.activelayer[buildingNr]) { //if building already been selected
				this.props._changeEnableBtnState(false);
				if (this.activelayer[buildingNr] !== e.target) { //pressed the other layer
					this.activelayer[buildingNr].setStyle({
						color: this.colorPair[0],
						weight: 4
					})
				}
			}
			e.target.setStyle({
				color: e.target.options.color,
				weight: 7
			});
			this.activelayer[buildingNr]=e.target;
			this.props._setChosenBuildingLayer(e.target, id);
		}.bind(this));
	}

	render() {
		return(
			<MultipleTaskMapView
				mapOptions={this.mapOptions}
				taskElemConflPair={this.props.taskElemConflPair}
				activeTaskElements={this.props.activeTaskElements}
				clickHandler1={this._clickEventHandler1}
				clickHandler2={this._clickEventHandler2}
				colorPair={this.colorPair}
			/>
		)
	}
}
