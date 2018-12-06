import axios from 'axios';
import apiKeys from '../../../db/apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllEvents = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/events.json?orderBy="userUid"&equalTo="${uid}"`)
    .then((results) => {
      const allEventsObject = results.data;
      const eventsArray = [];
      if (allEventsObject !== null) {
        Object.keys(allEventsObject).forEach((eventId) => {
          const newEvent = allEventsObject[eventId];
          newEvent.id = eventId;
          eventsArray.push(newEvent);
        });
      }
      resolve(eventsArray);
    }).catch((error) => {
      reject(error);
    });
});

const getSingleEvent = eventId => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/events/${eventId}.json`)
    .then((result) => {
      const singleEvent = result.data;
      singleEvent.id = eventId;
      resolve(singleEvent);
    }).catch((error) => {
      reject(error);
    });
});

const addNewEvent = eventObject => axios.post(`${firebaseUrl}/events.json`, JSON.stringify(eventObject));

const deleteEvent = eventId => axios.delete(`${firebaseUrl}/events/${eventId}.json`);

const updateEvent = (eventObject, eventId) => axios.put(`${firebaseUrl}/events/${eventId}.json`, JSON.stringify(eventObject));

export default {
  getAllEvents,
  addNewEvent,
  deleteEvent,
  getSingleEvent,
  updateEvent,
};
