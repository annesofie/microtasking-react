/**
 * Created by AnneSofie on 16.02.2017.
 */

import React, { Component } from 'react'
import {Link} from 'react-router'


class HeaderComponent extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		if (this.props.taskMode == 3) {

			return (
				<div id="header" className="start-view">
					<div className="d-flex flex-row justify-content-center">
						<h3 className="header-text">Thank you for your contributions!</h3>
					</div>
					<div className="d-flex flex-row justify-content-center">
						<h5>The results will be available in mid june</h5>
					</div>
				</div>
			)

		} else {

			return (
					<div id="header" className="start-view">
						<div className="d-flex flex-row justify-content-center">
							<h1 className="header-text">Welcome to Micro tasking Survey</h1>
						</div>
						<div className="d-flex flex-row justify-content-center">
							<h3>Optimizing the micro-tasking workflow</h3>
						</div>
						<div id="start-survey-btn-div" className="d-flex flex-row justify-content-center">
							<button type="button" className="big-btn pure-button btn-outline-success" onClick={this.props.onClick}>Start Survey</button>
						</div>
					</div>
			)
		}
	}
}

export default HeaderComponent;

//<Link to="/users">
//	<button type="button" className="btn btn-outline-secondary start-survey">Get Users</button>
//</Link>
//<Link to="/tasks">
//	<button type="button" className="btn btn-outline-secondary start-survey">Get Tasks</button>
//</Link>
