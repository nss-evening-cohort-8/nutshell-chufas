import $ from 'jquery';

const weather = () => {
  $('#navbar-button-weather').attr('href', '#weather-container');
};

const events = () => {
  $('#navbar-button-events').attr('href', '#events-container');
};

const articles = () => {
  $('#navbar-button-articles').attr('href', '#articles');
};

const messages = () => {
  $('#navbar-button-messages').attr('href', '#messages');
};

const navbarBindEvents = () => {
  $('body').on('click', weather);
  $('body').on('click', events);
  $('body').on('click', articles);
  $('body').on('click', messages);
};

export default navbarBindEvents;
