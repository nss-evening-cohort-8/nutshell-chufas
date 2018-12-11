import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';
import weatherData from '../../helpers/Data/weatherData';
// eslint-disable-next-line import/no-cycle
import addEditWeather from '../AddEditWeather/addEditWeather';

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
    dropdown += '<div class="dropdown-item" id="geoLocate-btn">WTF Am I?!?!</div>';
  } else {
    $('#weather').html('');
    $('#weather-dropdown').hide();
    addEditWeather.showAddFirstWeather();
    $('.save-location-btns').hide();
    const domstring = `
          <div class="row">
            <div class="card col-8 mx-auto">
            <div class="card-header">Current Conditions</div>
              <div class="card-body">
                <h5 class="card-title">Please Add A Location For Weather!</h5>
              </div>
            </div>
          </div>          
          `;
    $('#weather-warning').html(domstring);
    dropdown += '<div class="dropdown-item" >You Have No Locations</div>';
  }
  dropdown += '</div>';
  dropdown += '<div>';
  dropdown += '<button id="add-weather-btn" type="button" class="btn btn-success">+</button>';
  dropdown += '</div></div>';
  $('#weather-dropdown').html(dropdown);
};

const printWeather = (currentWeather, currentCity) => {
  $('#geo-weather').hide();
  const domstring = `
    <div class="row weather-card ">
      <div class="card col-6 mx-auto border-secondary">
      <div class="card-header" id="weather-card-header">Current Conditions</div>
      <div class="card-img-div">
        <img class="card-img-top img-fluid" src="https://www.weatherbit.io/static/img/icons/${currentWeather[0].weather.icon}.png" alt="weather icon">
      </div>  
        <div class="card-body">
          <h5 class="card-title">${currentCity.city}, ${currentCity.state}</h5>
          <p class="card-text">${currentWeather[0].temp}&degF</p>
          <p class="card-text">${currentWeather[0].weather.description}</p>
        </div>
        <div class="col-md-1 d-flex justify-content-center">
          <button type="button" class="delete-weather-btn btn btn-danger btn-sm mb-2">
            <i class="far fa-trash-alt"></i>
          </button>
        </div>
      </div>
    </div>
  `;
  $('#weather').html(domstring).show();
};

const printGeoWeather = (currentWeather) => {
  $('#weather').hide();
  $('#geo-weather').show();
  const domstring = `
    <div class="row weather-card">
      <div class="card col-6 mx-auto border-secondary">
      <div class="card-header" id="geo-weather-header">Current Conditions</div>
      <div class="card-img-div">
        <img class="card-img-top img-fluid" src="https://www.weatherbit.io/static/img/icons/${currentWeather[0].weather.icon}.png" alt="weather icon">
      </div>  
        <div class="card-body">
          <h5 class="card-title">${currentWeather[0].city_name}, ${currentWeather[0].state_code}</h5>
          <p class="card-text">${currentWeather[0].temp}&degF</p>
          <p class="card-text">${currentWeather[0].weather.description}</p>
        </div>
      </div>
    </div>
  `;
  $('#geo-weather').html(domstring);
};

const printWeatherWarning = () => {
  const uid = authHelpers.getCurrentUid();
  return weatherData.getWeatherData(uid)
    .then((weatherArray) => {
      const isTrueArray = [];
      weatherArray.forEach((weatherDataSet) => {
        if (weatherDataSet.isCurrent === true) {
          isTrueArray.push(weatherDataSet);
        }
        if (isTrueArray.length === 0) {
          $('#weather').html('');
          $('#geo-weather').hide();
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
  let currentLocationArray = '';
  const uid = authHelpers.getCurrentUid();
  return weatherData.getCurrentWeatherData(uid)
    .then((weatherArray) => {
      currentLocationArray = weatherArray;
      weatherData.getCurrentWeather(currentLocationArray.zipcode)
        .then((currentWeather) => {
          if (currentWeather.length === 0) {
            printWeatherWarning();
          } else {
            $('#weather-warning').html('');
          }
          weatherData.getCity(currentLocationArray.zipcode)
            .then((currentCity) => {
              printWeather(currentWeather, currentCity);
            });
        });
    })
    .catch((error) => {
      console.error('error in getting weather', error);
    });
};

const geoWeatherPage = (position) => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  weatherData.getGeoWeather(lat, lon)
    .then((currentWeather) => {
      printGeoWeather(currentWeather);
    })
    .catch((error) => {
      console.error('error in getting geoLocatedWeather', error);
    });
};

const getLocationsForDropdown = () => {
  const uid = authHelpers.getCurrentUid();
  return weatherData.getWeatherData(uid)
    .then((weatherArray) => {
      printWeatherDropdown(weatherArray);
    });
};

const showGeoWeather = () => {
  $('#weather').hide();
  $('#geo-weather').show();
  $('#weather-warning').html('');
};


const initWeather = () => {
  navigator.geolocation.getCurrentPosition(geoWeatherPage);
  getLocationsForDropdown();
  weatherPage();
  printWeatherWarning();
  $('#add-location').hide();
};

$('body').on('click', '#geoLocate-btn', showGeoWeather);

export default { initWeather };
