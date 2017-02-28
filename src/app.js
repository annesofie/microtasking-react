/**
 * Created by AnneSofie on 23.02.2017.
 */

import React, {Component} from 'react';
import { browserHistory, Router, Route, Link, IndexRoute, hashHistory } from 'react-router'
import { Map, TileLayer, Marker, Popup, LayerGroup, GeoJSON} from 'react-leaflet'

import * as taskApi from './client/api/task-api';

//Views
import Home from './client/components/HeaderComponent';
import TaskBoxComponent from './client/components/containers/TaskBoxComponent';
import MapContainer from './client/components/containers/MapComponent';

export default class extends Component {
//Math.floor(Math.random() * ((idy-idx)+1) + idx)
	constructor() {
		var idx = 1;
		var idy = 3;
		super();
		this.state = {
			mode: 'home',
			user: [],
			taskid: 2,
			taskmode: 0,
			task: [],
			elements: [],
			conflicts: [],
			activeTaskObj1: null,
			activeTaskObj2: null,
			taskElemConflPair: null,
			chosenBuildingGeom: []
		};

		this.chosenGeomLayer={};
		this.chosenMetadata={};
		this.num=0;

		this._handleModeChange = this._handleModeChange.bind(this);
		this._getNextTask = this._getNextTask.bind(this);
		this._setChosenBuildingGeom = this._setChosenBuildingGeom.bind(this);
		this._setChosenMetadata = this._setChosenMetadata.bind(this);
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
	_setChosenBuildingGeom(layer, id) {
		this.chosenGeomLayer[id]=layer.feature;
		this.setState({chosenBuildingGeom: this.chosenGeomLayer});
	}
	_setChosenMetadata(obj) {
		this.chosenMetadata[this.num]=obj;
		console.log(this.chosenMetadata);
	}
	_handleModeChange(mode) {
		if(this.state.mode === 'home'){
			this._handleTaskMode(function(str) {
				this.setState({mode: 'taskview'});
			}.bind(this));
		}
	}
	_handleTaskMode(callback) {
		const base1 = this.state.elements.features;
		const base2 = this.state.conflicts.features;
		if (this.state.taskmode == 1) {
			getallTaskElemConflElemPairs(base1[this.num], true, function(resp) {
				this.setState({taskElemConflPair: resp});
				this.num += 1;
				callback('done');
			}.bind(this));
		} else if (this.state.taskmode == 3) {
			getallTaskElemConflElemPairs(base1.slice(0,3), false, function(taskPairs) {
				this.setState({taskElemConflPair: taskPairs});
				this.setState({activeTaskObj1: base1.slice(0, 3)});
				this.setState({activeTaskObj2: base2.slice(0, 3)});
				this.num += 3;
				callback('done');
			}.bind(this));
		} else{
			//use all
			getallTaskElemConflElemPairs(base1, false, function(taskPairs) {
				this.setState({taskElemConflPair: taskPairs});
				this.setState({activeTaskObj1: base1});
				this.setState({activeTaskObj2: base2});
				callback('done');
			}.bind(this));
		}
	}
	_getNextTask() {
		console.log(this.num);
		const base1 = this.state.elements.features;
		const base2 = this.state.conflicts.features;
		if (this.state.taskmode == 1) {
			this.setState({chosenBuildingGeom: []});
			getallTaskElemConflElemPairs(base1[this.num], true, function(resp) {
				this.setState({taskElemConflPair: resp});
				this.num += 1;
			}.bind(this));
		} else if (this.state.taskmode == 3) {
			this.setState({chosenBuildingGeom: []});
			getallTaskElemConflElemPairs(base1.slice(this.num, this.num+2), false, function(resp) {
				this.setState({taskElemConflPair: resp});
				this.setState({activeTaskObj1: base1.slice(this.num, this.num+2)});
				this.setState({activeTaskObj2: base2.slice(this.num, this.num+2)});
				this.num += 3;
			}.bind(this));
		}

	}

	render() {
		if (this.state.mode === 'home') {
			return (
				<Home onClick={this._handleModeChange}/>
			)
		} else if (this.state.mode === 'taskview') {
			return (
				<div className="d-flex">
					<TaskBoxComponent task={this.state.task}
														taskmode={this.state.taskmode}
														taskElemConflPair={this.state.taskElemConflPair}
														chosenBuildingGeom={this.state.chosenBuildingGeom}
														_setChosenMetadata={this._setChosenMetadata}
														_getNextTask={this._getNextTask}
					/>
					<div className="mapbox">
						<MapContainer task={this.state.task}
													taskmode={this.state.taskmode}
													taskelements={this.state.elements}
													conflictelements={this.state.conflicts}
													activeTaskObj1={this.state.activeTaskObj1}
													activeTaskObj2={this.state.activeTaskObj2}
													taskElemConflPair={this.state.taskElemConflPair}
													_setChosenBuildingGeom={this._setChosenBuildingGeom}
						/>
					</div>
				</div>
			)
		}
	}
}

function getallTaskElemConflElemPairs(elements, onlyone, callback) {
	var taskPairs = [];
	var i=1;
	if (onlyone) {
		taskApi.getTaskElemAndConflictElem(elements.id, function(resp) {
			taskPairs=resp;
			callback(taskPairs);
		})
	} else {
		elements.map(elem => {
			taskApi.getTaskElemAndConflictElem(elem.id, function(resp) {
				taskPairs[i]=resp;
				i+=1;
			});
		});
		callback(taskPairs);
	}
}
