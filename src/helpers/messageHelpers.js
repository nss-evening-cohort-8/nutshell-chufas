import $ from 'jquery';

const getCurrentTimestamp = () => {
  const dt = new Date().getTime();
  return dt;
};

const convertTimestamp = (timestamp) => {
  const dt = new Date(timestamp);
  const convertedTime = dt.toLocaleString();
  return convertedTime;
};

const messageInputError = () => {
  $('#msg-input-btn').removeClass('btn-secondary');
  $('#msg-input-btn').addClass('btn-danger');
  $('#msg-input').addClass('is-invalid');
  $('#msg-input').attr('placeholder', 'Message field cannot be blank');
};

const resetMessageInput = () => {
  $('#msg-input').val('');
  $('#msg-input-btn').removeClass('btn-danger');
  $('#msg-input-btn').addClass('btn-secondary');
  $('#msg-input').removeClass('is-invalid');
  $('#msg-input').attr('placeholder', 'Enter new message');
};

export default {
  getCurrentTimestamp,
  convertTimestamp,
  messageInputError,
  resetMessageInput,
};
