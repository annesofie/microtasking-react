/**
 * Created by AnneSofie on 23.02.2017.
 */

import React, { Component } from 'react';

import * as taskApi from './client/api/task-api';
import * as resultApi from './client/api/result-api';

//Views
import Progressbar from './client/components/views/progressbarView';
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
			activeTaskElements: [],
			hidemap: true,
			title: 'Welcome',
			percent: 0,  //Progress
			chosenBuildingGeom: [],
			enableBtn: false
		};

		this.testTaskId = 4;
		this.randomOrderTaskElements = [];
		this.chosenGeomLayer=[];
		this.chosenMetadata=[];
		this.timeResult= {};
		this.interval=0;
		this.num=0;  // Number in the task sequence (+1 i elementsInTask 1, +3 in elementsInTask 2, + numOfObjects in elementsInTask 3)
		this.numOfObjects = 6; // ---- TODO! HUSK å endre, totalt antall task elements i DBen
		this.taskMode = 0; // Taskmode number: 0, 1, 2, 3
		this.elementsInTask = 0; // Number of elements in task
		this.numOfChosenElem = 0; // Counts how many elements the user has pressed (need to press all to get to the next task)

		this._handleModeChange = this._handleModeChange.bind(this);
		this._setParticipantId = this._setParticipantId.bind(this);
		this._setChosenBuildingGeom = this._setChosenBuildingGeom.bind(this);
		this._setChosenMetadata = this._setChosenMetadata.bind(this);
		this._timeElapsed = this._timeElapsed.bind(this);
		this._handleTaskMode = this._handleTaskMode.bind(this);
		this._changeHideMapState = this._changeHideMapState.bind(this);
		this._changeProgressTitle = this._changeProgressTitle.bind(this);
		this._changeEnableBtnState = this._changeEnableBtnState.bind(this);
 		this._getTaskElements = this._getTaskElements.bind(this);
		this._getNextTask = this._getNextTask.bind(this);
	}

	componentDidMount() {
		taskApi.getTaskOrder().then(listorder => {
			listorder.unshift(this.testTaskId);
			this.setState({taskorder: listorder});
			this._getTaskElements(this.testTaskId, function(resp) {
				//console.log(resp);
			});
			taskApi.getTask(this.testTaskId).then(elem => {
				console.log(this.state.taskorder);
				this.setState({task: elem});
				this.elementsInTask = elem.num_of_elements;
				this.setState({map_taskmode: elem.num_of_elements});
			});
		});
	}

	_getTaskElements(id, callback) {
		getAllElements(id, function(resp) {
			this.randomOrderTaskElements = resp;
			//this.setState({activeTaskElements: resp});
			callback(resp);
		}.bind(this));
	}

	_setParticipantId(participant) {
		this.setState({participant: participant});
		this._handleModeChange(this.viewState.SURVEYVIEW);
	}
	_setChosenBuildingGeom(layer, id) {
		console.log(layer);
		this.chosenGeomLayer[layer.feature.properties.building_nr]=layer.feature;
		this.setState({chosenBuildingGeom: this.chosenGeomLayer});
		this._changeEnableBtnState();
	}
	_setChosenMetadata(obj) {
		console.log(obj);
		this.chosenMetadata = obj;
	}

	_changeHideMapState(bool) {
		clearInterval(this.interval);
		this.numOfChosenElem = 0;
		this.setState({
			hidemap: bool,
			enableBtn: false
		});
		this.interval = setInterval(this._timeElapsed, 1000);
	}
	_changeEnableBtnState() {
		this.numOfChosenElem +=1;
		if (this.numOfChosenElem == this.elementsInTask){
			this.setState({
						enableBtn: true});
		}
	}
	_handleModeChange() {
		console.log(this.state.mode);
		switch (this.state.mode) {
			case this.viewState.HOMEVIEW:
				//this.setState({mode: this.viewState.REGISTERVIEW});
				this._handleTaskMode(true, function(str) {
					this.setState({mode: this.viewState.TASKVIEW});
					this.interval = setInterval(this._timeElapsed, 1000);
				}.bind(this));
				break;
			case this.viewState.REGISTERVIEW:
				this._handleTaskMode(true, function(str) {
					this.setState({mode: this.viewState.TASKVIEW});
					// this.interval = setInterval(this._timeElapsed, 1000);
					// console.log(this.interval);
				}.bind(this));
				break;
			case this.viewState.TASKVIEW:
				if (this.state.task.id !== this.testTaskId) {
					const base = this.timeResult;
					base['totalTime']=base['geomTime']+base['metaTime'];
					console.log(this.timeResult);
				}
				clearInterval(this.interval);
				this.setState({mode: this.viewState.SURVEYVIEW});
				break;
			case this.viewState.SURVEYVIEW:
				if (this.state.task.id !== this.testTaskId) {
					console.log('save task result');
					saveTaskResult(this.chosenGeomLayer, this.chosenMetadata, this.timeResult, this.state.taskorder, this.state.participant, this.state.task);
				}
				this._getNextTask(function(resp) {
					this.setState({
						chosenBuildingGeom: [],
						mode: this.viewState.TASKVIEW
					});
					this.interval = setInterval(this._timeElapsed, 1000);
				}.bind(this));
				break;
		}
	}
	_timeElapsed() {
		const base = this.timeResult;
		base['geomTime'] = (base['geomTime'] == undefined ? 0 : base['geomTime']);
		base['metaTime'] = (base['metaTime'] == undefined ? 0 : base['metaTime']);
		if (!this.state.hidemap) {
			base['geomTime'] = base['geomTime']+1;
		} else {
			base['metaTime'] = base['metaTime']+1;
		}
	}
	_handleTaskMode(isFirst, callback) {
		const base = this.randomOrderTaskElements;
		this._changeProgressTitle();
		if (this.state.task.id == this.testTaskId && this.num < this.numOfObjects) {
			this.setState({
				activeTaskElements: base[0],
				currentTaskNum: 6,
				enableBtn: true
			});
			this.num = this.numOfObjects;
			callback('done');
		} else if (this.elementsInTask == 1 && this.num < this.numOfObjects) {
			this._getTaskElements(this.state.taskorder[this.taskMode], function(resp) {
				console.log(resp);
				this.setState({
					activeTaskElements: resp[this.num],
					currentTaskNum: this.num+1
				});
				this.num += 1;
				callback('done');
			}.bind(this))
		} else if (this.elementsInTask == 3 && this.num < this.numOfObjects) {
			//this.chosenGeomLayer=[]; //Reset
			this._getTaskElements(this.state.taskorder[this.taskMode], function(resp) {
				this.setState({
					activeTaskElements: resp.slice(this.num, this.num+3),
					currentTaskNum: this.num + 3
				});
				this.num += 3;
				callback('done');
			}.bind(this));
		} else if (this.num < this.numOfObjects){
				//use all
			this._getTaskElements(this.state.taskorder[this.taskMode], function(resp) {
				this.num = this.numOfObjects;
				this.setState({
					activeTaskElements: resp,
					currentTaskNum: this.num
				});
				callback('done');
			}.bind(this));
		} else if (!isFirst){
			//console.log('task finish, go to survey view');
			this._handleModeChange(); //Go to Survey view
		}
	}
	_getNextTask(callback) {
		this.taskMode += 1;
		this._changeProgressTitle();

		//Reset
		this.num = 0;
		this.numOfChosenElem = 0;
		this.chosenGeomLayer = [];
		this.timeResult = {};
		this.setState({
			currentTaskNum: this.num,
			enableBtn: false
		});

		taskApi.getTask(this.state.taskorder[this.taskMode]).then(elem => {
			this.elementsInTask = elem.num_of_elements;
			this.setState({task: elem});
			this._handleTaskMode(false, function (resp) {
				this.setState({
					map_taskmode: this.elementsInTask
				});
				callback(resp);
			}.bind(this));
			//callback('hey');
		});
	}
	_changeProgressTitle() {
		const progressTitle = ['Test', 'Task 1', 'Task 2', 'Task3'];
		this.setState({
			title: progressTitle[this.taskMode],
			percent: this.state.percent+10
		});
	}

	render() {
		if (this.state.mode === this.viewState.HOMEVIEW) {
			return (
				<div className="container-fluid">
					<Home onClick={this._handleModeChange}
								viewState={this.viewState}
					/>
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
						<Progressbar
							title={this.state.title}
							percent={this.state.percent}
						/>
					</div>
					<div className="d-flex task-map-box">
						<TaskBoxComponent task={this.state.task}
															testTaskId={this.testTaskId}
															currentTaskNum={this.state.currentTaskNum}
															elementsInTask={this.state.map_taskmode}
															hidemap={this.state.hidemap}
															activeTaskElements={this.state.activeTaskElements}
															chosenBuildingGeom={this.state.chosenBuildingGeom}
															enableBtn={this.state.enableBtn}
															//enableNextMetaBtn={this.state.enableNextMetaBtn}
															_setChosenMetadata={this._setChosenMetadata}
															_getNextTaskElements={this._handleTaskMode}
															_changeHideMapState={this._changeHideMapState}
															_changeEnableBtnState={this._changeEnableBtnState}
						/>
							{!this.state.hidemap &&
								<div className="p-2 mapbox" >
										<MapContainer elementsInTask={this.state.map_taskmode}
																	activeTaskElements={this.state.activeTaskElements}
																	_setChosenBuildingGeom={this._setChosenBuildingGeom}
									/>
								</div> }
					</div>
				</div>
			)
		} else if (this.state.mode == this.viewState.SURVEYVIEW) {
			return (
				<div className="container-fluid survey-background">
					<div className="d-flex justify-content-end">
						<Progressbar
							title={this.state.title}
							percent={this.state.percent}
						/>
					</div>
					<Register mode={this.state.mode}
										participant={this.state.participant}
										task={this.state.task}
										testTaskId={this.testTaskId}
										viewState={this.viewState}
										_handleModeChange={this._handleModeChange}
					/>
				</div>
				)
		}
	}
}
//style={{display: this.state.hidemap ? 'none' : 'block' }}
function saveTaskResult(geomlay, metalay, timeres, taskorder, participant, task) {
	console.log(geomlay[1]);
	let result = {};
	Object.keys(geomlay).map((elem, index) => {
		console.log(geomlay[elem]);
		geomlay['correct'] = (geomlay['correct']==undefined ? 0 : geomlay['correct']);
		metalay['correct'] = (metalay['correct']==undefined ? 0 : metalay['correct']);
		if (geomlay[elem].properties.is_imported) {
			geomlay['correct']++;
		}
		if (metalay[elem].properties.is_imported) {
			metalay['correct']++;
		}
	});
	result['chosenGeomLayer'] = geomlay;
	result['chosenMetadata'] = metalay;
	result['time'] = timeres;
	result['taskorder'] = taskorder;
	// result['participant'] = participant.id;
	result['participant'] = 1;
	result['task'] = task.id;

	console.log(result);

	resultApi.saveTaskResult(result).then(resp => {
		console.log(resp);
	});

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
	let building = [];
	for (let i = 0; i < list1.features.length; i++) {
		const x = Math.round(Math.random());
		const y = (x === 0 ? 1 : 0);
		let geom = {};
		list1.features[i].properties.title = list1.features[i].properties.title + ': ' + (x + 1).toString();
		list2.features[i].properties.title = list2.features[i].properties.title + ': ' + (y + 1).toString();
		geom[x] = list1.features[i];
		geom[y] = list2.features[i];
		geom[2] = list1.features[i].properties.building_nr;
		building[i] = geom;
	}
	callback(building);
}


//function reshuffleTaskElements(isFirst, list, callback) {
//	console.log(list);
//	let building = [];
//	const x = Math.round(Math.random());
//	const y = (x === 0 ? 1 : 0);
//
//	if (isFirst) {
//		const elem1 = list[0];
//		const elem2 = list[1];
//		elem1.properties.title = elem1.properties.title.split(':')[0] + ': ' + (x+1).toString();
//		elem2.properties.title = elem2.properties.title.split(':')[0] + ': ' + (y+1).toString();
//
//		let geom = {};
//		geom[x] = elem1;
//		geom[y] = elem2;
//		building=geom;
//
//	} else {
//		for (let i=0; i < list.length; i++) {
//			const elem1 = list[i][0];
//			const elem2 = list[i][1];
//			elem1.properties.title = elem1.properties.title.split(':')[0] + ': ' + (x+1).toString();
//			elem2.properties.title = elem2.properties.title.split(':')[0] + ': ' + (y+1).toString();
//
//			let geom = {};
//			geom[x] = elem1;
//			geom[y] = elem2;
//			building[i]=geom;
//		}
//	}
//	callback(building);
//}

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

