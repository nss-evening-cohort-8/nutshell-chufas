import firebase from 'firebase/app';
import 'firebase/auth';
// import admin from 'firebase-admin';

// admin = require('firebase-admin');

// admin.initializeApp();

const getCurrentTimestamp = () => {
  const dt = new Date();
  const localDate = dt.toLocaleString();
  return localDate;
};

const convertTimestamp = (timestamp) => {
  const dt = new Date(timestamp);
  const convertedTime = dt.toLocaleString();
  return convertedTime;
};

const getCurrentUserName = () => firebase.auth().currentUser.displayName;

const messageInputError = () => {
  $('#msg-input-btn').addClass('.btn-danger').removeClass('.btn-secondary');
  $('#msg-input').addClass('.is-invalid');
  $('#msg-input').attr('placeholder', 'Message field cannot be blank');
};

const resetMessageInput = () => {
  $('#msg-input').val('');
  $('#msg-input-btn').addClass('.btn-secondary').removeClass('.btn-danger');
  $('#msg-input').removeClass('.is-invalid');
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
