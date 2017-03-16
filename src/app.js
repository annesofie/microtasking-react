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

	constructor() {

		super();

		this.viewState = {
			HOMEVIEW: 'home',
			REGISTERVIEW: 'register',
			TASKDESCRIPTIONVIEW: 'taskdescription',
			TASKVIEW: 'taskview',
			SURVEYVIEW: 'survey'
		};

		this.state = {
			mode: this.viewState.HOMEVIEW,
			participant: [],
			taskorder: '',
			map_taskmode: 0,
			task: [],
			currentTaskNum: 0,
			randomOrderTaskElements: [],
			activeTaskElements: [],
			hidemap: false,
			title: 'Welcome',
			percent: 0,  //Progress
			chosenBuildingGeom: []
		};

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

			getAllElements(listorder[0], function(resp) {
				this.setState({randomOrderTaskElements: resp});
			}.bind(this));

			taskApi.getTask(listorder[0]).then(elem => {
				this.setState({task: elem});
				this.elementsInTask = elem.num_of_elements;
				this.setState({map_taskmode: elem.num_of_elements});
			});

		});
	}

	_setParticipantId(participant) {
		this.setState({participant: participant});
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
		if(this.state.mode === this.viewState.HOMEVIEW){
			 //this.setState({mode: this.viewState.REGISTERVIEW});
			this._handleTaskMode(true, function(str) {
				this.setState({mode: this.viewState.TASKVIEW});
			}.bind(this));
		} else if(this.state.mode == this.viewState.REGISTERVIEW) {
			this._handleTaskMode(true, function(str) {
				this.setState({mode: this.viewState.TASKVIEW});
			}.bind(this));
		} else if (this.state.mode === this.viewState.TASKVIEW) {
			this.setState({mode: this.viewState.SURVEYVIEW});
		} else if (this.state.mode === this.viewState.SURVEYVIEW) {
			console.log('survey view');
			this._getNextTask(function() {
				this.setState({
					chosenBuildingGeom: [],
					mode: this.viewState.TASKVIEW
				});
			}.bind(this));
		}
	}
	_handleTaskMode(isFirst, callback) {
		const base = this.state.randomOrderTaskElements;
		this._changeProgressTitle();
		if (this.elementsInTask == 1 && this.num < this.numOfObjects) {
				this.setState({
					activeTaskElements: base[this.num],
					currentTaskNum: this.num+1
				});
				this.num += 1;
				callback('done');
		} else if (this.elementsInTask == 3 && this.num < this.numOfObjects) {
				this.setState({
					activeTaskElements: base.slice(this.num, this.num+3),
					currentTaskNum: this.num+3
				});
				this.num += 3;
				callback('done');
		} else if (this.num < this.numOfObjects){
				//use all
				this.num += this.numOfObjects;
				this.setState({
					activeTaskElements: base,
					currentTaskNum: this.num
				});
				callback('done');
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
		this.setState({currentTaskNum: this.num});
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
		if (this.state.mode === this.viewState.HOMEVIEW) {
			return (
				<div className="container-fluid">
					<Home onClick={this._handleModeChange}/>
				</div>
			);
		} else if (this.state.mode === this.viewState.REGISTERVIEW) {
		 	return (
				<div className="container-fluid ">
					<div className="d-flex justify-content-end">
						<Progressbar
							title={this.state.title}
							percent={this.state.percent}
						/>
					</div>
					<Register
						mode={this.state.mode}
						_setParticipantId = {this._setParticipantId}
					/>
				</div>
		 	)
		} else if (this.state.mode === this.viewState.TASKVIEW) {
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
															currentTaskNum={this.state.currentTaskNum}
															elementsInTask={this.state.map_taskmode}
															hidemap={this.state.hidemap}
															activeTaskElements={this.state.activeTaskElements}
															chosenBuildingGeom={this.state.chosenBuildingGeom}
															_setChosenMetadata={this._setChosenMetadata}
															_getNextTaskElements={this._handleTaskMode}
															_changeHideMapState={this._changeHideMapState}
						/>
						<div className="p-2 mapbox" style={{display: this.state.hidemap ? 'none' : 'block' }}>
								<MapContainer elementsInTask={this.state.map_taskmode}
															activeTaskElements={this.state.activeTaskElements}
															_setChosenBuildingGeom={this._setChosenBuildingGeom}
							/>
						</div>
					</div>
				</div>
			)
		} else if (this.state.mode == this.viewState.SURVEYVIEW) {
			return (
				<div className="container-fluid ">
					<div className="d-flex justify-content-end">
						<Progressbar
							title={this.state.title}
							percent={this.state.percent}
						/>
					</div>
					<Register mode={this.state.mode}
										participant={this.state.participant}
										task={this.state.task}
										_handleModeChange={this._handleModeChange}
					/>
				</div>
				)
		}
	}
}

function getAllElements(taskid, callback) {
	taskApi.getElementsInTask(taskid).then(elem1 => {
		taskApi.getConflictsInTask(taskid).then(elem2 => {
			randPlaceElem(elem1, elem2, function(resp) {
				callback(resp);
			});
		});
	});
}
function randPlaceElem(list1, list2, callback) {
	var building = [];
	for (var i = 0; i < list1.features.length; i++) {
		var x = Math.round(Math.random());
		var y = (x === 0 ? 1 : 0);
		var geom = {};
		geom[x] = list1.features[i];
		geom[y] = list2.features[i];
		building[i] = geom;
	}
	callback(building);
}

//function getallTaskElemConflElemPairs(elements, onlyone, callback) {
//	let taskPairs = [];
//	let i=0;
//	if (onlyone) {
//		taskApi.getTaskElemAndConflictElem(elements.id, function(resp) {
//			taskPairs=resp;
//			callback(taskPairs);
//		})
//	} else {
//		elements.map(elem => {
//			taskApi.getTaskElemAndConflictElem(elem.id, function(resp) {
//				taskPairs[i]=resp;
//				i+=1;
//			});
//		});
//		callback(taskPairs);
//	}
//}

