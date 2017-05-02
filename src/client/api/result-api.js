/**
 * Created by AnneSofie on 14.03.2017.
 */
import axios from 'axios';

const apiURL = 'http://34.252.179.235/result/';
// const apiURL = 'http://localhost:8000/result/';


export function saveTaskSurvey(data) {
	return axios.post(apiURL+'tasksurvey/', {
			difficulty: data.difficulty,
			besteffort: data.besteffort,
			interupted: data.interupted,
			comment: data.comment,
			participant: data.participant,
			task: data.task,
			taskresult: data.taskresult //Foreign key to taskresult
		})
		.then(response => response)
		.catch(error => error)
}

export function saveTaskResult(data) {

	return axios.post(apiURL+'taskresult/', {
		taskorder: data.taskorder, //JSON
		geomtasktime: data.time.geomTime, //int
		metatasktime: data.time.metaTime, //int
		totaltime: data.time.totalTime, //int
		tasknumber: data.tasknumber, //int
		taskordernumber: data.taskordernumber,
		correctgeom: data.chosenGeomLayer.correct, //int
		correctmetadata: data.chosenMetadata.correct, //int
		correct_buildings_geom: data.correct_buildings_geom, //Array, Int
		correct_buildings_meta: data.correct_buildings_meta, //Array, Int
		total_correct_elements: data.total_correct,
		participant: data.participant, //Foreign key, id
		task: data.task //Foreign key, id
	})
		.then(response => response)
		.catch(error => error)
}
