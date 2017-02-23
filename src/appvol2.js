/**
 * Created by AnneSofie on 23.02.2017.
 */

import React, {Component} from 'react';
import { browserHistory, Router, Route, Link, IndexRoute, hashHistory } from 'react-router'
import { Map, TileLayer, Marker, Popup, LayerGroup, GeoJSON} from 'react-leaflet'

import * as taskApi from './client/api/task-api';

//Views
import Home from './client/components/HeaderComponent';
import TaskBoxView from './client/components/views/TaskBoxView';
import MapContainer from './client/components/containers/MapComponent';

export default class extends Component {

	constructor() {
		super();
		var taskelem=[];
		this.state = {
			mode: 'home',
			user: [],
			taskid: Math.floor(Math.random() * ((8-6)+1) + 6),
			task: [],
			elements: [],
			conflicts: []
		};
		this.handleModeChange = this.handleModeChange.bind(this);
		this.getNextTask = this.getNextTask.bind(this);
	}

	componentDidMount() {
		taskApi.getTask(this.state.taskid).then(elem => {
			this.setState({task: elem});
		});
		taskApi.getElementsInTask(this.state.taskid).then(elem => {
			this.setState({elements: elem});
		});
		taskApi.getConflictsInTask(this.state.taskid).then(elem => {
			this.setState({conflicts: elem});
		})
	}

	handleModeChange() {
		if(this.state.mode === 'home'){
			console.log('modeChange');
			this.setState({mode: 'taskview'});
		}
	}

	getNextTask() {

	}


	render() {
		if (this.state.mode === 'home') {
			return (
				<Home onClick={this.handleModeChange}/>
			)
		} else if (this.state.mode === 'taskview') {
			return (
				<div className="d-flex flex-row justify-content-center task-map-box">
					<TaskBoxView task={this.state.task} taskelements={this.state.elements}/>
					<MapContainer task={this.state.task} taskelements={this.state.elements} conflictelements={this.state.conflicts}/>
				</div>
			)
		}
	}
}
