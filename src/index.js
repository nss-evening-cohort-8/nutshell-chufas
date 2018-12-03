import firebase from 'firebase/app';
import 'bootstrap';

import apiKeys from '../db/apiKeys.json';

import auth from './components/Auth/auth';
import navbar from './components/Navbar/navbar';
import authHelpers from './helpers/authHelpers';
import getArticles from './components/NewsArticles/GetArticles/articles';

import './index.scss';

const initApp = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  navbar.createNavbar();
  authHelpers.checkLoginStatus(getArticles);
  auth.loginBtn();
};

initApp();

export default { initApp };
