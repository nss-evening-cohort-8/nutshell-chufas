import firebase from 'firebase/app';
import 'firebase/auth';

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

// const getCurrentUserName = () => {
//   admin.auth().getUser(uid)
//     .then((userRecord) => {
//     // See the UserRecord reference doc for the contents of userRecord.
//       console.log('Successfully fetched user data:', userRecord.toJSON());
//     })
//     .catch((error) => {
//       console.log('Error fetching user data:', error);
//     });
// };

export default { getCurrentTimestamp, getCurrentUserName, convertTimestamp };
