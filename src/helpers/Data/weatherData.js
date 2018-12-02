import axios from 'axios';
import apiKeys from '../../../db/apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getWeatherData = uid => new Promise((resolve, reject) => {
  console.log(uid);
  axios.get(`${firebaseUrl}/weather.json?orderBy="userUid"&equalTo="${uid}"`)
    .then((results) => {
      const weatherObject = results.data;
      const weatherArray = [];
      if (weatherObject !== null) {
        Object.keys(weatherObject).forEach((weatherId) => {
          weatherObject[weatherId].id = weatherId;
          weatherArray.push(weatherObject[weatherId]);
        });
      }
      resolve(weatherArray);
    })
    .catch((error) => {
      reject(error);
    });
});

export default { getWeatherData };
