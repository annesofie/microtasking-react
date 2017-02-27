/**
 * Created by AnneSofie on 23.02.2017.
 */
import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup, LayerGroup, GeoJSON} from 'react-leaflet'
import * as taskApi from '../../api/task-api';

//View
//import OneTaskMapView from '../views/oneTaskMapView';
//Component
import OneTaskMapComp from './OneTaskMapComponent';

export default class MapComponent extends Component {

	constructor(props) {
		super(props);
		console.log(props);
		//this._clickEventHandler1 = this._clickEventHandler1.bind(this);
		//this._clickEventHandler2 = this._clickEventHandler2.bind(this);
		this._setChosenBuildingLayer = this._setChosenBuildingLayer.bind(this);
	}

	componentDidMount() {
		//const leafletMap = this.leafletMap.leafletElement;
		//console.log(this.props.task);
	}

	_setChosenBuildingLayer(lay) {
		console.log(lay.feature.properties.building_nr);
		if (lay.feature.properties.building_nr == 1){
			this.props._setChosenGeomB1(lay);
		}
		//else if (lay.feature.properties.building_nr == 2){
		//	this.props._setChosenGeomB2(lay);
		//} else if (lay.feature.properties.building_nr == 3){
		//	this.props._setChosenGeomB3(lay);
		//}
	}

	render() {
		if (this.props.taskmode == 1){
			return (
				<OneTaskMapComp
					taskmode={this.props.taskmode}
					taskElemConflPair={this.props.taskElemConflPair}
					_setChosenBuildingLayer={this._setChosenBuildingLayer}
				/>
			);
		}
	}

}
				 //_setChosenGeomB1={this.props._setChosenGeomB1}
				 //_setChosenGeomB2={this.props._setChosenGeomB2}
				 //_setChosenGeomB3={this.props._setChosenGeomB3}

//{...this.state}
