import $ from 'jquery';
// import apiKeys from '../../../db/apiKeys.json';
import authHelpers from '../../helpers/authHelpers';
import weatherData from '../../helpers/Data/weatherData';
// eslint-disable-next-line import/no-cycle
import addEditWeather from '../AddEditWeather/addEditWeather';

import './weather.scss';

// const GoogleMapsLoader = require('google-maps');

// GoogleMapsLoader.KEY = apiKeys.googleMapsApiKeys.apiKey;
// GoogleMapsLoader.VERSION = '3.36';
// GoogleMapsLoader.LIBRARIES = ['geometry', 'places'];

// GoogleMapsLoader.onLoad(() => {
//   console.log('I just loaded google maps api');
// });

// const getGeoZip = () => {
//   GoogleMapsLoader.load((google) => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         const lat = position.coords.latitude;
//         const long = position.coords.longitude;
//         const point = new google.maps.LatLng(lat, long);
//         new google.maps.Geocoder().geocode({ latLng: point }, (res) => {
//           const zip = res[0].formatted_address.match(/,\s\w{2}\s(\d{5})/);
//           console.log(zip[1]);
//           return zip;
//         });
//       });
//     }
//   });
// };

// const geoZip = getGeoZip();

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
    dropdown += '<div class="dropdown-item get-location" id="geoLocate-btn">WTF Am I?!?!</div>';
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
  const domstring = `
    <div class="row weather-card ">
      <div class="card col-6 mx-auto">
      <div class="card-header">Current Conditions</div>
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
  $('#weather').html(domstring);
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

// const doSomething = (google) => {
//   console.log(google);
//   // weatherData.getCurrentWeather(geoZip[1]);
// };

const getLocationsForDropdown = () => {
  const uid = authHelpers.getCurrentUid();
  return weatherData.getWeatherData(uid)
    .then((weatherArray) => {
      printWeatherDropdown(weatherArray);
    });
};

function success(pos) {
  const crd = pos.coords;
  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
}

navigator.geolocation.getCurrentPosition(success);


const initWeather = () => {
  getLocationsForDropdown();
  weatherPage();
  printWeatherWarning();
  $('#add-location').hide();
};

$('body').on('click', '#geoLocate-btn', getGeoWeather);

export default { initWeather };
