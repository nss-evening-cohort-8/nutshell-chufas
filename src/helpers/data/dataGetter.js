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
      resolve(allArticlesArray);
    })
    .catch((err) => {
      reject(err);
    });
});

const getSingleArticle = articleId => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/articles/${articleId}.json`)
    .then((result) => {
      const singleArticle = result.data;
      singleArticle.id = articleId;
      console.log(singleArticle);
      resolve(singleArticle);
    })
    .catch((error) => {
      reject(error);
    });
});

const addNewArticle = ArticlesObject => axios.post(`${baseUrl}/articles.json`, JSON.stringify(ArticlesObject));

const updateArticle = (articlesObject, articleId) => axios.put(`${baseUrl}/articles/${articleId}.json`, JSON.stringify(articlesObject));

export default {
  getAllArticlesFromDb,
  addNewArticle,
  getSingleArticle,
  updateArticle,
};
