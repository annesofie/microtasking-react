/**
 * Created by AnneSofie on 23.02.2017.
 */
import React, {Component} from 'react';

//Views
import MetadataTask from './metadataTask';

class TaskBoxView extends Component {

	constructor(props) {
		super(props);
		this.state = {
			taskmode: 'geom_task',
			nameBtn: 'next'
		};
		// this._handleTaskChange = this._handleTaskChange.bind(this);
		this._taskChange = this._taskChange.bind(this);
	}

	_taskChange() {
		console.log(this.state.taskmode);
		this.setState({taskmode: 'meta_task'});
		this.setState({nameBtn: 'finish'});
	}

	_handleTaskChange() {
		let shownTask;
		if (this.state.taskmode == 'geom_task') {
			let chosenGeomLayer = this._setChosenGeomLayer();
			shownTask =
				<div className="task-div">
					<h5>Which geometry to use?</h5>
					{chosenGeomLayer}
				</div>;
		} else if (this.state.taskmode == 'meta_task'){
			shownTask =
				<MetadataTask
					activeTaskObj1={this.props.activeTaskObj1}
					taskmode={this.props.taskmode}
				/>;
		}
		return shownTask;
	}

	_setChosenGeomLayer() {
		let chosenGeomLayer;
		if(this.props.chosenGeomLayer) {
			chosenGeomLayer = <h6 id="chosenGeom">You chose {this.props.chosenGeomLayer.feature.properties.title}</h6>;
		} else {
			chosenGeomLayer = <h7>Click on the object you believe is the right one</h7>
		}
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
//
//<Table elem={this.props.taskelements.features}/>
//<Table elem={this.props.conflictelements.features}/>
//{this.props.taskelements.features.map(elem => {
//	return (
//		<p key={elem.id}><i>{elem.properties.element_name}</i></p>
//	)
//})}
