/**
 * Created by hjemme on 26.02.17.
 */
import React, {Component} from 'react';

//Presentational Components should never change the prop data itself.
//In fact, any component that receives props should consider that data immutable and owned by the parent.

class metadataTask extends Component{

	setInputInMetaTable() {
		var tableTaskPair;
		if (this.props.elementsInTask == 1){
			var base = this.props.activeTaskElements;
			tableTaskPair = (
					<tbody>
						<tr key="colelem">
							<td key={0.1+base[0].id}><input className="margin-right" type="checkbox" name="meta_choice" checked={this.props.checkedMeta[0][0]} value='0' onChange={this.props.onChange.bind(this, base[0], 0)}/>
							</td>
							<td key={1+base[0].id}>{base[0].properties.info1}</td>
							<td key={2+base[0].id}>{base[0].properties.info2}</td>
							<td key={3+base[0].id}>{base[0].properties.info3}</td>
						</tr>
						<tr key="colconfl">
							<td key={0.1+base[1].id}><input className="margin-right" type="checkbox" name="meta_choice" checked={this.props.checkedMeta[1][1]} value='1' onChange={this.props.onChange.bind(this, base[1], 1)}/>
							</td>
							<td key={1+base[1].id}>{base[1].properties.info1}</td>
							<td key={2+base[1].id}>{base[1].properties.info2}</td>
							<td key={3+base[1].id}>{base[1].properties.info3}</td>
						</tr>
					</tbody>
			);
		} else {
			tableTaskPair =
				this.props.activeTaskElements.map((elem, index) => {
					return (
							<tbody key={'body'+elem[0].id}>
							<tr key={'colelem'+elem[0].id}>
								<td key={'0.1'+elem[0].id+index}>
									<input className="margin-right" type="checkbox" name='meta_choice' checked={this.props.checkedMeta[0][index]} value='0' onChange={this.props.onChange.bind(this, elem[0], index)} />
								</td>
								<td key={'1'+elem[0].id+index}>{elem[0].properties.info1}</td>
								<td key={'2'+elem[0].id+index}>{elem[0].properties.info2}</td>
								<td key={'3'+elem[0].id+index}>{elem[0].properties.info3}</td>
							</tr>
							<tr key={'colconfl'+elem[1].id}>
								<td key={'0.1'+elem[1].id+index}>
									<input className="margin-right" type="checkbox" name='meta_choice' checked={this.props.checkedMeta[1][index]} value='1' onChange={this.props.onChange.bind(this, elem[1], index)} />
								</td>
								<td key={'1'+elem[1].id+index}>{elem[1].properties.info1}</td>
								<td key={'2'+elem[1].id+index}>{elem[1].properties.info2}</td>
								<td key={'3'+elem[1].id+index}>{elem[1].properties.info3}</td>
							</tr>
							</tbody>
					);
				});
		}
		return tableTaskPair;
	}

	render() {
		let tableInput = this.setInputInMetaTable();
		let row_s = (this.props.elementsInTask == 1) ? 'row' : ' rows';
		let alternative_s = (this.props.elementsInTask == 1) ? 'alternative' : ' alternatives';
		return (
			<div className="">
				<h5>2. Select {this.props.elementsInTask} {row_s} that describes a building best</h5>
				<p><i>Choose the most informative row by clicking the button in the first column, select {this.props.elementsInTask} {row_s}</i></p>
				<table key={'meta-table'} className="table table-striped">
					<thead>
					<tr>
						<th key="title0">Choose</th>
						<th key="title2">Info 1</th>
						<th key="title3">Info 2</th>
						<th key="title4">Info 3</th>
					</tr>
					</thead>
					{tableInput}
				</table>
				<p style={{display: (this.props.tooMany ? 'inline' : 'none')}}><b>You can only select {this.props.elementsInTask} {alternative_s}</b></p>
			</div>
		)
	}
}

export default metadataTask;
