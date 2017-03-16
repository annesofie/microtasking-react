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
