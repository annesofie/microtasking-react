/**
 * Created by AnneSofie on 16.02.2017.
 */

import axios from 'axios';

const apiURL = 'http://localhost:8000/api/';


export function getTask(id) {
	return axios.get(apiURL+'tasks/'+id+'/')
		.then(response => response.data);
}

export function getElementsInTask(taskid) {
	return axios.get(apiURL+'tasks/'+taskid+'/elements/')
		.then(response => response.data);
}

export function getConflictsInTask(taskid) {
	return axios.get(apiURL+'tasks/'+taskid+'/conflicts/')
		.then(response => response.data);
}

export function getTaskElemAndConflictElem(taskelemid, onFinishCallback) {
	var taskPair = {
		'elem': [],
		'confl': []
	};
	axios.all([getTaskElement(taskelemid), getTaskElementConflict(taskelemid)])
		.then(axios.spread(function (taskelem, confelem) {
			taskPair.elem = taskelem.data;
			taskPair.confl = confelem.data;
			onFinishCallback(taskPair);
		}));
}

function getTaskElement(taskelemid) {
	return axios.get(apiURL+'task/'+taskelemid+'/');
}

function getTaskElementConflict(taskelemid) {
	return axios.get(apiURL+'task/'+taskelemid+'/conflict/');
}
