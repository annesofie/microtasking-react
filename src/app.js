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
			tasknummer: 0,
			map_taskmode: 0,
			task: [],
			currentTaskNum: 0,
			activeTaskElements: [],
			hidemap: true,
			title: 'Welcome',
			percent: 0,  //Progress
			chosenBuildingGeom: [],
			enableBtn: false,
			taskresultId: null
		};

		let buildingOrder = [[1, 2, 3, 4, 5, 6], [9, 10, 11, 12, 13, 14], [15, 16, 17, 18, 19, 20]];
		this.taskBuildingOrder = shuffle(buildingOrder);


		this.testTaskId = 4;
		this.randomOrderTaskElements = [];
		this.chosenGeomLayer=[];
		this.chosenMetadata=[];
		this.timeResult = {};
		this.num=0;  // Number in the task sequence (+1 i elementsInTask 1, +3 in elementsInTask 2, + numOfObjects in elementsInTask 3)
		this.numOfObjects = 6; // ---- TODO! HUSK å endre, totalt antall task elements i DBen
		this.taskMode = 0; // Taskmode number: 0, 1, 2, 3
		this.elementsInTask = 0; // Number of elements in task
		this.numOfChosenElem = 0; // Counts how many elements the user has pressed (need to press all to get to the next task)

		this._handleModeChange = this._handleModeChange.bind(this);
		this._setParticipantId = this._setParticipantId.bind(this);
		this._setChosenBuildingGeom = this._setChosenBuildingGeom.bind(this);
		this._setElapsedTaskTime = this._setElapsedTaskTime.bind(this);
		this._setChosenMetadata = this._setChosenMetadata.bind(this);
		this._handleTaskMode = this._handleTaskMode.bind(this);
		this._changeHideMapState = this._changeHideMapState.bind(this);
		this._changeProgressTitle = this._changeProgressTitle.bind(this);
		this._changeEnableBtnState = this._changeEnableBtnState.bind(this);
		this._getNextTask = this._getNextTask.bind(this);
		this._getBuildingTaskElements = this._getBuildingTaskElements.bind(this);
	}

	componentDidMount() {
		taskApi.getTaskOrder().then(listorder => {
			listorder.unshift(this.testTaskId);
			this.setState({taskorder: listorder});
			taskApi.getTask(this.testTaskId).then(elem => {
				this._getBuildingTaskElements(elem);
				this.setState({task: elem});
				this.elementsInTask = elem.num_of_elements;
				this.setState({map_taskmode: elem.num_of_elements});
			});
		});
	}

	_getBuildingTaskElements(task, callback) {
		getAllBuildingElements(task.buildings, function(resp) {
			this.randomOrderTaskElements = resp;
			if (callback) callback(resp);
		}.bind(this));
	}

	_setParticipantId(participant) {
		this.setState({participant: participant});
		this._handleModeChange(this.viewState.SURVEYVIEW);
	}
	_setChosenBuildingGeom(layer, id) {
		this.chosenGeomLayer[layer.feature.properties.building_nr]=layer.feature;
		this.setState({chosenBuildingGeom: this.chosenGeomLayer});
		this._changeEnableBtnState(true);
	}
	_setChosenMetadata(obj) {
		this.chosenMetadata = obj;
	}
	_setElapsedTaskTime(time) {
		this.timeResult = time;
	}
	_changeHideMapState(bool) {
		this.numOfChosenElem = 0;
		this.setState({
			hidemap: bool,
			enableBtn: false
		});
	}
	_changeEnableBtnState(isChosen) {
		this.numOfChosenElem = isChosen ?  this.numOfChosenElem+1 : this.numOfChosenElem-1;
		if (this.numOfChosenElem >= this.elementsInTask){
			this.setState({
						enableBtn: true});
		} else if (this.numOfChosenElem !== this.elementsInTask) {
			this.setState({
				enableBtn: false});
		}
	}
	_handleModeChange() {
		switch (this.state.mode) {
			case this.viewState.HOMEVIEW:
				this.setState({mode: this.viewState.REGISTERVIEW});
				 //this._handleTaskMode(true, function(str) {
				 //	this.setState({mode: this.viewState.TASKVIEW});
				 //}.bind(this));
				break;
			case this.viewState.REGISTERVIEW:
				this._handleTaskMode(true, function(str) {
					this.setState({mode: this.viewState.TASKVIEW});
				}.bind(this));
				break;
			case this.viewState.TASKVIEW:
				const base = this.timeResult;
				base['totalTime']=base['geomTime']+base['metaTime'];
				saveTaskResult(this.taskMode, this.chosenGeomLayer, this.chosenMetadata, this.timeResult, this.state.taskorder, this.state.participant, this.state.task, function(resp) {
					this.setState({
						taskresultId: resp.data.id
					});
				}.bind(this));
				this.setState({mode: this.viewState.SURVEYVIEW});
				break;
			case this.viewState.SURVEYVIEW:
					console.log('save task result');

				if(this.taskMode == 3) {
					this.setState({mode: this.viewState.HOMEVIEW});
				} else {
					this._getNextTask(function(resp) {
						this.setState({
							chosenBuildingGeom: [],
							mode: this.viewState.TASKVIEW
						});
					}.bind(this));
				}
				break;
		}
	}
	_handleTaskMode(isFirst, callback) {
		const base = this.randomOrderTaskElements;
		this._changeProgressTitle();
		if (this.state.task.id == this.testTaskId && this.num < this.numOfObjects) {
			this.setState({
				activeTaskElements: base,
				currentTaskNum: 6,
				enableBtn: true
			});
			this.num = this.numOfObjects;
			callback('done');
		} else if (this.elementsInTask == 1 && this.num < this.numOfObjects) {
			if (this.state.currentTaskNum == 0) {
				this._getBuildingTaskElements(this.state.task, function(resp) {
					this.setState({
						activeTaskElements: resp[this.num],
						currentTaskNum: this.num+1
					});
					this.num += 1;
					if (callback) callback('done');
				}.bind(this));
			} else {
				this.setState({
					activeTaskElements: this.randomOrderTaskElements[this.num],
					currentTaskNum: this.num+1
				});
				this.num += 1;
			}
		} else if (this.elementsInTask == 3 && this.num < this.numOfObjects) {
			if (this.state.currentTaskNum == 0){
				this._getBuildingTaskElements(this.state.task, function(resp) {
					this.setState({
						activeTaskElements: resp.slice(this.num, this.num+3),
						currentTaskNum: this.num + 3
					});
					this.num += 3;
					if (callback) callback('done');
				}.bind(this));
			} else {
				this.setState({
					activeTaskElements: this.randomOrderTaskElements.slice(this.num, this.num+3),
					currentTaskNum: this.num + 3
				});
				this.num += 3;
			}
		} else if (this.num < this.numOfObjects){
				//use all
			this._getBuildingTaskElements(this.state.task, function(resp) {
				this.num = this.numOfObjects;
				this.setState({
					activeTaskElements: resp,
					currentTaskNum: this.num
				});
				if (callback) callback('done');
			}.bind(this));

		} else if (!isFirst){
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
			enableBtn: true,
			hidemap: true
		});
		taskApi.getTask(this.state.taskorder[this.taskMode]).then(elem => {
			elem.buildings = this.taskBuildingOrder[this.taskMode-1];
			this.elementsInTask = elem.num_of_elements;
			this.setState({task: elem});
			this._handleTaskMode(false, function (resp) {
				this.setState({
					map_taskmode: this.elementsInTask
				});
				callback(resp);
			}.bind(this));
		});
	}
	_changeProgressTitle() {
		const progressTitle = ['Test', 'Task 1', 'Task 2', 'Task 3'];
		this.setState({
			title: progressTitle[this.taskMode],
			percent: this.state.percent+6
		});
	}

	render() {
		if (this.state.mode === this.viewState.HOMEVIEW) {
			return (
				<div className="container-fluid">
					<Home onClick={this._handleModeChange}
								taskMode={this.taskMode}
								viewState={this.viewState}
					/>
				</div>
			);
		} else if (this.state.mode === this.viewState.REGISTERVIEW) {
		 	return (
				<div className="container-fluid survey-background">
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
					<div className="d-flex">
						<TaskBoxComponent task={this.state.task}
															testTaskId={this.testTaskId}
															tasknummer={this.taskMode}
															taskview={this.state.mode}
															currentTaskNum={this.state.currentTaskNum}
															elementsInTask={this.state.map_taskmode}
															hidemap={this.state.hidemap}
															activeTaskElements={this.state.activeTaskElements}
															chosenBuildingGeom={this.state.chosenBuildingGeom}
															enableBtn={this.state.enableBtn}
															_setChosenMetadata={this._setChosenMetadata}
															_setElapsedTaskTime={this._setElapsedTaskTime}
															_getNextTaskElements={this._handleTaskMode}
															_changeHideMapState={this._changeHideMapState}
															_changeEnableBtnState={this._changeEnableBtnState}
						/>
							{!this.state.hidemap &&
								<div className="p-2 mapbox" >
										<MapContainer elementsInTask={this.state.map_taskmode}
																	activeTaskElements={this.state.activeTaskElements}
																	_changeEnableBtnState={this._changeEnableBtnState}
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
										taskresultId={this.state.taskresultId}
										viewState={this.viewState}
										_handleModeChange={this._handleModeChange}
					/>
				</div>
				)
		}
	}
}

function saveTaskResult(taskordernumber, geomlay, metalay, timeres, taskorder, participant, task, callback) {
	let result = {};
	let i=0;
	let j=0;
	Object.keys(geomlay).map(elem => {
		geomlay['correct'] = (geomlay['correct']==undefined ? 0 : geomlay['correct']);
		result['total_correct'] = (result['total_correct'] == undefined ? 0 : result['total_correct']);
		geomlay['correct_buildings'] = (geomlay['correct_buildings'] == undefined ? [] : geomlay['correct_buildings']);
		if (geomlay[elem].properties.is_imported) {
			geomlay['correct']++;
			geomlay['correct_buildings'][i] = (geomlay[elem].properties.building_nr);
			result['total_correct'] ++;
			i++;
		}
	});
	Object.keys(metalay).map(elem => {
		metalay['correct'] = (metalay['correct']==undefined ? 0 : metalay['correct']);
		result['total_correct'] = (result['total_correct'] == undefined ? 0 : result['total_correct']);
		metalay['correct_buildings'] = (metalay['correct_buildings'] == undefined ? [] : metalay['correct_buildings']);
		if (metalay[elem].properties.is_imported) {
			metalay['correct']++;
			metalay['correct_buildings'][j] = (metalay[elem].properties.building_nr);
			result['total_correct'] ++;
			j++;
		}
	});
	result['chosenGeomLayer'] = geomlay;
	result['chosenMetadata'] = metalay;
	result['time'] = timeres;
	result['taskorder'] = taskorder;
	result['participant'] = participant.id;
	result['task'] = task.id;
	result['tasknumber'] = task.id;
	result['correct_buildings_geom'] = geomlay['correct_buildings'];
	result['correct_buildings_meta'] = metalay['correct_buildings'];
	result['taskordernumber'] = taskordernumber;


	resultApi.saveTaskResult(result).then(resp => {
		if (callback) callback(resp)
	});

}

function getAllBuildingElements(buildinglist, callback) {
	let x = Math.floor(Math.random() * ((4-1)+1));
	const colormap1 = ['#744fd0', '#dbbe6d', '#790000', '#73388c'];
	const colormap2 = ['#ba96a9', '#203e94', '#508c89', '#90c879'];
	taskApi.getBuildingLayersInTask(buildinglist)
		.then(list => {
			for (let i=0; i<list.length; i++) {
				list[i][0].properties.title = 'Shape ' + (1).toString();
				list[i][0].properties.buildingName = 'Building ' + (i+1).toString();
				list[i][0].properties.buildingColor = colormap1[x];
				list[i][1].properties.title = 'Shape ' + (2).toString();
				list[i][1].properties.buildingName = 'Building ' + (i+1).toString();
				list[i][1].properties.buildingColor = colormap2[x];
				list[i][2] = list[i][0].properties.building_nr;
				if (i === list.length-1){
					callback(list);
				}
			}
		});
}

function shuffle(list) {
	let j, x, i;
	for (i = list.length; i; i--) {
		j = Math.floor(Math.random() * i);
		x = list[i - 1];
		list[i - 1] = list[j];
		list[j] = x;
	}
	return(list);
}
