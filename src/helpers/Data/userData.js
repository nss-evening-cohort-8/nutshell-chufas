import axios from 'axios';
import apiKeys from '../../../db/apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getSingleUser = uid => axios.get(`${baseUrl}/users.json?orderBy="userUid"&equalTo="${uid}"`);

const createSingleUser = userObject => axios.post(`${baseUrl}/users.json`, JSON.stringify(userObject));

export default { getSingleUser, createSingleUser };
