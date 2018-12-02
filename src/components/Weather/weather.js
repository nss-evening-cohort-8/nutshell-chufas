// import $ from 'jquery';
import weatherData from '../../helpers/Data/weatherData';
import authHelpers from '../../helpers/authHelpers';

const getAllWeather = () => {
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
  getAllWeather();
};

export default { getAllWeather, initWeather };
