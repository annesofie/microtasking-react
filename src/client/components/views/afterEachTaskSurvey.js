/**
 * Created by hjemme on 08.03.17.
 */

import React, { Component } from 'react';
import {Form, TextInput, Checkbox, Select, Label} from 'react-easy-form';
// import Select from 'react-select';

class AfterEachTaskSurvey extends Component {

	constructor(props) {
		super(props);

		this.initialData = {
			difficulty: '',
			besteffort: '',
			interupted: '',
			comment: '',
			country: '',
			participant: this.props.participant.id,
			task: this.props.task.id
		};

		this.state = {
			canSubmit: false,
			survey: this.initialData
		};

		// this.values = [{label: 'Yes', value: true}, {label: 'No', value: false}];
		this.values = ['Select', 'Yes', 'No'];

		this.saveAndContinue = this.saveAndContinue.bind(this);
		// this.checkInput = this.checkInput.bind(this);
		this.startTaskView = this.startTaskView.bind(this);
		this.setDifficulty = this.setDifficulty.bind(this);
		//this.checkValidation = this.checkValidation.bind(this);
	}

	saveAndContinue() {
		this.initialData.besteffort = this.checkInput(this.initialData.besteffort);
		this.initialData.interupted = this.checkInput(this.initialData.interupted);
		this.initialData.comment = this.refs.comment.value;
		console.log(this.initialData);
		//this.initialData.besteffort == 'Yes' ? this.initialData.besteffort=true :	this.initialData.besteffort=false;
		//this.initialData.interupted == 'No' ? this.initialData.interupted=false :	this.initialData.interupted=true;
		this.props.handleRegisterSubmit(this.initialData, false);
	}

	setDifficulty(e) {
		this.initialData.difficulty = e.currentTarget.value;
	}

	startTaskView() {
		this.props.handleRegisterSubmit(this.initialData, false, true);
	}

	checkInput(answer) {
		if (answer === 'Select') {
			return undefined;
		} else if (answer === 'Yes') {
			return true;
		} else if (answer === 'No') {
			return false;
		} else {
			return answer;
		}
	}

	render() {
		const LabeledSelect = (props) => (
			<div>
				<Label value={props.label} position="before">
					<Select className="margin-left" {...props} />
				</Label>
			</div>
		);
			return (
				<Form className="pure-form pure-form-aligned small-margin-top" initialData={this.initialData} onSubmit={this.saveAndContinue}>
					<fieldset>

						<div className="row">
							<label className="col-6">How difficult was this task?</label>
							<div className="col-6 d-flex flex-row">
								<p className="">Easy</p>
								<input className="radio-btn-margin" type="radio" name="difficulty" value='1' onChange={this.setDifficulty}/>
								<input className="radio-btn-margin" type="radio" name="difficulty" value='5' onChange={this.setDifficulty}/>
								<input className="radio-btn-margin" type="radio" name="difficulty" value='2' onChange={this.setDifficulty}/>
								<input className="radio-btn-margin" type="radio" name="difficulty" value='3' onChange={this.setDifficulty}/>
								<input className="radio-btn-margin" type="radio" name="difficulty" value='4' onChange={this.setDifficulty}/>
								<p className="">Hard</p>
							</div>
						</div>

						<LabeledSelect key="besteffort" label="Did you try your best?" name="besteffort" values={this.values}/>
						<LabeledSelect key="interupted" label="Where you interupted during this task?" name="interupted" values={this.values}/>

						<Label>Other comments?
							<textarea className="survey-comment-textarea" name="comment" ref="comment" id="comment-textarea" cols="30" rows="10"/>
						</Label>

						<div className="pure-controls">
							<button className="pure-button btn-outline-success" type="submit">
								{this.props.task.id == this.props.testTaskId ?
									'Start tasks':
									'Submit'
								}
							</button>
						</div>

					</fieldset>
				</Form>
			);
	}
}
export default AfterEachTaskSurvey;
