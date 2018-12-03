/* eslint-disable max-len */
import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';
import messageData from '../../helpers/Data/messageData';
import messageHelpers from '../../helpers/messageHelpers';
import './messages.scss';

const displayMsgInput = () => {
  const domString = `
    <input type="text" class="form-control mr-1 msg-input" id="msg-input" placeholder="Enter your message then press enter">
    <button type="button" class="btn btn-secondary msg-input" id="msg-input-btn">Submit</button>`;
  $('#message-board-input').html(domString);
};

const printAllMessages = (messagesArray) => {
  const currentUid = authHelpers.getCurrentUid();
  let domString = '';
  // domString += '<input type="text" class="form-control" id="msg-input" placeholder="Enter your message then press enter">';
  if (messagesArray.length > 20) {
    messagesArray.shift(messagesArray.length - 20, messagesArray.length);
  }
  messagesArray.forEach((message) => {
    if (message.userUid === currentUid) {
      domString += `
      <div class="msg-row row m-1" id="${message.id}">
        <div class="col-md-2 p-0">
          <p class="text-left">${messageHelpers.convertTimestamp(message.timestamp)}</p>
        </div>
        <div class="col-md-3">
          <p class="text-left msg-row-user"><strong>${message.userUid}</strong></p>
        </div>
        <div class="col-md-6">
          <p class="text-left">${message.message}</p>
        </div>
        <div class="col-md-1 row justify-content-center align-items-center p-0">
          <button type="button" class="edit-btn msg-btn btn btn-success btn-sm" data-edit-btn-id=${message.id}>
            <i class="far fa-edit"></i>
          </button>
          <button type="button" class="del-btn msg-btn btn btn-danger btn-sm" data-delete-btn-id=${message.id}>
            <i class="far fa-trash-alt"></i></button>
        </div>
      </div>
      <hr>`;
    } else {
      domString += `
      <div class="msg-row row m-1" id="${message.id}">
        <div class="col-md-2 p-0">
          <p class="text-left">${messageHelpers.convertTimestamp(message.timestamp)}</p>
        </div>
        <div class="col-md-3">
          <p class="text-left msg-row-user"><strong>${message.userUid}</strong></p>
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
    printAllMessages(messagesArray);
  });
};

const initMessagesPage = () => {
  displayMsgInput();
  getAllMessages();
};

export default initMessagesPage;
