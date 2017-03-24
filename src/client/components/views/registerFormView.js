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
		this.ageGroup = ['Select', '15-25', '36-45', '46-55', '56-65', '66-75', '76-100'];
		this.saveAndContinue = this.saveAndContinue.bind(this);
	}

	saveAndContinue() {
		this.initialData.experienced == 'Yes' ? this.initialData.experienced=true :	this.initialData.experienced=false;
		this.initialData.microtasking == 'Yes' ? this.initialData.microtasking=true :	this.initialData.microtasking=false;
		this.initialData.age = this.refs.age.value;
		this.props.handleRegisterSubmit(this.initialData, true);
	}


	render() {
		const LabeledInput = (props) => (
			<div className="pure-control-group">
				<Label value={props.label} position="before">
					<TextInput id="register-input" {...props}/>
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
					<div className="pure-control-group">
						<label>Age</label>
						<input id="register-input" type="number" ref="age" required/>
					</div>

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

/*<LabeledSelect label="Age" name="age" values={this.ageGroup} placeholder="dkjha" />*/

export default RegisterFormView;
