/**
 * Created by hjemme on 26.02.17.
 */
import React, {Component} from 'react';

//Presentational Components should never change the prop data itself.
//In fact, any component that receives props should consider that data immutable and owned by the parent.

class metadataTask extends Component{

	setInputInMetaTable() {
		var tableinput;
		if (this.props.taskmode == 1){
			tableinput =
					<tr>
						<td key={0+this.props.activeTaskObj1.id}>{this.props.activeTaskObj1.properties.title}</td>
						<td key={1+this.props.activeTaskObj1.id}>{this.props.activeTaskObj1.properties.info1}</td>
						<td key={2+this.props.activeTaskObj1.id}>{this.props.activeTaskObj1.properties.info2}</td>
						<td key={3+this.props.activeTaskObj1.id}>{this.props.activeTaskObj1.properties.info3}</td>
					</tr>;
		} else {
			tableinput =
				this.props.activeTaskObj1.map((elem, index) => {
					return (
							<tr key={'col'+elem.id}>
								<td key={'0'+elem.id+index}>{elem.properties.title}</td>
								<td key={'1'+elem.id+index}>{elem.properties.info1}</td>
								<td key={'2'+elem.id+index}>{elem.properties.info2}</td>
								<td key={'3'+elem.id+index}>{elem.properties.info3}</td>
							</tr>
					)
				});
		}
		return tableinput;
	}

	render() {
		let tableInput = this.setInputInMetaTable();
		return (
			<div className="task-div">
				<h5>Which metadata to use?</h5>
				<table className="fixed_headers">
					<thead>
						<tr>
							<th key="title1">Object</th>
							<th key="title2">Info 1</th>
							<th key="title3">Info 2</th>
							<th key="title4">Info 3</th>
						</tr>
					</thead>
					<tbody>
						{tableInput}
					</tbody>
				</table>
				<button type="button" className="btn-sm btn-outline-secondary choose-btn">Object 1</button>
				<button type="button" className="btn-sm btn-outline-secondary choose-btn">Object 2</button>
				<button type="button" className="btn-sm btn-outline-secondary choose-btn">Merge</button>
			</div>
		)
	}
}

export default metadataTask;
