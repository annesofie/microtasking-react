/**
 * Created by AnneSofie on 23.02.2017.
 */
import React, { Component, PropTypes } from 'react';

//Views
import MetadataTask from './../views/metadataTask';

class TaskBoxComponent extends Component {

	constructor(props) {
		super(props);

		this.state = {
			taskType: 'geom_task',
			nameBtn: 'next',
			count: 1,
			shownTask: null
		};

		this.change=false; //Change taskType
		this.metadata={};

		this._taskChange = this._taskChange.bind(this);
		this.onMetadataChange = this.onMetadataChange.bind(this);
	}

	onMetadataChange(index, e) {
		if (index) {
			this.metadata[index] = e.currentTarget.value;
		} else {
			this.metadata[0] = e.currentTarget.value;
		}
		console.log('metadata press');
		this.props._changeEnableBtnState();
	}

	_taskChange() {
		if (this.change) {
			this.props._setChosenMetadata(this.metadata); //Set chosen metadata
			//reset
			this.setState({
				taskType: 'geom_task',
				nameBtn: 'next'
			});
			this.props._changeHideMapState(false);
			this.props._getNextTaskElements(false, function (resp) {
				console.log(resp);
			});
			this.change=false;
		} else {
			this.setState({
				taskType: 'meta_task',
				nameBtn: 'finish',
				count: this.state.count+=1
			});
			this.props._changeHideMapState(true);
			this.change=true;
		}
	}

	_handleTaskChange() {
		let shownTask;
		if (this.state.taskType == 'geom_task') {
			let chosenGeomLayer = this._infoClickedLayer();
			shownTask =
				<div className="task-div">
					<h4>1. Which geometry to use?</h4>
					{chosenGeomLayer.map(elem => {
						return elem;
					})}
				</div>;
		} else if (this.state.taskType == 'meta_task'){
			shownTask =
				<MetadataTask
					activeTaskElements={this.props.activeTaskElements}
					elementsInTask={this.props.elementsInTask}
					onChange={this.onMetadataChange}
				/>;
		}
		return shownTask;
	}
	_infoClickedLayer() {
		let chosenGeomLayer = [];
		let base = this.props;
		console.log(base.chosenBuildingGeom);
		if (base.elementsInTask == base.currentTaskNum) {
			for (let i = 1; i <= base.currentTaskNum; i++) {
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
		let desc = !this.change ? this.props.task.description_geom : this.props.task.description_meta;
		return (
				<div className="p-2 task-box">
					<h4>{this.props.task.title}</h4>
					<p>{desc}</p>
					{shownTask}
					<div className="d-flex justify-content-end">
						<button className="btn-sm btn-outline-secondary choose-btn" onClick={this._taskChange} disabled={!this.props.enableBtn}>
							{this.state.nameBtn}
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
