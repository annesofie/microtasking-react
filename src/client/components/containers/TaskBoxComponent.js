/**
 * Created by AnneSofie on 23.02.2017.
 */
import React, { Component, PropTypes } from 'react';

//Views
import MetadataTask from './../views/metadataTask';
import RegisteredAnswerView from './../views/registeredAnswerView';

class TaskBoxComponent extends Component {


	constructor(props) {
		super(props);

		this.task = {
			INFOTASK: 0,
			GEOMTASK: 1,
			METATASK: 2,
			REGISTEREDANSWER: 3
		};

		this.createBooleanArray(function () {

		}.bind(this));

		this.state = {
			taskType: (this.props.task.id == this.props.testTaskId ? this.task.INFOTASK : this.task.GEOMTASK),
			btnName: 'next',
			shownTask: null,
			showTaskProgress: !(this.props.task.id == this.props.testTaskId),
			checkedMeta: this.checkedVariables
		};

		this.change=false; //Change taskType
		this.metadata=[];

		this.createBooleanArray=this.createBooleanArray.bind(this);
		this._taskChange = this._taskChange.bind(this);
		this.onMetadataChange = this.onMetadataChange.bind(this);
		this.handleTimeout = this.handleTimeout.bind(this);
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
		callback('done');
	}

	onMetadataChange(elem, index, e) {
		// console.log(parseInt(e.currentTarget.value) + ' , ' + index + ' , ' + elem.properties.building_nr);
		if (this.checkedVariables[e.currentTarget.value][index]) {  //Is unselected
			delete this.metadata[elem.properties.building_nr+e.currentTarget.value];
			this.checkedVariables[e.currentTarget.value][index] = false;
			this.checkedVariables.tooMany = false;
			this.checkedVariables['count'] --;
		} else if (this.checkedVariables.count >= this.props.elementsInTask){
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
		this.setState({
			taskType: this.task.METATASK
		});
	}

	_taskChange() {
		switch (this.state.taskType) {
			case this.task.METATASK:
				this.props._setChosenMetadata(this.metadata); //Set chosen metadata
				this.setState({
					taskType: this.task.GEOMTASK,
					btnName: 'next'
				});
				this.props._changeHideMapState(false);
				this.props._getNextTaskElements(false, function (resp) {
					//console.log(resp);
				});
				this.change=false;
				break;
			case this.task.GEOMTASK:
				this.createBooleanArray(function (resp) { //Reset boolean array
					this.setState({
						taskType: this.task.REGISTEREDANSWER,
						btnName: 'finish',
						checkedMeta: this.checkedVariables,
					});
					setTimeout(this.handleTimeout, 1000);
				}.bind(this));
				this.props._changeHideMapState(true); //Hide map
				this.change=true;
				break;
			case this.task.INFOTASK:
				this.props._changeHideMapState(false); //Show map
				this.setState({
					taskType: this.task.GEOMTASK,
				});
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
				<i>Each task will have one or more buildings and each building will always be marked with two colors. This training task has two buildings. To answer the first question you need to click on the color on the map that you think fits the marked buildings best.</i><br/><br/>
				The next-button will enable when all the buildings listed under the question is chosen. Here you have two buildings to select.
				</p></div> : '';
			shownTask =
				<div className="task-div">
					<h5>1. Click on the color that fits the marked {build_s} on the map best</h5>
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
				<i>In this task chose the row which contains the most informative descriptions about an arbitrary building. Think that the information should be informative for everyone, independent of education, background etc.
				</i> <br/><br/>
				The finish-button will enable when the number of chosen rows matches the number asked for in the question. The number will vary between one and six. Here you need to select two row's since it's two buildings.
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
			const intro = this.props.task.description_geom.split('+')[0],
						tekst1 = this.props.task.description_geom.split('+')[1].split('Tip:')[0],
						// tip1 = this.props.task.description_geom.split('Tip:')[1],
						tekst2 = this.props.task.description_meta.split('+')[0],
						// tip2 = this.props.task.description_meta.split('Tip:')[1].split('+')[0],
						pressnext = this.props.task.description_meta.split('+')[1];

			shownTask = (
				<div className="padding-infotext">
					<p><i>Information about this survey</i></p>
					<hr/>
					<p><b>{intro}</b></p>
					<p>{tekst1}</p>
					{/*<p className="redishcolor">Tip: {tip1}</p>*/}
					<p>{tekst2}</p>
					{/*<p className="redishcolor">Tip: {tip2}</p>*/}
					<p>The layers on the map will change order and color between each task.</p>
					<p className="pressnext"><i>{pressnext}</i></p>
				</div>
				)
		} else if (this.state.taskType == this.task.REGISTEREDANSWER) {
			shownTask = <RegisteredAnswerView/>
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
		// let desc = !this.change ? this.props.task.description_geom : this.props.task.description_meta;
		return (
				<div className="p-2 task-box">
					<h4 className="task-header">{this.props.tasknummer}. {this.props.task.title}</h4>
					<hr/>
					{shownTask}
					<div className="d-flex justify-content-end margin-top">
						<p className="margin-right margin-top" style={{display: this.state.showTaskProgress ? 'inline' : 'none'}}>
							Task {this.props.tasknummer} progress: {currentTask} / {totalnum}</p>
						<button className="btn-sm btn-outline-secondary choose-btn"
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
