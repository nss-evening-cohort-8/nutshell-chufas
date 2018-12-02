// import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';
import weatherData from '../../helpers/Data/weatherData';

const weatherPage = () => {
  const uid = authHelpers.getCurrentUid();
  weatherData.getWeatherData(uid)
    .then((weatherArray) => {
      console.log(weatherArray);
    })
    .catch((error) => {
      console.error('error in getting weather', error);
    });
};

const initWeather = () => {
  weatherPage();
};

export default { initWeather };
