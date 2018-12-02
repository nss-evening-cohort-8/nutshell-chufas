import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';
import weatherData from '../../helpers/Data/weatherData';

const printWeather = (currentWeather) => {
  const domstring = `<p>${currentWeather[0].temp}</p>`;
  $('#weather').html(domstring);
};

const weatherPage = () => {
  const uid = authHelpers.getCurrentUid();
  weatherData.getWeatherData(uid)
    .then(weatherArray => weatherData.getCurrentWeather(weatherArray[0].zipcode))
    .then((currentWeather) => {
      console.log(currentWeather);
      printWeather(currentWeather);
    })
    .catch((error) => {
      console.error('error in getting weather', error);
    });
};

const initWeather = () => {
  weatherPage();
};

export default { initWeather };
