import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';
import weather from '../Weather/weather';
import weatherData from '../../helpers/Data/weatherData';

const updateIsCurrent = (e) => {
  const locationId = e.target.id;
  const uid = authHelpers.getCurrentUid();
  weatherData.getWeatherData(uid)
    .then((weatherArray) => {
      weatherArray.forEach((location) => {
        let current = location.isCurrent;
        current = false;
        return weatherData.updateIsCurrent(location.id, current);
      })
        .then(() => {
          console.log('WTF!!!!!');
          const current = true;
          weatherData.updateIsCurrent(locationId, current);
          weather.weatherPage();
        })
        .catch((error) => {
          console.error('error in updating isCurrent', error);
        });
    });
};

const bindEvents = () => {
  $('body').on('click', '.get-location', updateIsCurrent);
};

export default { bindEvents };
