/**
 * Created by AnneSofie on 16.02.2017.
 */
import React, {Component} from 'react';
//import _ from 'lodash';
import * as taskApi from '../../api/task-api';

import TaskElementView from '../views/TaskElementsView';

const TaskElementComponent = React.createClass({

	getInitialState: function() {
		return {
			elements: []
		}
	},

	componentDidMount: function () {
		var taskid = this.props.params.taskId;
		taskApi.getElementsInTask(taskid).then(elem => {
			this.setState({elements: elem})
		});
	},

	render: function () {
		return (
			<TaskElementView elements={this.state.elements}/>
		)
	}
})

export default TaskElementComponent;
