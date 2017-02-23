/**
 * Created by AnneSofie on 23.02.2017.
 */
import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup, LayerGroup, GeoJSON} from 'react-leaflet'
import * as taskApi from '../../api/task-api';

//View
import MapView from '../views/MapView'

export default class MapComponent extends Component {

	constructor(props) {
		super(props);
		this.mapOptions = {
			lat: 63.427029,
			lng: 10.396700,
			zoom: 13
		};
		this.state = {
			geom: [],
			taskelem1: []
		}
	}

	componentDidMount() {
		console.log(this.props);
	}

	render() {
		return (
			<MapView mapOptions={this.mapOptions} taskelements={this.props.taskelements} conflictelements={this.props.conflictelements}/>
		)
	}

}

//{...this.state}
