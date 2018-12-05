import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';
// import allArticles from '../components/NewsArticles/GetArticles/articles';

const checkLoginStatus = (initializeUserView) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $('#auth').hide();
      $('#navbar-button-auth').hide();
      $('#navbar-button-logout').show();
      $('#articles').show();
      $('#messages').show();
      $('#weather-container').show();
      initializeUserView();
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
