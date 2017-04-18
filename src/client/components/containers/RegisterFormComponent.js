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
			value: null,
			showMessage: false
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
			taskApi.saveParticipant(this.participantValues)
				.then(resp => {
					if (resp.response && resp.response.status == 400) {
						this.setState({showMessage: true});
					} else {
						const participant = resp.data;
						this.props._setParticipantId(participant);
					}
				})
		} else if (!isRegistration){
				resultApi.saveTaskSurvey(data).then(resp => {
					console.log(resp);
					if (resp.response && resp.response.status == 400) {
						this.setState({showMessage: true});
					} else {
						this.props._handleModeChange();
					}
				})
		}

	}

	render() {
		if (this.props.mode == 'register') {
			return (
				<div className="container-fluid">
					<div className="d-flex flex-row justify-content-center padding-top">
						<h4>Registration</h4>
						<RegisterFormView
							handleRegisterSubmit={this.handleRegisterSubmit}
							fieldValues={this.participantValues}
							showMessage={this.state.showMessage}
						/>
					</div>
				</div>
			)
		} else if (this.props.mode == 'survey') {
				return (
					<div className="padding-survey">
							<div className="d-flex flex-row justify-content-center">
								<h4>Survey</h4>
							</div>
							<div className="">
								{(this.props.task.id == this.props.testTaskId) ?
								<div><hr/><p className="survey-info-testtask"><i>After each task there will be a survey. The survey is shown under. Select one option at every question and write any comments if you have. The training task is now finish, fill out the form and press the button to get started on the tasks.</i></p><hr/></div>:
								<div><hr/><p className="survey-info-testtask"><i>Select one option at every question, and write a comment if you have, then click submit to start the next task</i></p><hr/></div>
								}
							</div>
							<div className="d-flex flex-row justify-content-center">
								<AfterEachTaskView
									participant={this.props.participant}
									task={this.props.task}
									testTaskId={this.props.testTaskId}
									handleRegisterSubmit={this.handleRegisterSubmit}
									showMessage={this.state.showMessage}
								/>
							</div>
					</div>
				);
		}
	}

}
