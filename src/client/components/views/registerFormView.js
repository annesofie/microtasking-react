/**
 * Created by AnneSofie on 02.03.2017.
 */

import React, { Component } from 'react';
import {Form, TextInput, Checkbox, Select, Label} from 'react-easy-form';

class RegisterFormView extends Component {

	constructor(props) {
		super(props);

		this.initialData = {
			age: '',
			gender: '',
			nationality: '',
			experienced: '',
			microtasking: ''
		};
		this.values = [null, 'Yes', 'No'];
		this.genderval = [null, 'Female', 'Male'];
		this.ageGroup = [undefined, '15-25', '36-45', '46-55', '56-65', '66-75', '76-100'];
		this.saveAndContinue = this.saveAndContinue.bind(this);
	}

	saveAndContinue() {
		var data = {
			age: this.refs.age.value,
			gender: this.refs.gender.value,
			nationality: this.refs.nationality.value,
			experienced: this.refs.experienced.value,
			microtasking: this.refs.microtasking.value
		};

		this.props.handleRegisterSubmit(data);
	}


	render() {
		const LabeledInput = (props) => (
			<div className="pure-control-group">
				<Label value={props.label} position="before">
					<TextInput {...props}/>
				</Label>
			</div>
		);
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
					<LabeledSelect label="Age" name="age" values={this.ageGroup} placeholder="dkjha" />
					<LabeledInput label="Nationality" name="nationality" required/>
					<LabeledSelect label="Gender" name="gender" values={this.genderval} />
					<LabeledSelect label="Do you have experience of working with spatialdata?" name="experienced" values={this.values}/>
					<LabeledSelect label="Have you heard of micro-tasking before?" name="microtasking" values={this.values}/>

					<div className="pure-controls">
						<button className="pure-button pure-button-primary" type="submit">Submit</button>
					</div>
				</fieldset>
			</Form>
		)
	}
}

export default RegisterFormView;
