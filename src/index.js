import firebase from 'firebase/app';
import 'bootstrap';
import $ from 'jquery';
import apiKeys from '../db/apiKeys.json';
import auth from './components/Auth/auth';
import navbar from './components/Navbar/navbar';
import authHelpers from './helpers/authHelpers';
import getArticles from './components/NewsArticles/GetArticles/articles';
import messages from './components/Messages/messages';
import weather from './components/Weather/weather';
import buildArticleForm from './components/NewsArticles/AddEdit/addEditArticles';
import initializeEventsSection from './components/EventsPage/eventsPage';
import addEditWeather from './components/AddEditWeather/addEditWeather';
import showAddForm from './components/AddEditEvents/addEditEvents';
import './index.scss';

const GoogleMapsLoader = require('google-maps');

GoogleMapsLoader.KEY = apiKeys.googleMapsApiKeys.apiKey;
GoogleMapsLoader.VERSION = '3.36';
GoogleMapsLoader.LIBRARIES = ['geometry', 'places'];

GoogleMapsLoader.onLoad(() => {
  console.log('I just loaded google maps api');
});

const getCurrentZip = () => {
  GoogleMapsLoader.load((google) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        const point = new google.maps.LatLng(lat, long);
        new google.maps.Geocoder().geocode({ latLng: point }, (res) => {
          const zip = res[0].formatted_address.match(/,\s\w{2}\s(\d{5})/);
          console.log(zip);
        });
      });
    }
  });
};

const initializeUserView = () => {
  weather.initWeather();
  messages();
  getArticles();
  addEditWeather.bindEvents();
  initializeEventsSection();
};

const initApp = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  navbar.createNavbar();
  auth.loginBtn();
  getCurrentZip();
  authHelpers.checkLoginStatus(initializeUserView);
  $('body').on('click', '#add-articles-btn', buildArticleForm.buildAddForm);
  $('body').on('click', '#add-events', showAddForm);
};

initApp();
