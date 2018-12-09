import userData from '../../helpers/Data/userData';
import authHelpers from '../../helpers/authHelpers';

const createNewUser = (currentUid) => {
  const uid = currentUid();
  userData.getSingleUser(uid).then((result) => {
    const userObject = Object.keys(result.data).length;
    if (userObject === 0) {
      const newUserObject = {
        userUid: uid,
        currentUsername: authHelpers.getCurrentUserName(),
      };
      userData.createSingleUser(newUserObject);
    }
  });
};

export default { createNewUser };
