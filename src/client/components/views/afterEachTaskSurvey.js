/**
 * Created by hjemme on 08.03.17.
 */

import React, { Component } from 'react';
// import {Form, TextInput, Checkbox, Select, Label} from 'react-easy-form';
import Select from 'react-select';

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

		this.values = [{label: 'Yes', value: true}, {label: 'No', value: false}];
		// this.difficulty = ['Select', 'Hard', 'Medium', 'Easy'];
		this.countries = ['Norway', 'Germany', 'English', 'Sweden', 'Danish'];
		this.options = [];
		this.countries.map((elem, index) => {
			let country = {
				value: elem,
				label: elem
			};
			this.options.push(country);
		});

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
		// this.initialData.besteffort = this.checkInput(this.initialData.besteffort);
		// this.initialData.difficulty = this.checkInput(this.initialData.difficulty);
		// this.initialData.interupted = this.checkInput(this.initialData.interupted);
		this.initialData.comment = this.refs.comment.value;
		console.log(this.initialData);
		//this.initialData.besteffort == 'Yes' ? this.initialData.besteffort=true :	this.initialData.besteffort=false;
		//this.initialData.interupted == 'No' ? this.initialData.interupted=false :	this.initialData.interupted=true;
		// setTimeout(this.props.handleRegisterSubmit(this.initialData, false), 5000);
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
			return (
				<form onSubmit={this.saveAndContinue}>
					<label>
						Name:
						<input type="text" value={this.state.value} onChange={this.handleChange} />
					</label>
					<input type="submit" value="Submit" />
				</form>
			);
	}
}

//{(this.props.task.id == this.props.testTaskId) ?
//	<button className="pure-button pure-button-primary" type="submit">Start tasks</button> : }
//<TextInput className="margin-left margin-top comment-box-size" key="comment" label="Other comments?" name="comment"/>

{/*<form onSubmit={this.saveAndContinue}>*/}
	{/*<div className="form-group row">*/}
		{/*<label className="col-6 col-form-label">Other comments?</label>*/}
		{/*<div className="col-6">*/}
			{/*<textarea className="survey-comment-textarea" ref="comment" id="comment-textarea" cols="30" rows="10"/>*/}
		{/*</div>*/}
	{/*</div>*/}
	{/*<div className="form-group row">*/}
		{/*<button className="pure-button pure-button-primary" type="submit" value="Submit">*/}
			{/*{this.props.task.id == this.props.testTaskId ?*/}
				{/*'Start tasks':*/}
				{/*'Submit'*/}
			{/*}*/}
		{/*</button>*/}
	{/*</div>*/}
{/*</form>*/}


// <div className="form-group row">
// 	<label className="col-6 col-form-label">How difficult was this task? </label>
// 	<div className="col-6">
// 		<Select value={this.state.survey.difficulty} options={this.values} onChange={this.setDifficulty}/>
// 	</div>
// </div>
// <div className="form-group row">
// 	<label className="col-6 col-form-label">Did you try your best?</label>
// <div className="col-6">
// 	<Select value={this.state.survey.besteffort} options={this.values} onChange={this.setEffort}/>
// 	</div>
// 	</div>
// 	<div className="form-group row">
// 	<label className="col-6 col-form-label">Where you interupted during this task? </label>
// <div className="col-10">
// 	<Select value={this.state.survey.interupted} options={this.values} onChange={this.setInterupted}/>
// 	</div>
// 	</div>
// 	<div className="form-group row">
// 	<label className="col-6 col-form-label">Which country are you from?</label>
// <div className="col-6">
// 	<Select value={this.state.survey.country} options={this.options} onChange={this.setCountryInput}/>
// 	</div>
// 	</div>
export default AfterEachTaskSurvey;
