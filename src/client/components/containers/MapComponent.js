/**
 * Created by AnneSofie on 23.02.2017.
 */
import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup, LayerGroup, GeoJSON} from 'react-leaflet'
import * as taskApi from '../../api/task-api';

//View
import MapView from '../views/MapView';
import dialogBox from '../views/layerDialogBox';

export default class MapComponent extends Component {

	constructor(props) {
		super(props);
		this.mapOptions = {
			lat: 63.422492,
			lng: 10.398127,
			zoom: 18
		};
		this.activelayer=null;
		this._clickEventHandler1 = this._clickEventHandler1.bind(this);
		this._clickEventHandler2 = this._clickEventHandler2.bind(this);
	}

	componentDidMount() {
		//const leafletMap = this.leafletMap.leafletElement;
		//console.log(this.props.task);
	}

	_clickEventHandler1(feature, layer) {
			layer.on('click', function(e) {
				if (this.activelayer) {
					this.activelayer.setStyle({
						color: 'purple',
						weight: 4
					});
				}
				e.target.setStyle({
					color: '#32bc4c',
					weight: 5
				});
				this.activelayer=e.target;
				this.props.setChosenGeomLayer(this.activelayer);
			}.bind(this));
	}

	_clickEventHandler2(feature, layer) {
		layer.on('click', function(e) {
			if (this.activelayer) {
				this.activelayer.setStyle({
					color: 'purple',
					weight: 4
				});
			}
			e.target.setStyle({
				color: '#32bc4c',
				weight: 5
			});
			this.activelayer=e.target;
			this.props.setChosenGeomLayer(this.activelayer);
		}.bind(this));
	}


render() {
			return (
				<MapView mapOptions={this.mapOptions}
								 taskmode={this.props.taskmode}
								 taskelements={this.props.taskelements}
								 conflictelements={this.props.conflictelements}
								 activeTaskObj={this.props.activeTaskObj}
								 clickHandler1={this._clickEventHandler1}
								 clickHandler2={this._clickEventHandler2}

				/>
			)
	}

}

//{...this.state}
