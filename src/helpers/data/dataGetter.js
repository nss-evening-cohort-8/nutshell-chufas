import axios from 'axios';
import apiKeys from '../../../db/apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;
const getAllArticlesFromDb = uid => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/articles.json?orderBy="uid"&equalTo="${uid}"`)
    .then((result) => {
      const allArticlesObject = result.data;
      const allArticlesArray = [];
      if (allArticlesObject != null) {
        Object.keys(allArticlesObject).forEach((articleId) => {
          const newArticle = allArticlesObject[articleId];
          newArticle.id = articleId;
          allArticlesArray.push(newArticle);
        });
      }
      console.log(allArticlesArray);
      resolve(allArticlesArray);
    })
    .catch((err) => {
      reject(err);
    });
});

export default { getAllArticlesFromDb };
