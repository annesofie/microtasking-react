/**
 * Created by AnneSofie on 02.03.2017.
 */

import React, { Component } from 'react';
import * as taskApi from '../../../client/api/task-api';


//View
import RegisterFormView from '../views/registerFormView'

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

	handleRegisterSubmit(data) {
		this.fieldValues = Object.assign({}, this.fieldValues, data);
		taskApi.saveParticipant(this.fieldValues).then(resp => {
			console.log(resp);
			var id = resp.data.id;
			this.props._setParticipantId(id);
		})
	}

	render() {
		return (
			<div className="container-fluid">
				<div className="d-flex flex-column">
					<h4>Registration</h4>
					<RegisterFormView
						handleSubmit={this.handleSubmit}
						handleRegisterSubmit={this.handleRegisterSubmit}
						fieldValues={this.fieldValues}
					/>
				</div>
			</div>
		)
	}

}
