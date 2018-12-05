import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';
import weather from '../Weather/weather';
import weatherData from '../../helpers/Data/weatherData';

const showAddWeather = (e) => {
  console.log('Clicked!', e.target.id);
  const uid = authHelpers.getCurrentUid();
  const emptyLocation = {
    userUid: uid,
    zipcode: '',
    isCurrent: true,
  };
  const domstring = `<div class="form-group mt-5">
    <div class="input-group mb-2 mx-auto">
      <div class="input-group-prepend">
        <div class="input-group-text">Zip Code</div>
      </div>    
        <input type="text" class="form-control" value="${emptyLocation.zipcode}" id="form-location-zip" placeholder="Zip Code">
    </div>
    <div>
      <button id="save-location" class="btn-success">Save New Location</button>
    </div>     
  </div>
  `;
  $('#add-location').html(domstring).show();
};

const getLocationFromForm = () => {
  const uid = authHelpers.getCurrentUid();
  const location = {
    zipcode: $('#form-location-zip').val(),
    userUid: uid,
    isCurrent: true,
  };
  return location;
};

const addNewLocation = () => {
  const newLocation = getLocationFromForm();
  weatherData.addNewLocation(newLocation)
    .then(() => {
      $('#add-location').html('').hide();
      weather.initWeather();
    })
    .catch((error) => {
      console.error('error', error);
    });
};

const updateCurrentLocation = (locationId) => {
  const current = true;
  weatherData.updateIsCurrent(locationId, current);
  weather.initWeather();
};

const updateAllIsCurrent = (e) => {
  const locationId = e.target.id;
  const uid = authHelpers.getCurrentUid();
  weatherData.getWeatherData(uid)
    .then((weatherArray) => {
      weatherArray.forEach((location) => {
        let current = location.isCurrent;
        if (current === true) {
          current = false;
        }
        weatherData.updateIsCurrent(location.id, current);
        updateCurrentLocation(locationId);
      });
    });
};

const bindEvents = () => {
  $('body').on('click', '.get-location', updateAllIsCurrent);
  $('body').on('click', '#add-weather-btn', showAddWeather);
  $('body').on('click', '#save-location', addNewLocation);
};

export default { bindEvents };
