/**
 * Created by AnneSofie on 16.02.2017.
 */

import axios from 'axios';


export function getTasks() {
	return axios.get('http://localhost:8000/api/tasks/')
		.then(response => response.data);
}

export function getElementsInTask(taskid) {
	return axios.get('http://localhost:8000/api/tasks/'+taskid+'/elements/')
		.then(response => response.data);
}
