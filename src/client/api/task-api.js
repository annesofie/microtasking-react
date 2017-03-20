/**
 * Created by AnneSofie on 16.02.2017.
 */

import axios from 'axios';

const apiURL = 'http://localhost:8000/api/';

export function saveParticipant(data) {
	return axios.post(apiURL+'participant/', {
		age: data.age,
		gender: data.gender,
		experienced: data.experienced,
		nationality: data.nationality,
		know_microtasking: data.microtasking
	})
	.then(response => response)
	.catch(error => error)
}

export function getTaskOrder() {
	return axios.get(apiURL+'tasks/order/')
		.then(resp => resp.data)
		.catch(function (error) {
			console.log(error);
		})
}

export function getTask(id) {
	console.log(id);
	return axios.get(apiURL+'tasks/'+id+'/')
		.then(response => response.data)
		.catch(function(error) {
			console.log(error);
		});
}

export function getElementsInTask(taskid) {
	return axios.get(apiURL+'tasks/'+taskid+'/elements/')
		.then(response => response.data)
		.catch(function(error) {
			console.log(error);
		});
}

export function getConflictsInTask(taskid) {
	return axios.get(apiURL+'tasks/'+taskid+'/conflicts/')
		.then(response => response.data)
		.catch(function(error) {
			console.log(error);
		});
}



//
//export function getTaskElemAndConflictElem(taskelemid, onFinishCallback) { //TODO: add taskelem and conflelem in an random order
//	var taskPair = {
//		'elem': [],
//		'confl': []
//	};
//	var building = {};
//	axios.all([getTaskElement(taskelemid), getTaskElementConflict(taskelemid)])
//		.then(axios.spread(function (taskelem, confelem) {
//			taskPair.elem = taskelem.data;
//			taskPair.confl = confelem.data;
//			building = randPlaceElem(taskelem.data, confelem.data);
//			console.log(building);
//			onFinishCallback(taskPair, randPlaceElem(taskelem.data, confelem.data));
//		}))
//		.catch(function(error) {
//			console.log(error);
//		});
//}

//function randPlaceElem(list1, list2) {
//	var x = Math.round(Math.random());
//	var y = (x === 0 ? 1 : 0);
//	console.log(x + ' , ' + y);
//	var geom = {};
//	geom[x] = list1;
//	geom[y] = list2;
//	return geom;
//}

//function getTaskElement(taskelemid) {
//	return axios.get(apiURL+'task/'+taskelemid+'/');
//}
//
//function getTaskElementConflict(taskelemid) {
//	return axios.get(apiURL+'task/'+taskelemid+'/conflict/');
//}
