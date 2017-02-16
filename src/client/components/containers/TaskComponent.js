/**
 * Created by AnneSofie on 16.02.2017.
 */

import React, {Component} from 'react';
//import _ from 'lodash';
import * as taskApi from '../../api/task-api';

import TaskList from '../views/TaskList';

const ListContainer = React.createClass({

	getInitialState: function() {
		return {
			tasks: []
		}
	},

	componentDidMount: function() {
		taskApi.getTasks().then(tasks => {
			this.setState({tasks: tasks.results})
		});
	},

	render: function() {
		return (
				<TaskList tasks={this.state.tasks} />
		)
	}

})
export default ListContainer;
				//<pre>{JSON.stringify(this.state.tasks, null, 2)}</pre>
