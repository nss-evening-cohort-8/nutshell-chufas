import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';
import weatherData from '../../helpers/Data/weatherData';

import './weather.scss';

const printWeatherDropdown = (weatherArray) => {
  let dropdown = `
    <div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Locations
    </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">`;
  if (weatherArray.length) {
    weatherArray.forEach((location) => {
      dropdown += `<div class="dropdown-item get-location" id=${location.id}>${location.zipcode}</div>`;
    });
  } else {
    dropdown += '<div class="dropdown-item" >You Have No Locations</div>';
  }
  dropdown += '</div></div>';
  $('#weather-dropdown').html(dropdown);
};

const printWeather = (currentWeather) => {
  const domstring = `
    <h2 class="mt-3">Weather</h2>
    <div class="card" style="width: 18rem;">
    <div class="card-header">Current Weather</div>
      <img class="card-img-top" src="https://www.weatherbit.io/static/img/icons/${currentWeather[0].weather.icon}.png" alt="weather icon">
      <div class="card-body">
        <h5 class="card-title">${currentWeather[0].city_name}, ${currentWeather[0].state_code}</h5>
        <p class="card-text">${currentWeather[0].temp}&degF</p>
        <p class="card-text">${currentWeather[0].weather.description}</p>
      </div>
    </div>
  `;
  $('#weather').html(domstring);
};

const printWeatherWarning = () => {
  const uid = authHelpers.getCurrentUid();
  weatherData.getWeatherData(uid)
    .then((weatherArray) => {
      const isTrueArray = [];
      weatherArray.forEach((weatherDataSet) => {
        if (weatherDataSet.isCurrent === true) {
          isTrueArray.push(weatherDataSet);
        }
        if (isTrueArray.length === 0) {
          $('#weather-warning').html('Please Select A Current Location!');
        }
      });
    });
};

const weatherPage = () => {
  const uid = authHelpers.getCurrentUid();
  weatherData.getCurrentWeatherData(uid)
    .then(weatherArray => weatherData.getCurrentWeather(weatherArray.zipcode))
    .then((currentWeather) => {
      if (currentWeather.length === 0) {
        printWeatherWarning();
        $('#weather-warning').html('Please Select A Location!');
      } else {
        $('#weather-warning').html('');
        printWeather(currentWeather);
      }
    })
    .catch((error) => {
      console.error('error in getting weather', error);
    });
};

const getLocationsForDropdown = () => {
  const uid = authHelpers.getCurrentUid();
  weatherData.getWeatherData(uid)
    .then((weatherArray) => {
      printWeatherDropdown(weatherArray);
    });
};

const initWeather = () => {
  printWeatherWarning();
  getLocationsForDropdown();
  weatherPage();
};

export default { initWeather };
