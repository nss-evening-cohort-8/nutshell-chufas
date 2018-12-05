import firebase from 'firebase/app';
import 'firebase/auth';
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

const getCurrentUserName = () => firebase.auth().currentUser.displayName;

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

// const getUserName = (uid) => {
//   admin.auth().getUser(uid)
//     .then((userRecord) => {
//     // See the UserRecord reference doc for the contents of userRecord.
//       console.log(userRecord);
//     })
//     .catch((error) => {
//       console.log('Error fetching user data:', error);
//     });
// };

export default {
  getCurrentTimestamp,
  getCurrentUserName,
  convertTimestamp,
  messageInputError,
  resetMessageInput,
  // getUserName,
};
