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
		this._setChosenBuildingLayer = this._setChosenBuildingLayer.bind(this);
	}

	_setChosenBuildingLayer(lay) {
		this.props._setChosenBuildingGeom(lay);
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

//{...this.state}
