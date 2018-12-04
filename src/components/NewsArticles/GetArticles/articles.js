import $ from 'jquery';
import 'bootstrap';
import authHelpers from '../../../helpers/authHelpers';

import getAllArticles from '../../../helpers/Data/dataGetter';
import deleteIcon from '../../images/deleteIcon.jpeg';
import event from '../AddEdit/addEditArticles';

const creatCards = (articles) => {
  let domString = '';
  domString += '<button class="btn-info edit-btn" id="add-articles">Add Articles</button>';
  articles.forEach((article) => {
    domString += `<div class="card" m-1 style="width: 40rem;">
    <div class="card-body">
    <h5 class="card-title">${article.title}</h5>
    <p class="card-text">${article.synopsis}</p>
    <a href="${article.url}" target="_blank">Read more</a>
    <img src="${deleteIcon}" width="20px" height="20px" class="btn-danger delete-btn" data-delete-id=${article.id}>
    <button class="btn-info edit-btn" data-edit-id=${article.id}>Edit</button>
    </div>
    </div>`;
  });
  $('#articles').html(domString);
};

const getArticles = () => {
  const uid = authHelpers.getCurrentUid();
  getAllArticles.getAllArticlesFromDb(uid)
    .then((allArticlesArray) => {
      creatCards(allArticlesArray);
    })
    .catch((error) => {
      console.error(error);
    });
};

const initializeArticlesPage = () => {
  getArticles();
  event.bindEvent();
};
export default initializeArticlesPage;
