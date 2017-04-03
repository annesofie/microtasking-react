/**
 * Created by hjemme on 23.03.17.
 */
import React, { Component } from 'react';

class RegisteredAnswerView extends Component {

	constructor(props) {
		super(props);

		this.task = {
			INFOTASK: 0,
			GEOMTASK: 1,
			METATASK: 2,
			REGISTEREDANSWER: 3
		};

	}

	render() {
		const text = (this.props.answerview == this.task.GEOMTASK ? 'Get ready for question two' : 'Good work!');
		return (
			<div className="d-flex flex-column align-content-center">
				<div className="wrapper">
					<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
						 viewBox="0 0 98.5 98.5" enableBackground="new 0 0 98.5 98.5">
						<path className="checkmark2" fill="none" strokeWidth="8" strokeMiterlimit="10" d="M81.7,17.8C73.5,9.3,62,4,49.2,4
						C24.3,4,4,24.3,4,49.2s20.3,45.2,45.2,45.2s45.2-20.3,45.2-45.2c0-8.6-2.4-16.6-6.5-23.4l0,0L45.6,68.2L24.7,47.3"/>
					</svg>
				</div>
				<p className="great-job">{text}</p>
			</div>
		)
	}
}

export default RegisteredAnswerView;
