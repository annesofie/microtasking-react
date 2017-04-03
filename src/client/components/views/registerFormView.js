/**
 * Created by AnneSofie on 02.03.2017.
 */

import React, { Component } from 'react';
import {Form, TextInput, Checkbox, Select, Label} from 'react-easy-form';

class RegisterFormView extends Component {

	constructor(props) {
		super(props);

		this.initialData = {
			age: 0,
			gender: '',
			nationality: '',
			experienced: '',
			microtasking: ''
		};

		this.values = ['Select', 'Yes', 'No'];
		this.genderval = ['Select', 'Female', 'Male'];
		this.saveAndContinue = this.saveAndContinue.bind(this);
		this.checkInput = this.checkInput.bind(this);
	}

	saveAndContinue() {
		this.initialData.experienced = this.checkInput(this.initialData.experienced);
		this.initialData.microtasking = this.checkInput(this.initialData.microtasking);
		this.initialData.age = this.refs.age.value;
		this.initialData.nationality = 'unknown';
		this.props.handleRegisterSubmit(this.initialData, true);
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
					<div className="pure-control-group">
						<label>Age</label>
						<input id="register-input" type="number" ref="age" required/>
					</div>

					<LabeledSelect label="Gender" name="gender" values={this.genderval} />
					<LabeledSelect label="Do you have experience of working with spatial data?" name="experienced" values={this.values}/>
					<LabeledSelect label="Have you heard of micro-tasking before?" name="microtasking" values={this.values}/>

					<p style={{textAlign: 'center', color: 'blue', display: this.props.showMessage ? 'block' : 'none'}}>Please select an alternative on every question</p>

					<div className="pure-controls">
						<button className="pure-button pure-button-primary" type="submit">Submit</button>
					</div>
				</fieldset>
			</Form>
		)

	}
}

export default RegisterFormView;
