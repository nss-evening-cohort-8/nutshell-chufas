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
import users from './components/Users/users';

const initializeUserView = () => {
  weather.initWeather();
  messages.initMessagesPage();
  getArticles();
  addEditWeather.bindEvents();
  initializeEventsSection();
};

const initApp = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  navbar.createNavbar();
  authHelpers.checkLoginStatus(initializeUserView, users.createNewUser);
  auth.loginBtn();
  $('body').on('click', '#add-articles-btn', buildArticleForm.buildAddForm);
  $('body').on('click', '#add-events', showAddForm);
};

const timeout = () => setInterval(messages.reloadMessages, 5000);

timeout();
initApp();
