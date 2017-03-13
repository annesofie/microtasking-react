/**
 * Created by AnneSofie on 02.03.2017.
 */

import React, { Component } from 'react';
import * as taskApi from '../../../client/api/task-api';


//View
import RegisterFormView from '../views/registerFormView';
import AfterEachTaskView from '../views/afterEachTaskSurvey';

export default class RegisterFormComponent extends Component {

	constructor(props) {
		super(props);
		this.state = {
			value: null
		};
		this.fieldValues = {
			age: 0,
			gender: 'not selected',
			nationality: 'need input',
			experienced: 'not selected',
			microtasking: 'not selected'
		};
		this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
	}

	handleRegisterSubmit(data, isRegistration) {
		this.fieldValues = Object.assign({}, this.fieldValues, data);
		if (isRegistration) {
			taskApi.saveParticipant(this.fieldValues).then(resp => {
				console.log(resp);
				const id = resp.data.id;
				this.props._setParticipantId(id);
			})
		} else if (!isRegistration){
			console.log('handle register form');
			this.props.handleModeChange();
		}

	}

	render() {
		if (this.props.mode == 'register') {
			return (
				<div className="container-fluid">
					<div className="d-flex flex-column">
						<h4>Registration</h4>
						<RegisterFormView
							handleRegisterSubmit={this.handleRegisterSubmit}
							fieldValues={this.fieldValues}
						/>
					</div>
				</div>
			)
		} else if (this.props.mode == 'survey') {
			return (
				<div className="container-fluid">
					<div className="d-flex justify-content-center">
						<h4>Survey</h4>
						<AfterEachTaskView
							handleRegisterSubmit={this.handleRegisterSubmit}
						/>
					</div>
				</div>
			)
		}
	}

}
