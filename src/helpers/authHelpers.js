import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';
// import allArticles from '../components/NewsArticles/GetArticles/articles';

const checkLoginStatus = (initializeArticlesPage) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $('#auth').hide();
      $('#all-tasks').show();
      $('#navbar-button-auth').hide();
      $('#navbar-button-new').show();
      $('#navbar-button-logout').show();
      $('#articles').show();
      initializeArticlesPage();
    } else {
      $('#completed-tasks').hide();
      $('#navbar-button-auth').show();
      $('#navbar-button-new').hide();
      $('#navbar-button-logout').hide();
      $('#articles').hide();
    }
  });
};
const getCurrentUid = () => firebase.auth().currentUser.uid;

export default { checkLoginStatus, getCurrentUid };
