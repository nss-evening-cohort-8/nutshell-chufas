import $ from 'jquery';
import eventData from '../../helpers/Data/eventData';
import authHepers from '../../helpers/authHelpers';
import form from '../AddEditEvents/addEditEvents';

const printAllEvents = (eventsArray) => {
  console.log(eventsArray);
  let domString = '';
  domString += '<h5> Events</h5>';
  domString += '<div class="event-card">';
  domString += '<button class="btn btn-info" id="add-events">Add Events</button>';
  eventsArray.forEach((event) => {
    domString += `<div class="card border-secondary mb-3" style="max-width: 18rem;">
    <div class="card-header">${event.event}</div>
    <div class="card-body">
      <p class="card-text">${event.startDate}</p>
      <p class="card-text">${event.location}</p>
    </div>
  </div>`;
    domString += '</div>';
  });
  $('#events').html(domString);
};

const eventsSection = () => {
  const uid = authHepers.getCurrentUid();
  eventData.getAllEvents(uid)
    .then((eventsArray) => {
      console.log(eventsArray);
      printAllEvents(eventsArray);
    }).catch((error) => {
      console.error(error);
    });
};

$('body').on('click', '#add-events', () => {
  $('.event-card').hide();
  form.buildAddForm();
});

const initializeEventsSection = () => {
  eventsSection();
};

export default initializeEventsSection;
