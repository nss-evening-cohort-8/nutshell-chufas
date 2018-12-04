import $ from 'jquery';
import messageHelpers from '../../helpers/messageHelpers';
import authHelpers from '../../helpers/authHelpers';
import messageData from '../../helpers/Data/messageData';

const getMessageFromInput = () => {
  const message = {
    userUid: authHelpers.getCurrentUid(),
    message: $('#msg-input').val(),
    timeStamp: messageHelpers.getCurrentTimeStamp(),
    isEdited: false,
  };
  return message;
};

const addNewMessage = (e) => {
  const newMessageObject = getMessageFromInput();
  const messageInput = newMessageObject.message;
  // if message is an empty string
  if ((e.keyCode === 13 || e.target.id === 'submit-btn') && (messageInput === '')) {
    messageHelpers.messageError();
  // if message is not an empty string
  } else if ((e.keyCode === 13 || e.target.id === 'submit-btn') && (messageInput !== '')) {
    messageData.addNewMessage(newMessageObject)
      .then(() => {
        messageHelpers.resetMessageInput();
        initMessagesPage();
      })
      .catch((error) => {
        console.error(error);
      });
  }
};