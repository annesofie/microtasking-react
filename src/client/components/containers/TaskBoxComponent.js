/**
 * Created by AnneSofie on 23.02.2017.
 */
import React, { Component, PropTypes } from 'react';

//Views
import MetadataTask from './../views/metadataTask';
import RegisteredAnswerView from './../views/registeredAnswerView';
import MovieView from './../views/movieView';


class TaskBoxComponent extends Component {


	constructor(props) {
		super(props);

		this.task = {
			INFOTASK: 0,
			GEOMTASK: 1,
			METATASK: 2,
			REGISTEREDANSWER: 3
		};

		this.viewState = {
			HOMEVIEW: 'home',
			REGISTERVIEW: 'register',
			TASKDESCRIPTIONVIEW: 'taskdescription',
			TASKVIEW: 'taskview',
			SURVEYVIEW: 'survey'
		};

		this.interval=0;
		this.timeResult = {};

		this.createBooleanArray();

		this.state = {
			taskType: this.task.INFOTASK,
			btnName: 'start',
			shownTask: null,
			showTaskProgress: !(this.props.task.id == this.props.testTaskId),
			checkedMeta: this.checkedVariables,
			answerview: ''
		};
		this.metadata=[];

		this.createBooleanArray=this.createBooleanArray.bind(this);
		this._taskChange = this._taskChange.bind(this);
		this.onMetadataChange = this.onMetadataChange.bind(this);
		this.handleTimeout = this.handleTimeout.bind(this);
		this._timeElapsed = this._timeElapsed.bind(this);
	}

	componentWillUnmount(){
		clearInterval(this.interval);
	}

	createBooleanArray(callback) {
		//Used in checkbox metadata table
		this.checkedVariables={
			0: [],
			1: [],
			count: 0,
			tooMany: false
		};
		for (let i=0; i <= this.props.elementsInTask; i++) {
			this.checkedVariables[0][i] = false;
			this.checkedVariables[1][i] = false;
		}
		if (callback) callback('done');
	}

	onMetadataChange(elem, index, e) {
		if (this.checkedVariables[e.currentTarget.value][index]) {  // Unchecking the row
			delete this.metadata[elem.properties.building_nr+e.currentTarget.value];
			this.checkedVariables[e.currentTarget.value][index] = false;
			this.checkedVariables.tooMany = false;
			this.checkedVariables['count'] --;
		} else if (this.checkedVariables.count >= this.props.elementsInTask){ // Too many rows is selected
			this.checkedVariables.tooMany = true;
		} else {
			this.metadata[elem.properties.building_nr+e.currentTarget.value] = elem;
			this.checkedVariables[e.currentTarget.value][index] = true;
			this.checkedVariables['count'] ++;
		}
		this.setState({checkedMeta: this.checkedVariables});
		this.props._changeEnableBtnState();
	}

	handleTimeout() {
		if (this.props.taskview == this.viewState.TASKVIEW) {
			this.interval = setInterval(this._timeElapsed, 1000);
		} else {
			clearInterval(this.interval);
		}
		if (this.state.answerview == this.task.GEOMTASK) {
			this.setState({
				taskType: this.task.METATASK
			});
		} else if (this.state.answerview == this.task.METATASK) {
			this.setState({
				taskType: this.task.GEOMTASK
			});
			this.props._changeHideMapState(false); //Show map
			this.props._getNextTaskElements(false); //Get next buildings elements in task
		}
	}

	_timeElapsed() {
		const base = this.timeResult;
		base['geomTime'] = (base['geomTime'] == undefined ? 0 : base['geomTime']);
		base['metaTime'] = (base['metaTime'] == undefined ? 0 : base['metaTime']);
		if (this.state.taskType == this.task.GEOMTASK) {
			base['geomTime'] = base['geomTime']+1;
		} else if (this.state.taskType == this.task.METATASK) {
			base['metaTime'] = base['metaTime']+1;
		}
		base['totalTime']=base['geomTime']+base['metaTime'];
	}

	_taskChange() {
		switch (this.state.taskType) {
			case this.task.METATASK:
				this.props._setElapsedTaskTime(this.timeResult);
				this.props._setChosenMetadata(this.metadata); //Set chosen metadata
				clearInterval(this.interval);
					this.setState({
						taskType: this.task.REGISTEREDANSWER,
						btnName: 'next',
						answerview: this.task.METATASK
					});
					setTimeout(this.handleTimeout, 1800);
				break;
			case this.task.GEOMTASK:
				clearInterval(this.interval);
				this.createBooleanArray(function (resp) { //Reset boolean array
					this.setState({
						taskType: this.task.REGISTEREDANSWER,
						btnName: 'finish',
						answerview: this.task.GEOMTASK,
						checkedMeta: this.checkedVariables
					});
					setTimeout(this.handleTimeout, 1500);
				}.bind(this));
				this.props._changeHideMapState(true); //Hide map
				break;
			case this.task.INFOTASK:
				clearInterval(this.interval);
				this.props._changeHideMapState(false); //Show map
				this.setState({
					taskType: this.task.GEOMTASK,
					btnName: 'next'
				});
				this.interval = setInterval(this._timeElapsed, 1000);
				break;
			default:
				break;

		}
	}

	_handleTaskChange() {
		let shownTask;
		const build_s = (this.props.elementsInTask == 1) ? 'building' : 'buildings';
		if (this.state.taskType == this.task.GEOMTASK) {
			let chosenGeomLayer = this._infoClickedLayer();
			const info = (this.props.task.id === this.props.testTaskId) ? <div className="task-div"><hr/><p>
				<i>Question 1 description</i>
				<p>Each task will have one or more buildings. Each building will always be marked with two colors. <br/>
					This training task has two buildings. To answer the first question you need to click on the color on the map that you think fits the shape of the marked buildings best.</p><br/><br/>
				The next-button will enable when all the buildings listed under the question is chosen. Here you have two buildings to select.
				</p></div> : '';
			shownTask =
				<div className="task-div">
					<h5>1. Click on the color that fits the shape of the marked {build_s} on the map best</h5>
					<p className=""><i>Use the zoom on the top left and the layer control on the top right of the map as aids</i></p>
					<div className="margin-top-medium">
						{chosenGeomLayer.map(elem => {
							return elem;
						})}
					</div>
					{info}
				</div>;
		} else if (this.state.taskType == this.task.METATASK){
			const info = (this.props.task.id === this.props.testTaskId) ? <div className=""><hr/><p>
				The finish-button will enable when the number of chosen rows matches the number asked for in the question. The number will vary between one and six. Here you need to select two rows.
				</p></div> : '';
			shownTask =
				<div className="meta-tables-inline">
					<MetadataTask
						activeTaskElements={this.props.activeTaskElements}
						elementsInTask={this.props.elementsInTask}
						checkedMeta={this.state.checkedMeta}
						onChange={this.onMetadataChange}
						tooMany={this.state.checkedMeta.tooMany}
					/>
					{info}
				</div>;
		} else if (this.state.taskType == this.task.INFOTASK) {
			if (this.props.task.id == this.props.testTaskId) {
				const intro = this.props.task.description_geom.split('+')[0],
							tekst1 = this.props.task.description_geom.split('+')[1].split('Tip:')[0],
							tekst2 = this.props.task.description_meta.split('+')[0],
							pressnext = this.props.task.description_meta.split('+')[1];

				shownTask = (
					<div className="padding-infotext">
						<p><i>Information about this survey</i></p>
						<hr/>
						<p><b>{intro}</b></p>
						<p>{tekst1} {tekst2}</p>
						<p><i>First watch the instructions about how to do the survey:</i></p>
						<MovieView/>
						<p>The layers on the map will change order and color between each task.</p>
						<p className="pressnext"><i>{pressnext}</i></p>
					</div>
					)
			} else {
				const text = this.props.task.description_geom.split('+')[0],
							text2 = (this.props.tasknummer == 3 ? 'Get ready for the last task' : 'Get ready for task ' + this.props.tasknummer);
				shownTask = (
					<div className="padding-infotext2">
						<p><b>{text2}</b></p>
						<p>{text}</p>
					</div>
				)
			}
		} else if (this.state.taskType == this.task.REGISTEREDANSWER) {
			const buildingsleftintask = 6 - this.props.currentTaskNum;
			shownTask = <RegisteredAnswerView answerview={this.state.answerview} buildingsleftintask={buildingsleftintask}/>
		}
		return shownTask;
	}
	_infoClickedLayer() {
		let chosenGeomLayer = [];
		let base = this.props;
		if (base.elementsInTask == base.currentTaskNum && base.elementsInTask !== 1) {
			for (let i = 0; i < base.elementsInTask; i++) {
				let buildingNr = this.props.activeTaskElements[i][2];
				chosenGeomLayer[i] = <h5 key={'geom'+i} id="chosenGeom">
					Building {buildingNr} : {base.chosenBuildingGeom[buildingNr] ? 'You chose ' + base.chosenBuildingGeom[buildingNr].properties.title : 'not chosen'}
				</h5>
			}
		} else {
			if (base.elementsInTask == 1) {
				chosenGeomLayer[0] = <h5 key={'geom'+base.currentTaskNum} id="chosenGeom">
					Building {this.props.activeTaskElements[2]} : {base.chosenBuildingGeom[this.props.activeTaskElements[2]] ? 'You chose ' + base.chosenBuildingGeom[this.props.activeTaskElements[2]].properties.title : 'not chosen'}
				</h5>
			} else {
				for (let i = 0; i < this.props.elementsInTask; i++) {
					let buildingNr = this.props.activeTaskElements[i][2];
					chosenGeomLayer[i] = <h5 key={'geom'+i} id="chosenGeom">
						Building {buildingNr} : {base.chosenBuildingGeom[buildingNr] ? 'You chose ' + base.chosenBuildingGeom[buildingNr].properties.title : 'not chosen'}
					</h5>
				}
			}
		}
		return chosenGeomLayer;
	}

	render() {
		let shownTask = this._handleTaskChange();
		let currentTask = (this.props.currentTaskNum/this.props.elementsInTask);
		let totalnum = (6 / this.props.elementsInTask);
		return (
				<div className="p-2 task-box">
					<h4 className="task-header">Task {this.props.tasknummer}. {this.props.task.title}</h4>
					<hr/>
					{shownTask}
					<div className="d-flex justify-content-end margin-top">
						<p className="margin-right" style={{display: this.state.showTaskProgress ? 'inline' : 'none'}}>
							<i>Task {this.props.tasknummer} progress: {currentTask} / {totalnum}</i></p>
						<button className="btn btn-outline-success"
										style={{display: (this.state.taskType == this.task.REGISTEREDANSWER) ? 'none' : 'inline'}}
										onClick={this._taskChange} disabled={!this.props.enableBtn}>
							{this.state.btnName}
						</button>
					</div>
				</div>
		);
	}
}

export default TaskBoxComponent;
