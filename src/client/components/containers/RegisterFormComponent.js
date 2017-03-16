/**
 * Created by AnneSofie on 02.03.2017.
 */

import React, { Component } from 'react';
import * as taskApi from '../../../client/api/task-api';
import * as resultApi from '../../../client/api/result-api';


//View
import RegisterFormView from '../views/registerFormView';
import AfterEachTaskView from '../views/afterEachTaskSurvey';

export default class RegisterFormComponent extends Component {

	constructor(props) {
		super(props);
		this.state = {
			value: null
		};
		this.participantValues = {
			age: 0,
			gender: 'not selected',
			nationality: 'need input',
			experienced: 'not selected',
			microtasking: 'not selected'
		};
		this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
	}

	handleRegisterSubmit(data, isRegistration) {
		this.participantValues = Object.assign({}, this.participantValues, data);
		if (isRegistration) {
			taskApi.saveParticipant(this.participantValues).then(resp => {
				const participant = resp.data;
				this.props._setParticipantId(participant);
			})
		} else if (!isRegistration){
			resultApi.saveTaskSurvey(data).then(resp => {
				console.log(resp);
				this.props._handleModeChange();
			})
		}

	}

	render() {
		if (this.props.mode == 'register') {
			return (
				<div className="container-fluid">
					<div className="d-flex flex-row justify-content-center">
						<h4>Registration</h4>
						<RegisterFormView
							handleRegisterSubmit={this.handleRegisterSubmit}
							fieldValues={this.participantValues}
						/>
					</div>
				</div>
			)
		} else if (this.props.mode == 'survey') {
			return (
				<div className="">
					<div className="">
						<div className="d-flex flex-row justify-content-center">
							<h4>Survey</h4>
						</div>
						<div className="d-flex flex-row justify-content-center">
							<AfterEachTaskView
								participant={this.props.participant}
								task={this.props.task}
								handleRegisterSubmit={this.handleRegisterSubmit}
							/>
						</div>
					</div>
				</div>
			)
		}
	}

}
