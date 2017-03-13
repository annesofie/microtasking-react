/**
 * Created by AnneSofie on 23.02.2017.
 */

import React, {Component} from 'react';
import { browserHistory, Router, Route, Link, IndexRoute, hashHistory } from 'react-router'
import { Map, TileLayer, Marker, Popup, LayerGroup, GeoJSON} from 'react-leaflet'

import * as taskApi from './client/api/task-api';

//Views
import Progressbar from './client/components/views/progressbarView';
import TimerComponent from './client/components/containers/TimerComponent';
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
			hidemap: false,
			title: 'Welcome',
			percent: 0,
			chosenBuildingGeom: []
		};

		this.elements;
		this.conflicts;
		this.chosenGeomLayer={};
		this.chosenMetadata={};
		this.taskTimer=0;
		this.num=0;  // Number in the task sequence (+1 i elementsInTask 1, +3 in elementsInTask 2, + numOfObjects in elementsInTask 3)
		this.numOfObjects = 5; // ---- TODO! HUSK å endre, totalt antall task elements i DBen
		this.taskMode = 0; // Taskmode number: 0, 1, 2
		this.elementsInTask = 0; // Number of elements in task

		this._handleModeChange = this._handleModeChange.bind(this);
		this._setParticipantId = this._setParticipantId.bind(this);
		this._setChosenBuildingGeom = this._setChosenBuildingGeom.bind(this);
		this._setChosenMetadata = this._setChosenMetadata.bind(this);
		this._setTaskTimer = this._setTaskTimer.bind(this);
		this._handleTaskMode = this._handleTaskMode.bind(this);
		this._changeHideMapState = this._changeHideMapState.bind(this);
		this._changeProgressTitle = this._changeProgressTitle.bind(this);
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
				this.elementsInTask = elem.num_of_elements;
				this.setState({map_taskmode: elem.num_of_elements});
			});
		});
	}
	_setParticipantId(id) {
		this.setState({user: id});
		this._handleModeChange();
	}
	_setChosenBuildingGeom(layer, id) {
		this.chosenGeomLayer[id]=layer.feature;
		this.setState({chosenBuildingGeom: this.chosenGeomLayer});
	}
	_setChosenMetadata(obj) {
		this.chosenMetadata[this.num]=obj;
	}
	_setTaskTimer(time) {
		console.log(time);
		this.taskTimer = time;
	}
	_changeHideMapState(bool) {
		this.setState({hidemap: bool});
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
				this.setState({
					chosenBuildingGeom: [],
					mode: 'taskview'
				});
			}.bind(this));
		}
	}
	_handleTaskMode(isFirst, callback) {
		const base1 = this.elements.features;
		const base2 = this.conflicts.features;
		this._changeProgressTitle();
		if (this.elementsInTask == 1 && this.num < this.numOfObjects) {
			console.log('elementsInTask = ' + this.elementsInTask);
			getallTaskElemConflElemPairs(base1[this.num], true, function(resp) {
				this.setState({taskElemConflPair: resp});
				this.num += 1;
				callback('done');
			}.bind(this));
		} else if (this.elementsInTask == 3 && this.num < this.numOfObjects) {
			console.log('elementsInTask = ' + this.elementsInTask);
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
			console.log('elementsInTask = ' + this.elementsInTask);
			getallTaskElemConflElemPairs(base1, false, function(taskPairs) {
				this.setState({
					activeTaskObj1: base1,
					activeTaskObj2: base2,
					taskElemConflPair: taskPairs
				});
				this.num += this.numOfObjects;
				callback('done');
			}.bind(this));
		} else if (!isFirst){  //Task is finish
			this._handleModeChange();
		}
	}
	_getNextTask(callback) {
		this.taskMode += 1;
		this._changeProgressTitle();
		console.log(this.taskMode);
		console.log(this.state.taskorder);
		this.num = 0; //reset

		taskApi.getTask(this.state.taskorder[this.taskMode]).then(elem => {
			this.setState({task: elem});
			this.elementsInTask = elem.num_of_elements;
			this.setState({map_taskmode: this.elementsInTask});
			this._handleTaskMode(false, function (resp) {
				callback(resp);
			});
		});
	}
	_changeProgressTitle() {
		//Register
		const progressTitle = ['Task 1', 'Task 2', 'Task3'];
		this.setState({
			title: progressTitle[this.taskMode],
			percent: this.state.percent+10
		});
	}

	render() {
		if (this.state.mode === 'home') {
			return (
				<div className="container-fluid">
					<Home onClick={this._handleModeChange}/>
				</div>
			);
		// } else if (this.state.mode === 'register') {
		// 	return (
		// 		<Register _setParticipantId = {this._setParticipantId} />
		// 	)
		} else if (this.state.mode === 'taskview') {
			return (
				<div className="container-fluid">
					<div className="d-flex justify-content-end">
						<TimerComponent
								_setTaskTimer={this._setTaskTimer}
						/>
						<Progressbar
							title={this.state.title}
							percent={this.state.percent}
						/>
					</div>
					<div className="d-flex task-map-box">
						<TaskBoxComponent task={this.state.task}
															thisRoundTaskNumber={this.num}
															elementsInTask={this.state.map_taskmode}
															hidemap={this.state.hidemap}
															taskElemConflPair={this.state.taskElemConflPair}
															activeTaskObj1={this.state.activeTaskObj1}
															chosenBuildingGeom={this.state.chosenBuildingGeom}
															_setChosenMetadata={this._setChosenMetadata}
															_getNextTaskElements={this._handleTaskMode}
															_changeHideMapState={this._changeHideMapState}
						/>
						<div className="p-2 mapbox" style={{display: this.state.hidemap ? 'none' : 'block' }}>
							<MapContainer taskmode={this.state.map_taskmode}
														activeTaskObj1={this.state.activeTaskObj1}
														activeTaskObj2={this.state.activeTaskObj2}
														taskElemConflPair={this.state.taskElemConflPair}
														_setChosenBuildingGeom={this._setChosenBuildingGeom}
							/>
						</div>
					</div>
				</div>
			)
		} else if (this.state.mode == 'survey') {
			return (
				<div className="container-fluid ">
					<div className="d-flex justify-content-end">
						<Progressbar
							title={this.state.title}
							percent={this.state.percent}
						/>
					</div>
					<Register mode={this.state.mode}
										handleModeChange={this._handleModeChange}
					/>
				</div>
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
