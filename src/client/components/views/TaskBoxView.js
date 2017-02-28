/**
 * Created by AnneSofie on 23.02.2017.
 */
import React, { Component, PropTypes } from 'react';

//Views
import MetadataTask from './metadataTask';

class TaskBoxView extends Component {

	constructor(props) {
		super(props);
		this.state = {
			taskmode: 'geom_task',
			nameBtn: 'next',
			count: 1,
			shownTask: null
		};
		this.change=0;
		this._taskChange = this._taskChange.bind(this);
	}

	componentDidMount(){
		//this.setState({shownTask: this._handleTaskChange()});
		//console.log(this.state);
	}

	_taskChange() {
		if (this.change == 1) {
			//reset
			this.setState({taskmode: 'geom_task'});
			this.setState({nameBtn: 'next'});
			this.props._getNextTask();
			this.change=0;
		} else {
			this.setState({taskmode: 'meta_task'});
			this.setState({nameBtn: 'finish'});
			this.setState({count: this.state.count+=1});
			this.change=1;
		}
	}

	_handleTaskChange() {
		let shownTask;
		if (this.state.taskmode == 'geom_task') {
			let chosenGeomLayer = this._infoClickedLayer();
			shownTask =
				<div className="task-div">
					<h5>Which geometry to use?</h5>
					{chosenGeomLayer}
				</div>;
		} else if (this.state.taskmode == 'meta_task'){
			shownTask =
				<MetadataTask
					activeTaskObj1={this.props.activeTaskObj1}
					taskElemConflPair={this.props.taskElemConflPair}
					taskmode={this.props.taskmode}
				/>;
		}
		return shownTask;
	}

	_infoClickedLayer() {
		let chosenGeomLayer;
		let num = this.state.count;
		var base = this.props;
			chosenGeomLayer = <h6 id="chosenGeom">
				Building {num} = {base.chosenBuildingGeom ? base.chosenBuildingGeom.feature.properties.title : 'not chosen'}
			</h6>;
		return chosenGeomLayer;
	}

	render() {
		let shownTask = this._handleTaskChange();
		return (
				<div className="p-2 task-box">
					<h4>{this.props.task.title}</h4>
					<p>{this.props.task.description}</p>
					{shownTask}
					<div className="next-btn">
						<button className="btn-sm btn-outline-secondary choose-btn" onClick={this._taskChange}>
							{this.state.nameBtn}
						</button>
					</div>
				</div>
		);
	}
}

export default TaskBoxView;

//TaskBoxView.propTypes = {
//	btnName: PropTypes.string
//};
//TaskBoxView.defaultProps = {
//	btnName: 'next'
//};
