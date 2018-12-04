// import $ from 'jquery';
// import messageHelpers from '../../helpers/messageHelpers';
// import authHelpers from '../../helpers/authHelpers';
// import messageData from '../../helpers/data/messageData';
// import messages from './messages';

// const getMessageFromInput = () => {
//   const message = {
//     userUid: authHelpers.getCurrentUid(),
//     message: $('#msg-input').val(),
//     timeStamp: messageHelpers.getCurrentTimestamp(),
//     isEdited: false,
//   };
//   return message;
// };

// const addNewMessage = (e) => {
//   const newMessageObject = getMessageFromInput();
//   const messageInput = newMessageObject.message;
//   // if message is an empty string
//   if ((e.keyCode === 13 || e.target.id === 'msg-input-btn') && (messageInput === '')) {
//     messageHelpers.messageInputError();
//   // if message is not an empty string
//   } else if ((e.keyCode === 13 || e.target.id === 'msg-input-btn') && (messageInput !== '')) {
//     messageData.addNewMessage(newMessageObject)
//       .then(() => {
//         messages.initMessagesPage();
//         messageHelpers.resetMessageInput();
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }
// };

// const messageEvents = () => {
//   $('body').on('keyup', '#msg-input', addNewMessage);
//   $('body').on('click', '#msg-input-btn', addNewMessage);
// };

// export default { messageEvents };
