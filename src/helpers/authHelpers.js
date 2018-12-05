import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';
// import allArticles from '../components/NewsArticles/GetArticles/articles';

const checkLoginStatus = (initWeather, messages, initializeArticlesPage, bindEvents) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $('#auth').hide();
      $('#navbar-button-auth').hide();
      $('#navbar-button-logout').show();
      $('#articles').show();
      $('#messages').show();
      $('#weather-container').show();
      initializeArticlesPage();
      messages();
      initWeather();
      bindEvents();
    } else {
      $('#navbar-button-auth').show();
      $('#navbar-button-logout').hide();
      $('#articles').hide();
      $('#messages').hide();
      $('#weather-container').hide();
    }
  });
};

const getCurrentUid = () => firebase.auth().currentUser.uid;

export default { checkLoginStatus, getCurrentUid };
