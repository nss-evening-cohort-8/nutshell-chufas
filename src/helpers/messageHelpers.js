import firebase from 'firebase/app';
import 'firebase/auth';

const getCurrentTime = () => {
  const dt = new Date();
  const localDate = dt.toLocaleString();
  return localDate;
};

const getCurrentUserName = () => firebase.auth().currentUser.displayName;

export default { getCurrentTime, getCurrentUserName };
