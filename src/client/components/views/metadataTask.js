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
			tableTaskPair =
				<table className="table table-striped">
					<thead>
						<tr>
							<th key="title0">Choose</th>
							<th key="title2">Info 1</th>
							<th key="title3">Info 2</th>
							<th key="title4">Info 3</th>
						</tr>
					</thead>
					<tbody>
						<tr key="colelem">
							<td key={0.1+base[0].id}><input className="margin-right" type="radio" name="meta_choice" value={base[0].properties.building_nr} onChange={this.props.onChange.bind(this, base[0], null)}/>
							</td>
							<td key={1+base[0].id}>{base[0].properties.info1}</td>
							<td key={2+base[0].id}>{base[0].properties.info2}</td>
							<td key={3+base[0].id}>{base[0].properties.info3}</td>
						</tr>
						<tr key="colconfl">
							<td key={0.1+base[1].id}><input className="margin-right" type="radio" name="meta_choice" value={base[1].properties.building_nr} onChange={this.props.onChange.bind(this, base[1], null)}/>
							</td>
							<td key={1+base[1].id}>{base[1].properties.info1}</td>
							<td key={2+base[1].id}>{base[1].properties.info2}</td>
							<td key={3+base[1].id}>{base[1].properties.info3}</td>
						</tr>
					</tbody>
			</table>;
		} else {
			tableTaskPair =
				this.props.activeTaskElements.map((elem, index) => {
					return (
						<table key={'table'+elem+index} className="table table-striped">
							<thead>
							<tr>
								<th key="title0">Choose</th>
								<th key="title2">Info 1</th>
								<th key="title3">Info 2</th>
								<th key="title4">Info 3</th>
							</tr>
							</thead>
							<tbody key={'body'+elem[0].id}>
							<tr key={'colelem'+elem[0].id}>
								<td key={'0.1'+elem[0].id+index}><input className="margin-right" type="radio" name={'meta_choice'+index} value={elem[0].properties.building_nr} onChange={this.props.onChange.bind(this, elem[0], index)} />
								</td>
								<td key={'1'+elem[0].id+index}>{elem[0].properties.info1}</td>
								<td key={'2'+elem[0].id+index}>{elem[0].properties.info2}</td>
								<td key={'3'+elem[0].id+index}>{elem[0].properties.info3}</td>
							</tr>
							<tr key={'colconfl'+elem[1].id}>
								<td key={'0.1'+elem[1].id+index}><input className="margin-right" type="radio" name={'meta_choice'+index} value={elem[1].properties.building_nr} onChange={this.props.onChange.bind(this, elem[1], index)} />
								</td>
								<td key={'1'+elem[1].id+index}>{elem[1].properties.info1}</td>
								<td key={'2'+elem[1].id+index}>{elem[1].properties.info2}</td>
								<td key={'3'+elem[1].id+index}>{elem[1].properties.info3}</td>
							</tr>
							</tbody>
						</table>
					)
				});
		}
		return tableTaskPair;
	}

	render() {
		let tableInput = this.setInputInMetaTable();
		return (
			<div className="">
				<h5>2. Which metadata to use?</h5>
				<p><i>Choose the most informative meta-data layer by clicking the radio button.</i></p>
				{tableInput}
			</div>
		)
	}
}

export default metadataTask;
