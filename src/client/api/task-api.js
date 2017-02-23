/**
 * Created by AnneSofie on 16.02.2017.
 */

import axios from 'axios';


export function getTask(id) {
	return axios.get('http://localhost:8000/api/tasks/'+id+'/')
		.then(response => response.data);
}

export function getElementsInTask(taskid) {
	return axios.get('http://localhost:8000/api/tasks/'+taskid+'/elements/')
		.then(response => response.data);
}

export function getConflictsInTask(taskid) {
	return axios.get('http://localhost:8000/api/tasks/'+taskid+'/conflicts/')
		.then(response => response.data);
}
