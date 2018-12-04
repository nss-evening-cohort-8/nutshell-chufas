import $ from 'jquery';
import firebase from 'firebase/app';
import 'bootstrap';

import apiKeys from '../db/apiKeys.json';

import auth from './components/Auth/auth';
import navbar from './components/Navbar/navbar';
import authHelpers from './helpers/authHelpers';
import getArticles from './components/NewsArticles/GetArticles/articles';
import messages from './components/Messages/messages';
import weather from './components/Weather/weather';
import buildArticleForm from './components/NewsArticles/AddEdit/addEditArticles';

import './index.scss';

const initApp = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  navbar.createNavbar();
  authHelpers.checkLoginStatus(weather.initWeather, messages, getArticles);
  auth.loginBtn();
  $('#add-article').on('click', buildArticleForm.buildAddForm());
};

initApp();
