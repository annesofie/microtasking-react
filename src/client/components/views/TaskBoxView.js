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
		this._taskChange = this._taskChange.bind(this);
	}

	_taskChange() {
		this.setState({taskmode: 'meta_task'});
		this.setState({nameBtn: 'finish'});
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
		var base = this.props;
		chosenGeomLayer = <h6 id="chosenGeom">
			Building 1 = {base.B1 ? base.B1.feature.properties.title : 'not chosen'}
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
//
//<Table elem={this.props.taskelements.features}/>
//<Table elem={this.props.conflictelements.features}/>
//{this.props.taskelements.features.map(elem => {
//	return (
//		<p key={elem.id}><i>{elem.properties.element_name}</i></p>
//	)
//})}
