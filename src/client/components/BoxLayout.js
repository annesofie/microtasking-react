/**
 * Created by AnneSofie on 19.02.2017.
 */
import React, {Component} from 'react';

class BoxLayout extends Component {

	render() {
		return (
			<div className="d-flex flex-row justify-content-center task-map-box">
				<div className="p-2 task-box">
					<h4 className="task-header"><i>First task</i></h4>
					<div className="task-div">
						<h6>Which geometry to use?</h6>
						<button type="button" className="btn btn-outline-secondary choose-btn">Object 1</button>
						<button type="button" className="btn btn-outline-secondary choose-btn">Object 2</button>
					</div>
					<div className="task-div">
						<h6>Which metadata to use?</h6>
						<button type="button" className="btn btn-outline-secondary choose-btn">Object 1</button>
						<button type="button" className="btn btn-outline-secondary choose-btn">Object 2</button>
						<button type="button" className="btn btn-outline-secondary choose-btn">Both</button>
					</div>
				</div>
				<div className="p-2 map-box">
					{this.props.children}
				</div>
			</div>
		);
	}
}

export default BoxLayout;
