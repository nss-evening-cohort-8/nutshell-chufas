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
  // getUserName,
};
