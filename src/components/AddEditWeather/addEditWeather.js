import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';
import weather from '../Weather/weather';
import weatherData from '../../helpers/Data/weatherData';

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
        current = false;
        weatherData.updateIsCurrent(location.id, current);
      });
      updateCurrentLocation(locationId);
    });
};

const bindEvents = () => {
  $('body').on('click', '.get-location', updateAllIsCurrent);
};

export default { bindEvents };
