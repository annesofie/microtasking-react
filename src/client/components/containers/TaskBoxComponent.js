/**
 * Created by AnneSofie on 23.02.2017.
 */
import React, { Component, PropTypes } from 'react';

//Views
import MetadataTask from './../views/metadataTask';

class TaskBoxComponent extends Component {


	constructor(props) {
		super(props);

		this.task = {
			INFOTASK: 0,
			GEOMTASK: 1,
			METATASK: 2
		};

		this.state = {
			taskType: (this.props.task.id == 4 ? this.task.INFOTASK : this.task.GEOMTASK),
			btnName: 'next',
			shownTask: null
		};

		this.change=false; //Change taskType
		this.metadata=[];

		this._taskChange = this._taskChange.bind(this);
		this.onMetadataChange = this.onMetadataChange.bind(this);
	}

	onMetadataChange(elem, index, e) {
		this.metadata[e.currentTarget.value] = elem;
		this.props._changeEnableBtnState();
	}

	_taskChange() {
		if (this.state.taskType == this.task.METATASK) {
			this.props._setChosenMetadata(this.metadata); //Set chosen metadata
			//reset
			this.setState({
				taskType: this.task.GEOMTASK,
				btnName: 'next'
			});
			this.props._changeHideMapState(false);
			this.props._getNextTaskElements(false, function (resp) {
				console.log(resp);
			});
			this.change=false;
		} else if(this.state.taskType == this.task.GEOMTASK) {
			this.setState({
				taskType: this.task.METATASK,
				btnName: 'finish'
			});
			this.props._changeHideMapState(true);
			this.change=true;
		} else if (this.state.taskType == this.task.INFOTASK) {
			this.setState({taskType: this.task.GEOMTASK})
		}
	}

	_handleTaskChange() {
		let shownTask;
		if (this.state.taskType == this.task.GEOMTASK) {
			let chosenGeomLayer = this._infoClickedLayer();
			shownTask =
				<div className="task-div">
					<h4>1. Which geometry to use?</h4>
					{chosenGeomLayer.map(elem => {
						return elem;
					})}
				</div>;
		} else if (this.state.taskType == this.task.METATASK){
			shownTask =
				<div className="meta-tables-inline">
					<MetadataTask
						activeTaskElements={this.props.activeTaskElements}
						elementsInTask={this.props.elementsInTask}
						onChange={this.onMetadataChange}
					/>
				</div>;
		} else if (this.state.taskType == this.task.INFOTASK) {
			shownTask = (
				<div>
					<p>{this.props.task.description_geom}</p>
					<p>{this.props.task.description_meta}</p>
				</div>
				)
		}
		return shownTask;
	}
	_infoClickedLayer() {
		let chosenGeomLayer = [];
		let base = this.props;
		console.log(base.chosenBuildingGeom);
		if (base.elementsInTask == base.currentTaskNum) {
			for (let i = 1; i <= base.elementsInTask; i++) {
				chosenGeomLayer[i] = <h5 key={'geom'+i} id="chosenGeom">
					Building {i} : {base.chosenBuildingGeom[i] ? 'You chose ' + base.chosenBuildingGeom[i].properties.title : 'not chosen, click on a layer on the map'}
				</h5>
			}
		} else {
			if (base.elementsInTask == 1) {
				chosenGeomLayer[0] = <h5 key={'geom'+base.currentTaskNum} id="chosenGeom">
					Building {base.currentTaskNum} : {base.chosenBuildingGeom[base.currentTaskNum] ? 'You chose ' + base.chosenBuildingGeom[base.currentTaskNum].properties.title : 'not chosen, click on the correct building layer on the map'}
				</h5>
			} else {
				for (let i = this.props.elementsInTask+1; i < this.props.currentTaskNum; i++) {
					chosenGeomLayer[i] = <h5 key={'geom'+i} id="chosenGeom">
						Building {i} : {base.chosenBuildingGeom[i] ? 'You chose ' + base.chosenBuildingGeom[i].properties.title : 'not chosen, click on the correct building layer on the map'}
					</h5>
				}
			}
		}
		return chosenGeomLayer;
	}

	render() {
		let shownTask = this._handleTaskChange();
		// let desc = !this.change ? this.props.task.description_geom : this.props.task.description_meta;
		return (
				<div className="p-2 task-box">
					<h4>{this.props.task.title}</h4>
					{/*<p>{desc}</p>*/}
					{shownTask}
					<div className="d-flex justify-content-end">
						<button className="btn-sm btn-outline-secondary choose-btn" onClick={this._taskChange} disabled={!this.props.enableBtn}>
							{this.state.btnName}
						</button>
					</div>
				</div>
		);
	}
}

export default TaskBoxComponent;

//TaskBoxComponent.propTypes = {
//	btnName: PropTypes.string
//};
//TaskBoxComponent.defaultProps = {
//	btnName: 'next'
//};
