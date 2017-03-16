/**
 * Created by hjemme on 08.03.17.
 */

import React, { Component } from 'react';
import {Form, TextInput, Checkbox, Select, Label} from 'react-easy-form';

class AfterEachTaskSurvey extends Component {

	constructor(props) {
		super(props);

		this.state = {
			canSubmit: false
		};
		console.log(this.props);
		this.initialData = {
			difficulty: '',
			besteffort: '',
			interupted: '',
			comment: '',
			participant: this.props.participant.id,
			task: this.props.task.id
		};
		this.values = ['Select', 'Yes', 'No'];
		this.difficulty = ['Select', 'Hard', 'Medium', 'Easy'];
		this.saveAndContinue = this.saveAndContinue.bind(this);
		this.checkInput = this.checkInput.bind(this);
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
	//checkValidation() {
	//	if (this.initialData.besteffort == 'Select' || this.initialData.difficulty == 'Select' || this.initialData.interupted == 'Select') {
	//		console.log('invalid');
	//	} else {
	//		console.log('valid');
	//	}
    //
	//}

	render() {
		const LabeledSelect = (props) => (
			<div>
				<Label value={props.label} position="before">
					<Select className="margin-left" {...props} />
				</Label>
			</div>
		);
		return (
			<Form className="pure-form pure-form-aligned margin-top" initialData={this.initialData} onSubmit={this.saveAndContinue}>
				<fieldset>

					<LabeledSelect key="difficulty" label="How difficult was this task?" name="difficulty" values={this.difficulty} />
					<LabeledSelect key="besteffort" label="Did you try your best?" name="besteffort" values={this.values}/>
					<LabeledSelect key="interupted" label="Where you interupted during this task?" name="interupted" values={this.values}/>

					<Label>Other comments?
						<textarea name="comment" ref="comment" id="comment-textarea" cols="30" rows="10"/>
					</Label>

					<div className="pure-controls">
						<button className="pure-button pure-button-primary" type="submit">Submit</button>
					</div>

				</fieldset>
			</Form>
		)

	}
}

//<TextInput className="margin-left margin-top comment-box-size" key="comment" label="Other comments?" name="comment"/>


export default AfterEachTaskSurvey;
