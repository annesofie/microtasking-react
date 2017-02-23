/**
 * Created by AnneSofie on 23.02.2017.
 */

import React, {Component} from 'react';

class TaskBoxView extends Component {

	render() {
		return (
				<div className="p-2 task-box">
					<h3>{this.props.task.title}</h3>
					<p>{this.props.task.description}</p>
					{this.props.taskelements.features.map(elem => {
						return (
							<p key={elem.id}><i>{elem.properties.element_name}</i></p>
						)
					})}
					<div className="task-div">
						<h6>Which geometry to use?</h6>
						<i>Click on the correct geometry on the map</i>
					</div>
					<div className="task-div">
						<h6>Which metadata to use?</h6>
						<button type="button" className="btn btn-outline-secondary choose-btn">Object 1</button>
						<button type="button" className="btn btn-outline-secondary choose-btn">Object 2</button>
						<button type="button" className="btn btn-outline-secondary choose-btn">Both</button>
					</div>
					<footer>
						<button className="btn btn-outline-secondary choose-btn">Next</button>
					</footer>
				</div>
		);
	}
}

export default TaskBoxView;
