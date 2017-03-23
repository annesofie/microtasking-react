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
		this.difficulty = ['Select', 'Hard', 'Medium', 'Easy'];
		this.countries = ['Norway', 'Germany', 'English', 'Sweden', 'Danish'];
		// this.options = [];
		// this.countries.map((elem, index) => {
		// 	let country = {
		// 		value: elem,
		// 		label: elem
		// 	};
		// 	this.options.push(country);
		// });

		this.saveAndContinue = this.saveAndContinue.bind(this);
		// this.checkInput = this.checkInput.bind(this);
		this.startTaskView = this.startTaskView.bind(this);
		this.setCountryInput = this.setCountryInput.bind(this);
		this.setDifficulty = this.setDifficulty.bind(this);
		this.setEffort = this.setEffort.bind(this);
		this.setInterupted = this.setInterupted.bind(this);
		//this.checkValidation = this.checkValidation.bind(this);
	}

	saveAndContinue() {
		this.initialData.besteffort = this.checkInput(this.initialData.besteffort);
		this.initialData.difficulty = this.checkInput(this.initialData.difficulty);
		this.initialData.interupted = this.checkInput(this.initialData.interupted);
		this.initialData.comment = this.refs.comment.value;
		console.log(this.initialData);
		//this.initialData.besteffort == 'Yes' ? this.initialData.besteffort=true :	this.initialData.besteffort=false;
		//this.initialData.interupted == 'No' ? this.initialData.interupted=false :	this.initialData.interupted=true;
		this.props.handleRegisterSubmit(this.initialData, false);
	}

	setCountryInput(val) {
		this.initialData.country = val.value;
		this.setState({survey: this.initialData});
	}

	setDifficulty(val) {
		console.log(val);
		this.initialData.difficulty = val.value;
		this.setState({survey: this.initialData});
	}
	setEffort(val) {
		console.log(val);
		this.initialData.besteffort = val.value;
		this.setState({survey: this.initialData});
	}
	setInterupted(val) {
		console.log(val);
		this.initialData.interupted = val.value;
		this.setState({survey: this.initialData});
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
				<Form className="pure-form pure-form-aligned" initialData={this.initialData} onSubmit={this.saveAndContinue}>
					<fieldset>

						<LabeledSelect key="difficulty" label="How difficult was this task?" name="difficulty" values={this.difficulty} />
						<LabeledSelect key="besteffort" label="Did you try your best?" name="besteffort" values={this.values}/>
						<LabeledSelect key="interupted" label="Where you interupted during this task?" name="interupted" values={this.values}/>

						<Label>Other comments?
							<textarea className="survey-comment-textarea" name="comment" ref="comment" id="comment-textarea" cols="30" rows="10"/>
						</Label>

						<div className="pure-controls">
							<button className="pure-button pure-button-primary" type="submit">
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
