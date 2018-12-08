// import $ from 'jquery';
import userData from '../../helpers/Data/userData';
import authHelpers from '../../helpers/authHelpers';

// const getUserName = (getCurrentUid) => {
//   // const currentUid = authHelpers.getCurrentUid();
//   const userObject = {
//     userUid: getCurrentUid(),
//     currentUsername: authHelpers.getCurrentUserName(),
//   };
//   userData.createNewUser(userObject).then((data) => {
//     console.log(data.data);
//     console.log(userObject);
//   });
// };

const createNewUser = (currentUid) => {
  const uid = currentUid();
  userData.getSingleUser(uid).then((result) => {
    console.log(result.data);
    const userObject = Object.keys(result.data).length;
    console.log(userObject);
    if (userObject === 0) {
      const newUserObject = {
        userUid: uid,
        currentUsername: authHelpers.getCurrentUserName(),
      };
      console.log(newUserObject);
      userData.createSingleUser(newUserObject);
    }
  });
};

export default { createNewUser };
