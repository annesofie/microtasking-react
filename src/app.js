/**
 * Created by AnneSofie on 23.02.2017.
 */

import React, {Component} from 'react';
import { browserHistory, Router, Route, Link, IndexRoute, hashHistory } from 'react-router'
import { Map, TileLayer, Marker, Popup, LayerGroup, GeoJSON} from 'react-leaflet'

import * as taskApi from './client/api/task-api';

//Views
import Home from './client/components/HeaderComponent';
import TaskBoxView from './client/components/views/TaskBoxView';
import MapContainer from './client/components/containers/MapComponent';

export default class extends Component {

	constructor() {
		super();
		this.state = {
			mode: 'home',
			user: [],
			taskid: Math.floor(Math.random() * ((8-6)+1) + 6),
			taskmode: 0,
			task: [],
			elements: [],
			conflicts: [],
			activeTaskObj: null,
			chosenGeomLayer: null
		};
		this.num=0;
		this._handleModeChange = this._handleModeChange.bind(this);
		this._getNextTask = this._getNextTask.bind(this);
		this._setChosenGeom = this._setChosenGeom.bind(this);
		this._handleTaskMode = this._handleTaskMode.bind(this);
	}

	componentDidMount() {
		taskApi.getElementsInTask(this.state.taskid).then(elem => {
			this.setState({elements: elem});
		});
		taskApi.getConflictsInTask(this.state.taskid).then(elem => {
			this.setState({conflicts: elem});
		});
		taskApi.getTask(this.state.taskid).then(elem => {
			this.setState({task: elem});
			this.setState({taskmode: elem.num_of_elements});
		});
	}

	_handleModeChange() {
		if(this.state.mode === 'home'){
			console.log('modeChange');
			this._handleTaskMode();
			this.setState({mode: 'taskview'});
		}
	}

	_setChosenGeom(layer) {
		this.setState({chosenGeomLayer: layer});
	}

	_handleTaskMode() {
		console.log(this.state.taskmode);
		if (this.state.taskmode == 1) {
			this.setState({activeTaskObj: this.state.elements.features[this.num]});
			this.num += 1;
		} else if (this.state.taskmode == 3) {
			this.setState({activeTaskObj: this.state.elements.features.slice(1, 4)});
			this.num += 3;
		} else{
			//use all
		}
	}

	_getNextTask() {

	}

	render() {
		if (this.state.mode === 'home') {
			return (
				<Home onClick={this._handleModeChange}/>
			)
		} else if (this.state.mode === 'taskview') {
			return (
				<div className="d-flex">
					<TaskBoxView task={this.state.task}
											 taskmode={this.state.taskmode}
											 taskelements={this.state.elements}
											 conflictelements={this.state.conflicts}
											 activeTaskObj={this.state.activeTaskObj}
											 chosenGeomLayer={this.state.chosenGeomLayer}
					/>
					<div className="mapbox">
						<MapContainer task={this.state.task}
													taskmode={this.state.taskmode}
													taskelements={this.state.elements}
													conflictelements={this.state.conflicts}
													activeTaskObj={this.state.activeTaskObj}
													setChosenGeomLayer={this._setChosenGeom}
						/>
					</div>
				</div>
			)
		}
	}
}
