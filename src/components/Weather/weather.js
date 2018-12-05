import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';
import weatherData from '../../helpers/Data/weatherData';

import './weather.scss';

const printWeatherDropdown = (weatherArray) => {
  let dropdown = `
    <div class="dropdown row mx-auto">
    <button class="btn btn-secondary dropdown-toggle mr-3" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
  dropdown += '</div>';
  dropdown += '<div>';
  dropdown += '<button id="add-weather-btn" type="button" class="btn btn-success">+</button>';
  dropdown += '</div></div>';
  $('#weather-dropdown').html(dropdown);
};

const printWeather = (currentWeather) => {
  const domstring = `
    <div class="row">
      <div class="card col-8 mx-auto">
      <div class="card-header">Current Conditions</div>
        <img class="card-img-top" src="https://www.weatherbit.io/static/img/icons/${currentWeather[0].weather.icon}.png" alt="weather icon">
        <div class="card-body">
          <h5 class="card-title">${currentWeather[0].city_name}, ${currentWeather[0].state_code}</h5>
          <p class="card-text">${currentWeather[0].temp}&degF</p>
          <p class="card-text">${currentWeather[0].weather.description}</p>
        </div>
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
          $('#weather').html('');
          const domstring = `
          <div class="row">
            <div class="card col-8 mx-auto">
            <div class="card-header">Current Conditions</div>
              <div class="card-body">
                <h5 class="card-title">Please Select A Location For Weather!</h5>
              </div>
            </div>
          </div>          
          `;
          $('#weather-warning').html(domstring);
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
  $('#add-location').hide();
  printWeatherWarning();
  getLocationsForDropdown();
  weatherPage();
};

export default { initWeather };
// eslint-disable-next-line max-len
// <img class="card-img-top" src="data:image/png;base64,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" alt="error icon">
