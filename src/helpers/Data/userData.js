import axios from 'axios';
import apiKeys from '../../../db/apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getCurrentUserByUid = uid => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/users.json?orderBy="userUid"&equalTo="${uid}"`)
    .then((result) => {
      const usersObject = result.data;
      const usersArray = [];
      if (usersArray !== null) {
        Object.keys(usersObject).forEach((userId) => {
          usersObject[userId].id = userId;
          usersArray.push(usersObject[userId]);
        });
      }
      resolve(usersArray);
    })
    .catch((err) => {
      reject(err);
    });
});

const getSingleUser = uid => axios.get(`${baseUrl}/users.json?orderBy="userUid"&equalTo="${uid}"`);

const createSingleUser = userObject => axios.post(`${baseUrl}/users.json`, JSON.stringify(userObject));

export default { getCurrentUserByUid, getSingleUser, createSingleUser };
