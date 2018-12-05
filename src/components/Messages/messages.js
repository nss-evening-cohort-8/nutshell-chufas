/* eslint-disable no-else-return */
/* eslint-disable max-len */
import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';
import messageData from '../../helpers/Data/messageData';
import messageHelpers from '../../helpers/messageHelpers';
import './messages.scss';

const displayMsgInput = () => {
  const domString = `
    <input type="text" class="form-control mr-1 msg-input" id="msg-input" placeholder="Enter new message">
    <button type="button" class="btn btn-secondary msg-input" id="msg-input-btn">Submit</button>`;
  $('#message-board-input').html(domString);
};

const printAllMessages = (messagesArray) => {
  const currentUid = authHelpers.getCurrentUid();
  let domString = '';
  if (messagesArray.length > 20) {
    messagesArray.shift(messagesArray.length - 20, messagesArray.length);
  }
  messagesArray.forEach((message) => {
    if (message.userUid === currentUid) {
      domString += `
      <div class="msg-row row m-1" id="${message.id}">
        <div class="col-md-3">
          <p class="text-left msg-row-user"><strong>${message.userUid}</strong></p>
        </div>
        <div class="col-md-2 p-0">
          <p class="text-center"><small>${messageHelpers.convertTimestamp(message.timestamp)}</small></p>
        </div>
        <div class="col-md-6">
          <p class="text-left">${message.message}</p>
        </div>
        <div class="col-md-1 d-flex justify-content-center align-items-center p-0">
          <button type="button" class="edit-btn msg-btn btn btn-success btn-sm" data-edit-btn-id=${message.id}>
            <i class="far fa-edit"></i>
          </button>
          <button type="button" class="delete-btn msg-btn btn btn-danger btn-sm" data-delete-btn-id=${message.id}>
            <i class="far fa-trash-alt"></i></button>
        </div>
      </div>
      <hr>`;
    } else {
      domString += `
      <div class="msg-row row m-1" id="${message.id}">
        <div class="col-md-3">
          <p class="text-left msg-row-user"><strong>${message.userUid}</strong></p>
        </div>
        <div class="col-md-2 p-0">
          <p class="text-center"><small>${messageHelpers.convertTimestamp(message.timestamp)}</small></p>
        </div>
        <div class="col-md-6">
          <p class="text-left">${message.message}</p>
        </div>
      </div>
      <hr>`;
    }
  });
  $('#message-board-output').html(domString);
};

const getAllMessages = () => {
  messageData.getAllMessages().then((messagesArray) => {
    messagesArray.sort((first, second) => first.timestamp - second.timestamp);
    printAllMessages(messagesArray);
  })
    .catch((err) => {
      console.error(err);
    });
};

const initMessagesPage = () => {
  displayMsgInput();
  getAllMessages();
};

const getMessageFromInput = () => {
  const message = {
    userUid: authHelpers.getCurrentUid(),
    message: $('#msg-input').val(),
    timestamp: messageHelpers.getCurrentTimestamp(),
    isEdited: false,
  };
  return message;
};

const addNewMessage = (e) => {
  const newMessageObject = getMessageFromInput();
  const messageInput = newMessageObject.message;
  // if message is an empty string
  if ((e.keyCode === 13 || e.target.id === 'msg-input-btn') && (messageInput === '')) {
    messageHelpers.messageInputError();
  // if message is not an empty string
  } else if ((e.keyCode === 13 || e.target.id === 'msg-input-btn') && (messageInput !== '')) {
    messageData.addNewMessage(newMessageObject).then(() => {
      getAllMessages();
      $('#message-board-output').animate({ scrollTop: $('#message-board-output').get(0).scrollHeight }, 1000);
      messageHelpers.resetMessageInput();
    })
      .catch((error) => {
        console.error(error);
      });
  }
};

const deleteMessage = (e) => {
  const deleteMessageId = $(e.target).closest('.delete-btn').data('delete-btn-id');
  console.log(deleteMessageId);
  messageData.deleteMessage(deleteMessageId).then(() => {
    getAllMessages();
  })
    .catch((err) => {
      console.error(err);
    });
};

$('body').on('keyup', '#msg-input', addNewMessage);
$('body').on('click', '#msg-input-btn', addNewMessage);
$('body').on('click', '.delete-btn', deleteMessage);

export default initMessagesPage;
