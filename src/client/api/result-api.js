/**
 * Created by AnneSofie on 14.03.2017.
 */
import axios from 'axios';

const apiURL = 'http://localhost:8000/result/';

export function saveTaskSurvey(data) {
	return axios.post(apiURL+'tasksurvey/', {
			difficulty: data.difficulty,
			besteffort: data.besteffort,
			interupted: data.interupted,
			comment: data.comment,
			participant: data.participant,
			task: data.task
		})
		.then(response => response)
		.catch(error => error)
}

export function saveTaskResult(data) {

	return axios.post(apiURL+'taskresult/', {
		taskorder: data.taskorder, //JSON
		geomtasktime: data.time.geomTime, //int
		metatasktime: data.time.metaTime, //int
		totaltime: data.time.totalTime, //int. blank true
		correctgeom: data.chosenGeomLayer.correct, //int, blank true
		correctmetadata: data.chosenMetadata.correct, //int, blank true
		selectedgeomlayers: data.chosenGeomLayer, //JSON, blank true
		selectedmetalayers: data.chosenMetadata, //JSON, blank true
		participant: data.participant, //Foreign key, id
		task: data.task //Foreign key, id
	})
		.then(response => response)
		.catch(error => error)

}