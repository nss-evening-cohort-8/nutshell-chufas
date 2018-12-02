import axios from 'axios';
import apiKeys from '../../../db/apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getWeatherData = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/weather.json?orderBy="userUid"&equalTo="${uid}"`)
    .then((results) => {
      console.log(results.data);
      const weatherObject = results.data;
      const weatherArray = [];
      if (weatherObject !== null) {
        Object.keys(weatherObject).forEach((weatherId) => {
          weatherObject[weatherId].id = weatherId;
          weatherArray.push(weatherObject[weatherId]);
        });
      }
      console.log(weatherArray);
      resolve(weatherArray);
    })
    .catch((error) => {
      reject(error);
    });
});

export default { getWeatherData };
