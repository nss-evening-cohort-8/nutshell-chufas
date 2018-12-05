import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';
import weather from '../Weather/weather';
import weatherData from '../../helpers/Data/weatherData';

const showAddWeather = (e) => {
  console.log('Clicked!', e.target.id);
  const emptyLocation = {
    userUid: '',
    zipcode: '',
    isCurrent: '',
  }
};

const showAddForm = () => {
  const emptyFriend = {
    name: '',
    address: '',
    phoneNumber: '',
    email: '',
    relationship: '',
  };
  let domString = '<h2>Add New Friend</h2>';
  domString += formBuilder(emptyFriend);
  domString += '<button id="save-friend">Save New Friend</button>';
  $('#add-edit-friend').html(domString).show();
  $('#friends').hide();
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
};

export default { bindEvents };
