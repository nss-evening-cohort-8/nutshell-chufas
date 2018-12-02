import firebase from 'firebase/app';
import 'bootstrap';

import apiKeys from '../db/apiKeys.json';

import auth from './components/Auth/auth';
import navbar from './components/Navbar/navbar';
import authHelpers from './helpers/authHelpers';
import weather from './components/Weather/weather';
import weatherData from './helpers/Data/weatherData';

import './index.scss';

const initApp = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  navbar.createNavbar();
  authHelpers.authHelperInit();
  auth.loginBtn();
  weatherData.getWeatherData();
  weather.initWeather();
};

initApp();

export default { initApp };
