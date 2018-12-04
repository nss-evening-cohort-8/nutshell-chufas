import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';
import weatherData from '../../helpers/data/weatherData';

const printWeather = (currentWeather) => {
  const domstring = `
    <p>${currentWeather[0].city_name}, ${currentWeather[0].state_code}</p>
    <p>${currentWeather[0].temp}&degF</p>
    <img src="https://www.weatherbit.io/static/img/icons/${currentWeather[0].weather.icon}.png ">
    <p>${currentWeather[0].weather.description}</p>
  `;
  $('#weather').html(domstring);
};

const printWeatherWarning = () => {
  const uid = authHelpers.getCurrentUid();
  weatherData.getWeatherData(uid)
    .then((weatherArray) => {
      const isTrueArray = [];
      weatherArray.forEach((weatherDataSet) => {
        if (weatherDataSet.isCurrent === true) {
          isTrueArray.push(weatherDataSet);
        }
        if (isTrueArray.length === 0) {
          $('#weather').html('Please Select A Location!');
        }
      });
    });
};

const weatherPage = () => {
  const uid = authHelpers.getCurrentUid();
  weatherData.getCurrentWeatherData(uid)
    .then(weatherArray => weatherData.getCurrentWeather(weatherArray.zipcode))
    .then((currentWeather) => {
      if (currentWeather.length === 0) {
        printWeatherWarning();
      } else {
        printWeather(currentWeather);
      }
    })
    .catch((error) => {
      console.error('error in getting weather', error);
    });
};

const initWeather = () => {
  weatherPage();
  printWeatherWarning();
};

export default { initWeather };
