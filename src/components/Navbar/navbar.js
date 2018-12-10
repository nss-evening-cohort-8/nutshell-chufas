import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import './navbar.scss';

const navbarEvents = () => {
  $('.nav-link').on('click', (e) => {
    if (e.target.id === 'navbar-button-logout') {
      firebase.auth().signOut().then(() => {
        $('#auth').show();
      }).catch((err) => {
        console.error('you are still logged in', err);
      });
    } else if ((e.target.id === 'navbar-button-weather') || (e.target.id === 'navbar-button-events') || (e.target.id === 'navbar-button-articles') || (e.target.id === 'navbar-button-messages')) {
      $('#auth').hide();
      $('#weather-container').show();
      $('#events-container').show();
      $('#articles').show();
      $('#messages').show();
    } else {
      $('#auth').show();
      $('#weather-container').hide();
      $('#events-container').hide();
      $('#articles').hide();
      $('#messages').hide();
    }
  });
};

const createNavbar = () => {
  const domString = `
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark" id="main-nav">
  <a class="navbar-brand text-light" style="font-size: 30px">Chufas</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        <a id="navbar-button-weather" href="#weather-event" class="nav-link">Weather</a>
      </li> 
      <li class="nav-item">
        <a id="navbar-button-events" href="#weather-event" class="nav-link">Events</a>
      </li> 
      <li class="nav-item">
        <a id="navbar-button-articles" href="#articles-container" class="nav-link">Articles</a>
      </li> 
      <li class="nav-item">
        <a id="navbar-button-messages" href="#messages" class="nav-link">Messages</a>
      </li>  
      <li class="nav-item">
        <a id="navbar-button-logout" class="nav-link">Logout</a>
      </li>                 
    </ul>
  </div>
</nav>
  `;
  $('#navbar').html(domString);
  navbarEvents();
};

export default { createNavbar };
