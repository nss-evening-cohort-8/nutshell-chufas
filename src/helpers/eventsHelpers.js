import $ from 'jquery';

const timeStamp = () => {
  const date = new Date();
  const utcDate = date.toLocaleString();
  // console.log(utcDate);
  return utcDate;
};

// function to add class if input fields are empty on the form
const emptyInputFields = () => {
  $('.event-form').addClass('is-invalid');
  $('.event-form').attr('placeholder', 'Please enter information');
};

const resetInputFields = () => {
  $('.event-form').removeClass('is-invalid');
};

// Event for back button on  Add and Edit form
const bringEventsBackFromAdd = () => {
  $('.add-form').hide();
  $('#events').show();
};

const bringEventsBack = () => {
  $('.edit-form').hide();
  $('#events').show();
};

$('body').on('click', '#back-add-button', bringEventsBackFromAdd);
$('body').on('click', '#back-edit-button', bringEventsBack);

export default { timeStamp, emptyInputFields, resetInputFields };
