// AUTHOR: Maggie Leavell
// PURPOSE: A message board using CRUD to communicate with other users.

/* eslint-disable max-len */
import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';
import messageData from '../../helpers/Data/messageData';
import messageHelpers from '../../helpers/messageHelpers';
import userData from '../../helpers/Data/userData';
import './messages.scss';

const displayMsgInput = () => {
  const domString = `
    <input type="text" class="form-control mr-1 msg-input" id="msg-input" placeholder="Enter new message">
    <button type="button" class="btn btn-secondary msg-input mr-1" id="msg-input-btn">Submit</button>
    <button type="button" class="btn btn-danger msg-input msg-refresh-btn">
      <i class="fas fa-redo msg-refresh-btn"></i>
    </button>`;
  $('#message-board-input').html(domString);
};

const printAllMessages = (messagesArray, usersArray) => {
  const currentUid = authHelpers.getCurrentUid();
  let domString = '';
  let username = '';
  if (messagesArray.length > 20) {
    messagesArray.shift(messagesArray.length - 20, messagesArray.length);
  }
  messagesArray.forEach((message) => {
    for (let i = 0; i < usersArray.length; i += 1) {
      if (usersArray[i].userUid === message.userUid) {
        username = usersArray[i].userName;
        break;
      } else if (usersArray[i].userUid !== message.userUid) {
        username = message.userUid;
      }
    }
    domString += `
      <div class="msg-row row m-1" id="${message.id}">
        <div class="col-md-3">
          <p class="text-left msg-row-user"><strong>${username}</strong></p>
        </div>
        <div class="col-md-2">
          <p class="text-left"><small>${message.isEdited === true ? `${messageHelpers.convertTimestamp(message.timestamp)} (edited)` : `${messageHelpers.convertTimestamp(message.timestamp)}`}</small></p>
        </div>
        <div class="col-md-6">
          <p class="text-left msg-row-message">${message.message}</p>
        </div>`;
    if (message.userUid === currentUid) {
      domString += `
        <div class="col-md-1 d-flex justify-content-center align-items-center p-0">
          <button type="button" class="msg-edit-btn msg-btn btn btn-success btn-sm" data-edit-btn-id=${message.id} data-is-edited=${message.isEdited} data-original-timestamp=${message.timestamp}>
            <i class="far fa-edit"></i>
          </button>
          <button type="button" class="msg-delete-btn msg-btn btn btn-danger btn-sm" data-delete-btn-id=${message.id}>
            <i class="far fa-trash-alt"></i>
          </button>
        </div>`;
    }
    domString += `
      </div>
      <hr>`;
  });
  $('#message-board-output').html(domString);
};

const getAllMessages = () => {
  userData.getAllUsers().then((usersArray) => {
    messageData.getAllMessages().then((messagesArray) => {
      messagesArray.sort((first, second) => first.timestamp - second.timestamp);
      printAllMessages(messagesArray, usersArray);
      $('#message-board-output').animate({ scrollTop: $('#message-board-output').get(0).scrollHeight }, 1000);
    })
      .catch((err) => {
        console.error(err);
      });
  });
};

const getObjectFromInput = () => {
  const message = {
    userUid: authHelpers.getCurrentUid(),
    message: $('#msg-input').val(),
    timestamp: messageHelpers.getCurrentTimestamp(),
    isEdited: false,
  };
  return message;
};

const addNewMessage = (e) => {
  const newMessageObject = getObjectFromInput();
  const messageInput = newMessageObject.message;
  // if message is an empty string
  if ((e.keyCode === 13 || e.target.id === 'msg-input-btn') && (messageInput === '')) {
    messageHelpers.messageInputError();
  // if message is not an empty string
  } else if ((e.keyCode === 13 || e.target.id === 'msg-input-btn') && (messageInput !== '')) {
    messageData.addNewMessage(newMessageObject).then(() => {
      getAllMessages();
      messageHelpers.resetMessageInput();
    })
      .catch((error) => {
        console.error(error);
      });
  }
};

const deleteMessage = (e) => {
  const deleteMessageId = $(e.target).closest('.msg-delete-btn').data('delete-btn-id');
  messageData.deleteMessage(deleteMessageId).then(() => {
    getAllMessages();
  })
    .catch((err) => {
      console.error(err);
    });
};

const changeMessageToInput = (e) => {
  const editedMessageElement = $(e.target).parents().closest('.msg-row').find('.msg-row-message');
  const editedMessage = $(editedMessageElement[0]).html();
  const editMessageId = $(e.target).closest('.msg-edit-btn').data('edit-btn-id');
  const isEdited = $(e.target).closest('.msg-edit-btn').data('is-edited');
  const originalTimestamp = $(e.target).closest('.msg-edit-btn').data('original-timestamp');
  if (isEdited === true) {
    // keeps original timestamp
    $(editedMessageElement[0]).replaceWith(`<input type="text" value="${editedMessage}" data-edit-input-id=${editMessageId} data-orig-timestamp=${originalTimestamp} class="form-control edit-input">`);
  } else {
    $(editedMessageElement[0]).replaceWith(`<input type="text" value="${editedMessage}" data-edit-input-id=${editMessageId} class="form-control edit-input">`);
  }
};

const saveEditedMessage = (e) => {
  if (e.keyCode === 13) {
    const editMessageId = $(e.target).data('edit-input-id');
    const editedObject = {
      userUid: authHelpers.getCurrentUid(),
      message: $(e.target).val(),
      timestamp: $(e.target).data('orig-timestamp'),
      isEdited: true,
    };
    messageData.updateMessage(editMessageId, editedObject).then(() => {
      getAllMessages();
    });
  }
};

const reloadMessages = () => {
  getAllMessages();
  setTimeout(reloadMessages, 35000);
};

const initMessagesPage = () => {
  displayMsgInput();
  getAllMessages();
};

$('body').on('keyup', '#msg-input', addNewMessage);
$('body').on('click', '#msg-input-btn', addNewMessage);
$('body').on('click', '.msg-delete-btn', deleteMessage);
$('body').on('click', '.msg-edit-btn', changeMessageToInput);
$('body').on('keyup', '.edit-input', saveEditedMessage);
$('body').on('click', '.msg-refresh-btn', getAllMessages);

export default { initMessagesPage, reloadMessages };
