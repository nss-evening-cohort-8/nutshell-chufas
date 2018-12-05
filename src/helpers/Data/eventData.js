import axios from 'axios';
import apiKeys from '../../../db/apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllEvents = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/events.json?orderBy="uid"&equalTo="${uid}"`)
    .then((results) => {
      console.log(results.data);
    }).catch((error) => {
      reject(error);
    });
});

export default {
  getAllEvents,
};
