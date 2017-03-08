/**
 * Created by hjemme on 08.03.17.
 */

import React, { Component } from 'react';
import {Form, TextInput, Checkbox, Select, Label} from 'react-easy-form';

class AfterEachTaskSurvey extends Component {

	constructor(props) {
		super(props);

		this.initialData = {
			difficulty: '',
			besteffort: '',
			interupted: ''
		};
		this.values = [null, 'Yes', 'No'];
		this.difficulty = [null, 'Hard', 'Medium', 'Easy'];
		this.saveAndContinue = this.saveAndContinue.bind(this);
	}

	saveAndContinue() {
		console.log(this.initialData);
		this.initialData.besteffort == 'Yes' ? this.initialData.besteffort=true :	this.initialData.besteffort=false;
		this.initialData.interupted == 'Yes' ? this.initialData.interupted=true :	this.initialData.interupted=false;
		this.props.handleRegisterSubmit(this.initialData, false);
	}


	render() {
		const LabeledSelect = (props) => (
			<div className="pure-control-group">
				<Label value={props.label} position="before">
					<Select {...props} required>
						<option value={null} disabled>Age</option>
					</Select>
				</Label>
			</div>
		);
		return (
			<Form className="pure-form pure-form-aligned" initialData={this.initialData} onSubmit={this.saveAndContinue}>
				<fieldset>
					<LabeledSelect label="How difficult was this task?" name="difficulty" values={this.difficulty} />
					<LabeledSelect label="Did you try your best?" name="besteffort" values={this.values}/>
					<LabeledSelect label="Where you interupted during this task?" name="interupted" values={this.values}/>

					<div className="pure-controls">
						<button className="pure-button pure-button-primary" type="submit">Submit</button>
					</div>
				</fieldset>
			</Form>
		)

	}
}

/*<LabeledSelect label="Age" name="age" values={this.ageGroup} placeholder="dkjha" />*/

export default AfterEachTaskSurvey;
