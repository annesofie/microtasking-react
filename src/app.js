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
		var idx = 1;
		var idy = 3;
		super();
		this.state = {
			mode: 'home',
			user: [],
			taskid: Math.floor(Math.random() * ((idy-idx)+1) + idx),
			taskmode: 0,
			task: [],
			elements: [],
			conflicts: [],
			activeTaskObj1: null,
			activeTaskObj2: null,
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

	_handleModeChange(mode) {
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
			this.setState({activeTaskObj1: this.state.elements.features[this.num]});
			this.setState({activeTaskObj2: this.state.conflicts.features[this.num]});
			this.num += 1;
		} else if (this.state.taskmode == 3) {
			this.setState({activeTaskObj1: this.state.elements.features.slice(1, 4)});
			this.setState({activeTaskObj2: this.state.conflicts.features.slice(1, 4)});
			this.num += 3;
		} else{
			//use all
			this.setState({activeTaskObj1: this.state.elements.features});
			this.setState({activeTaskObj2: this.state.conflicts.features});
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
											 activeTaskObj1={this.state.activeTaskObj1}
											 activeTaskObj2={this.state.activeTaskObj2}
											 chosenGeomLayer={this.state.chosenGeomLayer}
					/>
					<div className="mapbox">
						<MapContainer task={this.state.task}
													taskmode={this.state.taskmode}
													taskelements={this.state.elements}
													conflictelements={this.state.conflicts}
													activeTaskObj={this.state.activeTaskObj1}
													activeTaskObj2={this.state.activeTaskObj2}
													_setChosenGeomLayer={this._setChosenGeom}
						/>
					</div>
				</div>
			)
		}
	}
}
