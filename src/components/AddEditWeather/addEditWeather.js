import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';
// eslint-disable-next-line import/no-cycle
import weather from '../Weather/weather';
import weatherData from '../../helpers/Data/weatherData';

import './addEditWeather.scss';

const addFormBuilder = (location) => {
  const addForm = `
  <div class="form-group L1row">
    <div class="col-8 mx-auto">
      <div class="input-group mb-2 mx-auto row">
        <div class="input-group-prepend">
          <div class="input-group-text">Zip Code</div>
        </div>    
          <input id="add-weather-input" type="text" class="form-control" value="${location.zipcode}" placeholder="Enter Zip Code">
  </div>`;
  return addForm;
};

const showAddFirstWeather = () => {
  const emptyLocation = {
    zipcode: '',
  };
  let domstring = '<div class="first-location-div">';
  domstring += addFormBuilder(emptyLocation);
  domstring += '<div class="row add-location-btns">';
  domstring += '<button id="add-first-location" class="btn-success mx-auto">Save New Location</button>';
  domstring += '</div></div></div></div>';
  $('#add-location').html(domstring).show();
  $('#add-weather-input').focus();
};

const showAddWeather = () => {
  const emptyLocation = {
    zipcode: '',
  };
  let domstring = '<div class="add-location-div">';
  domstring += addFormBuilder(emptyLocation);
  domstring += '<div class="row save-location-btns">';
  domstring += '<button id="save-location" class="btn-success mx-auto">Save New Location</button>';
  domstring += '<button id="cancel-add-location" class="btn-danger mx-auto">Cancel</button>';
  domstring += '</div></div></div>';
  $('#add-location').html(domstring).show();
  $('#add-weather-input').focus();
};

const getLocationFromForm = () => {
  const uid = authHelpers.getCurrentUid();
  const location = {
    zipcode: $('#add-weather-input').val(),
    userUid: uid,
    isCurrent: true,
  };
  return location;
};

const updateCurrentLocation = (locationId) => {
  const current = true;
  weatherData.updateIsCurrent(locationId, current)
    .then(() => {
      weather.initWeather();
    })
    .catch((error) => {
      console.error('error updating current location', error);
    });
};

const updateAllIsCurrent = (e) => {
  const locationId = e.target.id;
  const uid = authHelpers.getCurrentUid();
  return weatherData.getWeatherData(uid)
    .then((weatherArray) => {
      weatherArray.forEach((location) => {
        let current = location.isCurrent;
        if (current === true) {
          current = false;
        }
        weatherData.updateIsCurrent(location.id, current);
      });
    })
    .then(() => {
      updateCurrentLocation(locationId);
    })
    .catch((error) => {
      console.error('error updating all to false', error);
    });
};

const addFirstLocation = () => {
  const firstLocation = getLocationFromForm();
  return weatherData.addNewLocation(firstLocation)
    .then(() => {
      weather.initWeather();
      $('#add-location').html('').hide();
      $('#weather-dropdown').show();
    })
    .catch((error) => {
      console.error(error);
    });
};

const addLocation = () => {
  const uid = authHelpers.getCurrentUid();
  return weatherData.getWeatherData(uid)
    .then((weatherArray) => {
      weatherArray.forEach((location) => {
        let current = location.isCurrent;
        if (current === true) {
          current = false;
        }
        weatherData.updateIsCurrent(location.id, current);
      });
      const newLocation = getLocationFromForm();
      return newLocation;
    })
    .then((newLocation) => {
      weatherData.addNewLocation(newLocation);
    })
    .then(() => {
      weather.initWeather();
      $('#add-location').html('').hide();
      $('#weather-dropdown').show();
    })
    .catch((error) => {
      console.error(error);
    });
};

const deleteWeather = () => {
  const uid = authHelpers.getCurrentUid();
  return weatherData.getCurrentWeatherData(uid)
    .then((weatherArray) => {
      weatherData.deleteWeatherData(weatherArray.id)
        .then(() => {
          weather.initWeather();
        });
    })
    .catch((error) => {
      console.error(error);
    });
};

const bindEvents = () => {
  $('body').on('click', '.get-location', updateAllIsCurrent);
  $('body').on('click', '#add-weather-btn', showAddWeather);
  $('body').on('click', '.delete-weather-btn', deleteWeather);
  $('body').on('click', '#save-location', addLocation);
  $('body').on('click', '#cancel-add-location', weather.initWeather);
  $('body').on('click', '#add-first-location', addFirstLocation);
  $('body').on('keyup', '.add-location-div', (e) => {
    if (e.keyCode === 13) {
      addLocation();
    }
  });
  $('body').on('keyup', '.first-location-div', (e) => {
    if (e.keyCode === 13) {
      addLocation();
    }
  });
};

export default { bindEvents, showAddWeather, showAddFirstWeather };
