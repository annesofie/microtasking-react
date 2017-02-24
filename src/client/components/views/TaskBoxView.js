/**
 * Created by AnneSofie on 23.02.2017.
 */
import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

//View
//import Table from './BootstrapTable';

class TaskBoxView extends Component {

	setChosenGeomLayer() {
		var chosenGeomLayer;
		if(this.props.chosenGeomLayer) {
			chosenGeomLayer = <h6 id="chosenGeom">You chose {this.props.chosenGeomLayer.feature.properties.title}</h6>;
		} else {
			chosenGeomLayer = <h7>Click on the object you believe is the right one</h7>
		}
		return chosenGeomLayer;
	}

	setInputInMetaTable() {
		var tableinput;
		if (this.props.taskmode == 1){
			tableinput = <tr>
				<td key={0+this.props.activeTaskObj.id}>{this.props.activeTaskObj.properties.title}</td>
				<td key={1+this.props.activeTaskObj.id}>{this.props.activeTaskObj.properties.info1}</td>
				<td key={2+this.props.activeTaskObj.id}>{this.props.activeTaskObj.properties.info2}</td>
				<td key={3+this.props.activeTaskObj.id}>{this.props.activeTaskObj.properties.info3}</td>
			</tr>;
		} else if (this.props.taskmode == 3) {
			tableinput =
				this.props.activeTaskObj.map(elem => {
					return (
						<tr>
							<td key={0+elem.id}>{elem.properties.title}</td>
							<td key={1+elem.id}>{elem.properties.info1}</td>
							<td key={2+elem.id}>{elem.properties.info2}</td>
							<td key={3+elem.id}>{elem.properties.info3}</td>
						</tr>
							)
				});
		} else {
			tableinput =
				this.props.taskelements.features.map(elem => {
					return (
						<tr>
							<td key={0+elem.id}>{elem.properties.title}</td>
							<td key={1+elem.id}>{elem.properties.info1}</td>
							<td key={2+elem.id}>{elem.properties.info2}</td>
							<td key={3+elem.id}>{elem.properties.info3}</td>
						</tr>
					)
				});
		}
		return tableinput;
	}

	render() {
		var chosenGeomLayer = this.setChosenGeomLayer();
		var tableInput = this.setInputInMetaTable();
		return (
				<div className="p-2 task-box">
					<h3>{this.props.task.title}</h3>
					<p>{this.props.task.description}</p>
					<div className="task-div">
						<h5>Which geometry to use?</h5>
						{chosenGeomLayer}
					</div>
					<div className="task-div">
						<h5>Which metadata to use?</h5>
						<table>
							{tableInput}
						</table>
						<button type="button" className="btn-sm btn-outline-secondary choose-btn">Object 1</button>
						<button type="button" className="btn-sm btn-outline-secondary choose-btn">Object 2</button>
						<button type="button" className="btn-sm btn-outline-secondary choose-btn">Merge</button>
					</div>
					<button className="btn-sm btn-outline-secondary choose-btn">next</button>
				</div>
		);
	}
}

export default TaskBoxView;
//
//<Table elem={this.props.taskelements.features}/>
//<Table elem={this.props.conflictelements.features}/>
//{this.props.taskelements.features.map(elem => {
//	return (
//		<p key={elem.id}><i>{elem.properties.element_name}</i></p>
//	)
//})}
