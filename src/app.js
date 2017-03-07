/**
 * Created by AnneSofie on 23.02.2017.
 */

import React, {Component} from 'react';
import { browserHistory, Router, Route, Link, IndexRoute, hashHistory } from 'react-router'
import { Map, TileLayer, Marker, Popup, LayerGroup, GeoJSON} from 'react-leaflet'

import * as taskApi from './client/api/task-api';

//Views
import Home from './client/components/containers/HeaderComponent';
import Register from './client/components/containers/RegisterFormComponent';
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
			taskorder: '',
			taskid: '',
			taskmode: 0,
			map_taskmode: 0,
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
		this.numOfObjects = 5; //NB! HUSK å endre
		this.taskNum = 0;

		this._handleModeChange = this._handleModeChange.bind(this);
		this._setChosenBuildingGeom = this._setChosenBuildingGeom.bind(this);
		this._setChosenMetadata = this._setChosenMetadata.bind(this);
		this._handleTaskMode = this._handleTaskMode.bind(this);
		this._setParticipantId = this._setParticipantId.bind(this);
		// this._getNextTaskElements = this._getNextTaskElements.bind(this);
		this._getNextTask = this._getNextTask.bind(this);
	}

	componentDidMount() {
		taskApi.getTaskOrder().then(listorder => {
			console.log(listorder);
			this.setState({taskorder: listorder});
			this.setState({taskid: listorder[0]});

			taskApi.getElementsInTask(listorder[0]).then(elem => {
				this.setState({elements: elem});
			});
			taskApi.getConflictsInTask(listorder[0]).then(elem => {
				this.setState({conflicts: elem});
			});
			taskApi.getTask(listorder[0]).then(elem => {
				this.setState({task: elem});
				this.setState({taskmode: elem.num_of_elements});
				this.setState({map_taskmode: elem.num_of_elements});
			});
		});
	}
	_setChosenBuildingGeom(layer, id) {
		this.chosenGeomLayer[id]=layer.feature;
		console.log(this.chosenGeomLayer);
		this.setState({chosenBuildingGeom: this.chosenGeomLayer});
	}
	_setChosenMetadata(obj) {
		this.chosenMetadata[this.num]=obj;
		console.log(this.chosenMetadata);
	}
	_setParticipantId(id) {
		this.setState({user: id});
		this._handleModeChange();
	}
	_handleModeChange() {
		if(this.state.mode === 'home'){
			// this.setState({mode: 'register'});
			this._handleTaskMode(true, function(str) {
				this.setState({mode: 'taskview'});
			}.bind(this));
		} else if (this.state.mode === 'register') {
			this._handleTaskMode(true, function(str) {
				this.setState({mode: 'taskview'});
			}.bind(this));
		}
	}
	_handleTaskMode(isFirst, callback) {
		const base1 = this.state.elements.features;
		const base2 = this.state.conflicts.features;
		if (this.state.taskmode == 1 && this.num < this.numOfObjects) {
			getallTaskElemConflElemPairs(base1[this.num], true, function(resp) {
				this.setState({taskElemConflPair: resp});
				this.num += 1;
				callback('done');
			}.bind(this));
		} else if (this.state.taskmode == 3 && this.num < this.numOfObjects) {
			getallTaskElemConflElemPairs(base1.slice(this.num, this.num+3), false, function(taskPairs) {
				this.setState({taskElemConflPair: taskPairs});
				this.setState({activeTaskObj1: base1.slice(this.num, this.num+3)});
				this.setState({activeTaskObj2: base2.slice(this.num, this.num+3)});
				this.num += 3;
				callback('done');
			}.bind(this));
		} else if (this.num < this.numOfObjects){
			//use all
			getallTaskElemConflElemPairs(base1, false, function(taskPairs) {
				console.log(taskPairs);
				this.setState({taskElemConflPair: taskPairs});
				this.setState({activeTaskObj1: base1});
				this.setState({activeTaskObj2: base2});
				this.num += this.numOfObjects;
				callback('done');
			}.bind(this));
		} else {
			console.log('get next task');
			//Get next task
			this._getNextTask();
		}
	}
	_getNextTask() {
		this.taskNum += 1;
		console.log(this.state.taskorder[this.taskNum]);
		taskApi.getTask(this.state.taskorder[this.taskNum]).then(elem => {
			this.setState({task: elem});
			this.setState({taskmode: elem.num_of_elements});
			this._handleTaskMode(false, function (resp) {
				this.setState({map_taskmode: this.state.taskmode});
				console.log(resp);
			})
		});
	}

	render() {
		if (this.state.mode === 'home') {
			return (
				<Home onClick={this._handleModeChange}/>
			);
		// } else if (this.state.mode === 'register') {
		// 	return (
		// 		<Register _setParticipantId = {this._setParticipantId} />
		// 	)
		} else if (this.state.mode === 'taskview') {
			return (
				<div className="d-flex">
					<TaskBoxComponent task={this.state.task}
														taskmode={this.state.map_taskmode}
														taskElemConflPair={this.state.taskElemConflPair}
														activeTaskObj1={this.state.activeTaskObj1}
														chosenBuildingGeom={this.state.chosenBuildingGeom}
														_setChosenMetadata={this._setChosenMetadata}
														_getNextTaskElements={this._handleTaskMode}
					/>
					<div className="mapbox">
						<MapContainer task={this.state.task}
													taskmode={this.state.map_taskmode}
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
				//console.log(resp.confl.properties.is_fixed);
				taskPairs[i]=resp;
				i+=1;
			});
		});
		callback(taskPairs);
	}
}
