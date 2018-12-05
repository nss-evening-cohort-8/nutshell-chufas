import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';
import eventsData from '../../helpers/Data/eventData';
import initializeEventsSection from '../EventsPage/eventsPage';

const formBuilder = (event) => {
  const form = `
  <div class="form-group">
    <label for="form-event-title">Event:</label>
    <input type="text" class="form-control" value ="${event.event}" id="form-event-title" placeholder="Enter Event Name">
  </div>
  <div class="form-group">
    <label for="form-event-startDate">Start Date:</label>
    <input type="text" class="form-control" value ="${event.startDate}" id="form-event-startDate" placeholder="11/21/2018">
  </div>
  <div class="form-group">
    <label for="form-event-location">Location:</label>
    <input type="email" class="form-control" value ="${event.location}" id="form-event-location" placeholder="NSS">
  </div>`;
  return form;
};

const gettingEventFromForm = () => {
  const event = {
    event: $('#form-event-title').val(),
    startDate: $('#form-event-startDate').val(),
    location: $('#form-event-location').val(),
    userUid: authHelpers.getCurrentUid(),
  };
  return event;
};

const buildAddForm = () => {
  const emptyEvent = {
    event: '',
    startDate: '',
    location: '',
  };
  let domString = '<h2> Add New Event</h2>';
  domString += formBuilder(emptyEvent);
  domString += '<button class="btn btn-primary" id="add-new-event">Save New Event</button>';
  $('#add-edit-event').html(domString).show();
  $('#events').hide();
};

const addNewEvent = () => {
  const newEvent = gettingEventFromForm();
  eventsData.addNewEvent(newEvent)
    .then(() => {
      $('#add-edit-event').html('').hide();
      $('#events').show();
      initializeEventsSection();
    }).catch((error) => {
      console.error(error);
    });
};

$('body').on('click', '#add-new-event', addNewEvent);

export default buildAddForm;
