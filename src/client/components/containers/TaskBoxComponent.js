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
			taskType: (this.props.task.id == this.props.testTaskId ? this.task.INFOTASK : this.task.GEOMTASK),
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
		switch (this.state.taskType) {
			case this.task.METATASK:
				this.props._setChosenMetadata(this.metadata); //Set chosen metadata
				this.setState({
					taskType: this.task.GEOMTASK,
					btnName: 'next'
				});
				this.props._changeHideMapState(false);
				this.props._getNextTaskElements(false, function (resp) {
					console.log(resp);
				});
				this.change=false;
				break;
			case this.task.GEOMTASK:
				this.setState({
					taskType: this.task.METATASK,
					btnName: 'finish'
				});
				this.props._changeHideMapState(true); //Hide map
				this.change=true;
				break;
			case this.task.INFOTASK:
				this.props._changeHideMapState(false); //Show map
				this.setState({taskType: this.task.GEOMTASK});
				break;
			default:
				break;

		}
	}

	_handleTaskChange() {
		let shownTask;
		if (this.state.taskType == this.task.GEOMTASK) {
			let chosenGeomLayer = this._infoClickedLayer();
			const info = (this.props.task.id === this.props.testTaskId) ? <div className="task-div"><hr/><p>
				<i>Remember to use the layer control on the top right of the map.</i><br/><br/>
				The next-button will enable when the number of chosen layers matches the number of buildings in the task. Here you need to select one layer.
				</p></div> : '';
			shownTask =
				<div className="task-div">
					<h4>1. Which geometry to use?</h4>
					<p><i>Click on the correct geometry layer on the map</i></p>
					{chosenGeomLayer.map(elem => {
						return elem;
					})}
					{info}
				</div>;
		} else if (this.state.taskType == this.task.METATASK){
			const info = (this.props.task.id === this.props.testTaskId) ? <div className="task-div"><hr/><p>
				<i>Remember to chose the row which contains the most informative descriptions about the building. </i> <br/><br/>
				The finish-button will enable when the number of chosen layers matches the number of buildings in the task. Here you need to select one since it's only one building.
				</p></div> : '';
			shownTask =
				<div className="meta-tables-inline">
					<MetadataTask
						activeTaskElements={this.props.activeTaskElements}
						elementsInTask={this.props.elementsInTask}
						onChange={this.onMetadataChange}
					/>
					{info}
				</div>;
		} else if (this.state.taskType == this.task.INFOTASK) {
			const intro = this.props.task.description_geom.split('+')[0],
						tekst1 = this.props.task.description_geom.split('+')[1].split('Tip:')[0],
						tip1 = this.props.task.description_geom.split('Tip:')[1],
						tekst2 = this.props.task.description_meta.split('Tip:')[0],
						tip2 = this.props.task.description_meta.split('Tip:')[1].split('+')[0],
						pressnext = this.props.task.description_meta.split('+')[1];

			shownTask = (
				<div className="padding-infotext">
					<p><i>Information about this survey</i></p>
					<hr/>
					<p><b>{intro}</b></p>
					<p>{tekst1}</p>
					<p className="redishcolor">Tip: {tip1}</p>
					<p>{tekst2}</p>
					<p className="redishcolor">Tip: {tip2}</p>
					<p>The layers on the map will change order and color between each task.</p>
					<p className="pressnext"><i>{pressnext}</i></p>
				</div>
				)
		}
		return shownTask;
	}
	_infoClickedLayer() {
		let chosenGeomLayer = [];
		let base = this.props;
		if (base.elementsInTask == base.currentTaskNum) {
			for (let i = 1; i <= base.elementsInTask; i++) {
				chosenGeomLayer[i] = <h5 key={'geom'+i} id="chosenGeom">
					Building {i} : {base.chosenBuildingGeom[i] ? 'You chose ' + base.chosenBuildingGeom[i].properties.title : 'not chosen'}
				</h5>
			}
		} else {
			if (base.elementsInTask == 1) {
				chosenGeomLayer[0] = <h5 key={'geom'+base.currentTaskNum} id="chosenGeom">
					Building {base.currentTaskNum} : {base.chosenBuildingGeom[base.currentTaskNum] ? 'You chose ' + base.chosenBuildingGeom[base.currentTaskNum].properties.title : 'not chosen'}
				</h5>
			} else {
				for (let i = this.props.elementsInTask+1; i < this.props.currentTaskNum; i++) {
					chosenGeomLayer[i] = <h5 key={'geom'+i} id="chosenGeom">
						Building {i} : {base.chosenBuildingGeom[i] ? 'You chose ' + base.chosenBuildingGeom[i].properties.title : 'not chosen'}
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
					<h4 className="task-header">{this.props.task.title}</h4>
					<hr/>
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
