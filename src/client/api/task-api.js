/**
 * Created by AnneSofie on 16.02.2017.
 */

import axios from 'axios';

//const apiURL = 'http://34.252.179.235/api/';
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

export function getBuildingLayersInTask(buildinglist){
	return axios.post(apiURL+'buildings/layers/', {
			building_numbers: buildinglist
	}).then(response => response.data)
	.catch(error => error)
}



