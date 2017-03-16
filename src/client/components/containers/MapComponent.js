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
import MultipleTaskMapComp from './MultipleTaskMapComponent';

export default class MapComponent extends Component {

	constructor(props) {
		super(props);
		this._setChosenBuildingLayer = this._setChosenBuildingLayer.bind(this);
	}

	_setChosenBuildingLayer(lay, id) {
		this.props._setChosenBuildingGeom(lay, id);
	}

	render() {
		if (this.props.elementsInTask == 1){
			return (
					<OneTaskMapComp
						//taskElemConflPair={this.props.taskElemConflPair}
						activeTaskElements={this.props.activeTaskElements}
						_setChosenBuildingLayer={this._setChosenBuildingLayer}
					/>
			);
		} else {
			return (
					<MultipleTaskMapComp
						//taskElemConflPair={this.props.taskElemConflPair}
						//activeTaskObj1={this.props.activeTaskObj1}
						//activeTaskObj2={this.props.activeTaskObj2}
						activeTaskElements={this.props.activeTaskElements}
						_setChosenBuildingLayer={this._setChosenBuildingLayer}
					/>
			)
		}
	}

}

