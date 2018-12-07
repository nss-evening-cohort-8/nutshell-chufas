// import $ from 'jquery';
import userData from '../../helpers/Data/userData';
import authHelpers from '../../helpers/authHelpers';

const getUserName = () => {
  const currentUid = authHelpers.getCurrentUid();
  const currentUsername = authHelpers.getCurrentUserName();
  userData.getAllUsers().then((usersArray) => {
    usersArray.forEach((user) => {
      if (user.uid === currentUid) {
        
      }
    });
  });
};

export default { getUserName };
