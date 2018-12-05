import $ from 'jquery';

const formBuilder = () => {
  const form = `
  <div class="form-group">
    <label for="form-event-title">Event:</label>
    <input type="text" class="form-control" value ="" id="form-event-title" placeholder="Enter Event Name">
  </div>
  <div class="form-group">
    <label for="form-event-startDate">Start Date:</label>
    <input type="text" class="form-control" value ="" id="form-event-startDate" placeholder="11/21/2018">
  </div>
  <div class="form-group">
    <label for="form-event-location">Email:</label>
    <input type="email" class="form-control" value ="" id="form-event-location" placeholder="NSS">
  </div>`;
  return form;
};

const buildAddForm = () => {
  const emptyEvent = {
    event: '',
    startDate: '',
    location: '',
  };
  let domString = '<h2> Add New Event</h2>';
  domString += formBuilder(emptyEvent);
  domString += '<button class="btn btn-primary" id="add-friend">Save New Event</button>';
  $('#add-edit-event').html(domString).show();
  $('#events').hide();
};

export default { buildAddForm };
