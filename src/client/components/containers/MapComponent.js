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
						activeTaskElements={this.props.activeTaskElements}
						_setChosenBuildingLayer={this._setChosenBuildingLayer}
						_changeEnableBtnState={this.props._changeEnableBtnState}
					/>
			);
		} else {
			return (
					<MultipleTaskMapComp
						activeTaskElements={this.props.activeTaskElements}
						_setChosenBuildingLayer={this._setChosenBuildingLayer}
						_changeEnableBtnState={this.props._changeEnableBtnState}
					/>
			)
		}
	}

}

