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
			map_taskmode: 0,
			task: [],
			activeTaskObj1: null,
			activeTaskObj2: null,
			taskElemConflPair: null,
			chosenBuildingGeom: []
		};

		this.elements;
		this.conflicts;
		this.chosenGeomLayer={};
		this.chosenMetadata={};
		this.num=0;
		this.numOfObjects = 5; //NB! HUSK å endre
		this.taskNum = 0;
		this.taskmode = 0;

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

			taskApi.getElementsInTask(listorder[0]).then(elem => {
				this.elements = elem;
			});
			taskApi.getConflictsInTask(listorder[0]).then(elem => {
				this.conflicts = elem;
			});
			taskApi.getTask(listorder[0]).then(elem => {
				this.setState({task: elem});
				this.taskmode = elem.num_of_elements;
				this.setState({map_taskmode: elem.num_of_elements});
			});
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
		} else if (this.state.mode === 'taskview') {
			this.setState({mode: 'survey'});
		} else if (this.state.mode === 'survey') {
			this._getNextTask(function() {
				this.setState({mode: 'taskview'});
			}.bind(this));
		}
	}
	_handleTaskMode(isFirst, callback) {
		const base1 = this.elements.features;
		const base2 = this.conflicts.features;
		if (this.taskmode == 1 && this.num < this.numOfObjects) {
			console.log('taskmode = ' + this.taskmode);
			getallTaskElemConflElemPairs(base1[this.num], true, function(resp) {
				this.setState({taskElemConflPair: resp});
				this.num += 1;
				callback('done');
			}.bind(this));
		} else if (this.taskmode == 3 && this.num < this.numOfObjects) {
			console.log('taskmode = ' + this.taskmode);
			getallTaskElemConflElemPairs(base1.slice(this.num, this.num+3), false, function(taskPairs) {
				this.setState(
					{
						activeTaskObj1: base1.slice(this.num, this.num+3),
						activeTaskObj2: base2.slice(this.num, this.num+3),
						taskElemConflPair: taskPairs
					});
				this.num += 3;
				callback('done');
			}.bind(this));
		} else if (this.num < this.numOfObjects){
			//use all
			console.log('taskmode = ' + this.taskmode);
			getallTaskElemConflElemPairs(base1, false, function(taskPairs) {
				console.log(taskPairs);
				this.setState({
					activeTaskObj1: base1,
					activeTaskObj2: base2,
					taskElemConflPair: taskPairs
				});
				this.num += this.numOfObjects;
				callback('done');
			}.bind(this));
		} else if (!isFirst){
			//Task is finish
			console.log('get next task');
			this._handleModeChange();
			//Get next task
			// this._getNextTask();
		}
	}
	_getNextTask(callback) {
		this.taskNum += 1;
		console.log(this.taskNum);
		console.log(this.state.taskorder);
		this.num = 0; //reset
		taskApi.getTask(this.state.taskorder[this.taskNum]).then(elem => {
			this.setState({task: elem});
			this.taskmode = elem.num_of_elements;
			this.setState({map_taskmode: this.taskmode});
			this._handleTaskMode(false, function (resp) {
				callback(resp);
			});
			// callback('getnexttask done');
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
						<MapContainer taskmode={this.state.map_taskmode}
													activeTaskObj1={this.state.activeTaskObj1}
													activeTaskObj2={this.state.activeTaskObj2}
													taskElemConflPair={this.state.taskElemConflPair}
													_setChosenBuildingGeom={this._setChosenBuildingGeom}
						/>
					</div>
				</div>
			)
		} else if (this.state.mode == 'survey') {
			return (
					<Register mode={this.state.mode}
										handleModeChange={this._handleModeChange}
					/>
				)
		}
	}
}

function getallTaskElemConflElemPairs(elements, onlyone, callback) {
	let taskPairs = [];
	let i=1;
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
