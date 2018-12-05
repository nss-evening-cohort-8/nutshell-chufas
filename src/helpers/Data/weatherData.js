import axios from 'axios';
import apiKeys from '../../../db/apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;
const weatherbitKey = apiKeys.weatherbitKeys.apiKey;

const getWeatherData = uid => new Promise((resolve, reject) => {
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

const getSingleLocation = locationId => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/weather/${locationId}.json`)
    .then((result) => {
      const singleLocation = result.data;
      singleLocation.id = singleLocation;
      resolve(singleLocation);
      console.log(singleLocation);
    })
    .catch((error) => {
      reject(error);
    });
});

const getCurrentWeatherData = uid => new Promise((resolve, reject) => {
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
      weatherArray.forEach((weatherData) => {
        if (weatherData.isCurrent === true) {
          resolve(weatherData);
        }
      });
    })
    .catch((error) => {
      reject(error);
    });
});

const getCurrentWeather = zipcode => new Promise((resolve, reject) => {
  axios.get(`https://api.weatherbit.io/v2.0/current?postal_code=${zipcode}&units=I&key=${weatherbitKey}`)
    .then((results) => {
      resolve(results.data.data);
    })
    .catch((error) => {
      reject(error);
    });
});

const addNewWeather = weatherObject => axios.post(`${firebaseUrl}/weather.json`, JSON.stringify(weatherObject));

const updateIsCurrent = (locationId, isCurrent) => axios.patch(`${firebaseUrl}/weather/${locationId}.json`, { isCurrent });


export default {
  getWeatherData,
  getCurrentWeatherData,
  getSingleLocation,
  getCurrentWeather,
  updateIsCurrent,
  addNewWeather,
};
