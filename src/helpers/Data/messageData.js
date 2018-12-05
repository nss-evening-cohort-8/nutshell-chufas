import axios from 'axios';
import apiKeys from '../../../db/apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllMessagesForCurrentUser = uid => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/messages.json?orderBy="userUid"&equalTo="${uid}"`)
    .then((result) => {
      const messagesObject = result.data;
      const messagesArray = [];
      if (messagesArray !== null) {
        Object.keys(messagesObject).forEach((messageId) => {
          messagesObject[messageId].id = messageId;
          messagesArray.push(messagesObject[messageId]);
        });
      }
      console.log(messagesArray);
      resolve(messagesArray);
    })
    .catch((err) => {
      reject(err);
    });
});

const getAllMessages = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/messages.json`)
    .then((result) => {
      const messagesObject = result.data;
      const messagesArray = [];
      if (messagesArray !== null) {
        Object.keys(messagesObject).forEach((messageId) => {
          messagesObject[messageId].id = messageId;
          messagesArray.push(messagesObject[messageId]);
        });
      }
      resolve(messagesArray);
    })
    .catch((err) => {
      reject(err);
    });
});

const addNewMessage = messageObject => axios.post(`${baseUrl}/messages.json`, JSON.stringify(messageObject));

const deleteMessage = messageId => axios.delete(`${baseUrl}/messages/${messageId}.json`);

const updateMessage = (messageId, messageObject) => axios.patch(`${baseUrl}/messages/${messageId}.json`, JSON.stringify(messageObject));

export default {
  getAllMessagesForCurrentUser,
  getAllMessages,
  addNewMessage,
  deleteMessage,
  updateMessage,
};
