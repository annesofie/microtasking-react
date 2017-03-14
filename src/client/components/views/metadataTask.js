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
			var base = this.props.taskElemConflPair;
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
							<td key={0.1+base.elem.id}><input className="margin-right" type="radio" name="meta_choice" value={base.elem.properties.title} onChange={this.props.onChange.bind(this, null)}/>
								{base.elem.properties.title}
							</td>
							<td key={1+base.elem.id}>{base.elem.properties.info1}</td>
							<td key={2+base.elem.id}>{base.elem.properties.info2}</td>
							<td key={3+base.elem.id}>{base.elem.properties.info3}</td>
						</tr>
						<tr key="colconfl">
							<td key={0.1+base.confl.id}><input className="margin-right" type="radio" name="meta_choice" value={base.confl.properties.title} onChange={this.props.onChange.bind(this, null)}/>
								{base.confl.properties.title}
							</td>
							<td key={1+base.confl.id}>{base.confl.properties.info1}</td>
							<td key={2+base.confl.id}>{base.confl.properties.info2}</td>
							<td key={3+base.confl.id}>{base.confl.properties.info3}</td>
						</tr>
					</tbody>
			</table>;
		} else {
			tableTaskPair =
				this.props.taskElemConflPair.map((elem, index) => {
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
							<tbody key={'body'+elem.elem.id}>
							<tr key={'colelem'+elem.elem.id}>
								<td key={'0.1'+elem.elem.id+index}><input className="margin-right" type="radio" name={'meta_choice'+index} value={elem.elem.properties.title} onChange={this.props.onChange.bind(this, index)} />
									{elem.elem.properties.title}
								</td>
								<td key={'1'+elem.elem.id+index}>{elem.elem.properties.info1}</td>
								<td key={'2'+elem.elem.id+index}>{elem.elem.properties.info2}</td>
								<td key={'3'+elem.elem.id+index}>{elem.elem.properties.info3}</td>
							</tr>
							<tr key={'colconfl'+elem.confl.id}>
								<td key={'0.1'+elem.confl.id+index}><input className="margin-right" type="radio" name={'meta_choice'+index} value={elem.confl.properties.title} onChange={this.props.onChange.bind(this, index)} />
									{elem.confl.properties.title}
								</td>
								<td key={'1'+elem.confl.id+index}>{elem.confl.properties.info1}</td>
								<td key={'2'+elem.confl.id+index}>{elem.confl.properties.info2}</td>
								<td key={'3'+elem.confl.id+index}>{elem.confl.properties.info3}</td>
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
				{tableInput}
			</div>
		)
	}
}

export default metadataTask;
